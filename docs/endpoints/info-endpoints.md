# Info Endpoints

The Info/Help endpoints provide information about the available data in the API, including datasets, variables, reservoirs, stations, and date ranges. These endpoints are useful for discovering what data is available and how to access it.

## List Available Datasets

Lists all available datasets in the API.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_datasets"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json"  # or "csv"
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get available datasets
    curl -X GET "https://operevap.dri.edu/info/list_datasets?output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                   | Default |
| ------------- | ------ | ----------------------------- | ------- |
| output_format | string | Response format (json or csv) | json    |

### Response

Returns a list of dataset names that can be used as the `dataset` parameter in other API requests.

## List Available Variables

Lists available variables for a specified dataset.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_variables"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json",  # or "csv"
        "dataset": "nete-volume-calcs"  # Dataset name
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get available variables for a dataset
    curl -X GET "https://operevap.dri.edu/info/list_variables?output_format=json&dataset=nete-volume-calcs" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                      | Default           |
| ------------- | ------ | ------------------------------------------------ | ----------------- |
| output_format | string | Response format (json or csv)                    | json              |
| dataset       | string | Dataset name (rtma, res, lem, nete-volume-calcs) | nete-volume-calcs |

### Response

Returns a list of dictionaries containing variable information. The `api_name` field in each dictionary can be used as the `variable` parameter in other API requests.

## List Date Range

Lists the minimum and maximum dates available for a dataset and variable.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_dates"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json",  # or "csv"
        "dataset": "nete-volume-calcs",
        "variable": "NetE"
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get date range for a dataset and variable
    curl -X GET "https://operevap.dri.edu/info/list_dates?output_format=json&dataset=nete-volume-calcs&variable=NetE" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                      | Default           |
| ------------- | ------ | ------------------------------------------------ | ----------------- |
| output_format | string | Response format (json or csv)                    | json              |
| dataset       | string | Dataset name (rtma, res, lem, nete-volume-calcs) | nete-volume-calcs |
| variable      | string | Variable name (see list_variables endpoint)      | NetE              |

### Response

Returns a list containing the start date and end date for the specified dataset and variable.

## List Reservoir Names

Lists available reservoir IDs (RES_NAME) that can be used in other API requests.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_RES_NAMES"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json"  # or "csv"
    }

    # Without shapefile
    response = requests.post(url, headers=headers, params=params)
    data = response.json()
    print(data)

    # With shapefile (if needed)
    files = {
        'shapefile_shp': open('your_shapefile.shp', 'rb'),
        'shapefile_dbf': open('your_shapefile.dbf', 'rb'),
        'shapefile_prj': open('your_shapefile.prj', 'rb'),
        'shapefile_shx': open('your_shapefile.shx', 'rb')
    }

    response = requests.post(url, headers=headers, params=params, files=files)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get reservoir names without shapefile
    curl -X POST "https://operevap.dri.edu/info/list_RES_NAMES?output_format=json" \
         -H "api-key: ${API_KEY}"

    # Get reservoir names with shapefile (if needed)
    curl -X POST "https://operevap.dri.edu/info/list_RES_NAMES?output_format=json" \
         -H "api-key: ${API_KEY}" \
         -F "shapefile_shp=@your_shapefile.shp" \
         -F "shapefile_dbf=@your_shapefile.dbf" \
         -F "shapefile_prj=@your_shapefile.prj" \
         -F "shapefile_shx=@your_shapefile.shx"
    ```

### Parameters

| Parameter     | Type   | Description                                         | Default |
| ------------- | ------ | --------------------------------------------------- | ------- |
| output_format | string | Response format (json or csv)                       | json    |
| shapefile_shp | file   | Optional .shp file to filter reservoirs by location |         |
| shapefile_dbf | file   | Optional .dbf file to filter reservoirs by location |         |
| shapefile_prj | file   | Optional .prj file to filter reservoirs by location |         |
| shapefile_shx | file   | Optional .shx file to filter reservoirs by location |         |

### Response

Returns a list of reservoir names that can be used as the `RES_NAMES` parameter in metadata and timeseries API requests.

### Notes

If shapefiles are uploaded, only reservoirs within the shapefile bounds will be returned.

## List Station Names

Lists available station IDs (STA_NAME) that can be used in other API requests.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_STA_NAMES"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json"  # or "csv"
    }

    # Without shapefile
    response = requests.post(url, headers=headers, params=params)
    data = response.json()
    print(data)

    # With shapefile (if needed)
    files = {
        'shapefile_shp': open('your_shapefile.shp', 'rb'),
        'shapefile_dbf': open('your_shapefile.dbf', 'rb'),
        'shapefile_prj': open('your_shapefile.prj', 'rb'),
        'shapefile_shx': open('your_shapefile.shx', 'rb')
    }

    response = requests.post(url, headers=headers, params=params, files=files)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get station names without shapefile
    curl -X POST "https://operevap.dri.edu/info/list_STA_NAMES?output_format=json" \
         -H "api-key: ${API_KEY}"

    # Get station names with shapefile (if needed)
    curl -X POST "https://operevap.dri.edu/info/list_STA_NAMES?output_format=json" \
         -H "api-key: ${API_KEY}" \
         -F "shapefile_shp=@your_shapefile.shp" \
         -F "shapefile_dbf=@your_shapefile.dbf" \
         -F "shapefile_prj=@your_shapefile.prj" \
         -F "shapefile_shx=@your_shapefile.shx"
    ```

### Parameters

| Parameter     | Type   | Description                                       | Default |
| ------------- | ------ | ------------------------------------------------- | ------- |
| output_format | string | Response format (json or csv)                     | json    |
| shapefile_shp | file   | Optional .shp file to filter stations by location |         |
| shapefile_dbf | file   | Optional .dbf file to filter stations by location |         |
| shapefile_prj | file   | Optional .prj file to filter stations by location |         |
| shapefile_shx | file   | Optional .shx file to filter stations by location |         |

### Response

Returns a list of station names that can be used as the `STA_NAMES` parameter in metadata and timeseries API requests.

### Notes

If shapefiles are uploaded, only stations within the shapefile bounds will be returned.

## List Station Variables

Lists available variables for stations.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_stations_variables"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json",  # or "csv"
        "STA_NAMES": "ALL_STATIONS"  # or comma-separated list of station names
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get station variables
    curl -X GET "https://operevap.dri.edu/info/list_stations_variables?output_format=json&STA_NAMES=ALL_STATIONS" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                                  | Default      |
| ------------- | ------ | ------------------------------------------------------------ | ------------ |
| output_format | string | Response format (json or csv)                                | json         |
| STA_NAMES     | string | One or more station names (comma-separated), or ALL_STATIONS | ALL_STATIONS |

### Response

Returns a list of dictionaries containing variable information. The `api_name` field in each dictionary can be used as the `variable` parameter in other API requests.

## List Station Date Range

Lists the minimum and maximum dates available for stations in the database.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/info/list_stations_dates"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "output_format": "json",  # or "csv"
        "STA_NAMES": "ALL_STATIONS"  # or comma-separated list of station names
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get station date range
    curl -X GET "https://operevap.dri.edu/info/list_stations_dates?output_format=json&STA_NAMES=ALL_STATIONS" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                                  | Default      |
| ------------- | ------ | ------------------------------------------------------------ | ------------ |
| output_format | string | Response format (json or csv)                                | json         |
| STA_NAMES     | string | One or more station names (comma-separated), or ALL_STATIONS | ALL_STATIONS |

### Response

Returns a list containing the start date and end date for the specified stations.
