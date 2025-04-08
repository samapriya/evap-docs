# Info Endpoints

The Info/Help endpoints provide information about the available data in the API, including datasets, variables, reservoirs, stations, and date ranges. These endpoints are useful for discovering what data is available and how to access it.

## List Available Datasets

Lists all available datasets in the API.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |

### Response

Returns a list of dataset names that can be used as the `dataset` parameter in other API requests.

## List Available Variables

Lists available variables for a specified dataset.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |
| dataset | string | Dataset name (rtma, res, lem, nete-volume-calcs) | nete-volume-calcs |

### Response

Returns a list of dictionaries containing variable information. The `api_name` field in each dictionary can be used as the `variable` parameter in other API requests.

## List Date Range

Lists the minimum and maximum dates available for a dataset and variable.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |
| dataset | string | Dataset name (rtma, res, lem, nete-volume-calcs) | nete-volume-calcs |
| variable | string | Variable name (see list_variables endpoint) | NetE |

### Response

Returns a list containing the start date and end date for the specified dataset and variable.

## List Reservoir Names

Lists available reservoir IDs (RES_NAME) that can be used in other API requests.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |
| shapefile_shp | file | Optional .shp file to filter reservoirs by location | |
| shapefile_dbf | file | Optional .dbf file to filter reservoirs by location | |
| shapefile_prj | file | Optional .prj file to filter reservoirs by location | |
| shapefile_shx | file | Optional .shx file to filter reservoirs by location | |

### Response

Returns a list of reservoir names that can be used as the `RES_NAMES` parameter in metadata and timeseries API requests.

### Notes

If shapefiles are uploaded, only reservoirs within the shapefile bounds will be returned.

## List Station Names

Lists available station IDs (STA_NAME) that can be used in other API requests.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |
| shapefile_shp | file | Optional .shp file to filter stations by location | |
| shapefile_dbf | file | Optional .dbf file to filter stations by location | |
| shapefile_prj | file | Optional .prj file to filter stations by location | |
| shapefile_shx | file | Optional .shx file to filter stations by location | |

### Response

Returns a list of station names that can be used as the `STA_NAMES` parameter in metadata and timeseries API requests.

### Notes

If shapefiles are uploaded, only stations within the shapefile bounds will be returned.

## List Station Variables

Lists available variables for stations.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |
| STA_NAMES | string | One or more station names (comma-separated), or ALL_STATIONS | ALL_STATIONS |

### Response

Returns a list of dictionaries containing variable information. The `api_name` field in each dictionary can be used as the `variable` parameter in other API requests.

## List Station Date Range

Lists the minimum and maximum dates available for stations in the database.

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

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| output_format | string | Response format (json or csv) | json |
| STA_NAMES | string | One or more station names (comma-separated), or ALL_STATIONS | ALL_STATIONS |

### Response

Returns a list containing the start date and end date for the specified stations.
