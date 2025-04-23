# Metadata Endpoints

The metadata endpoints provide information about the reservoirs and stations available in the API. This metadata includes details such as location, physical characteristics, and other attributes.

## Reservoir Metadata

Retrieves metadata for one or more reservoirs.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/metadata/reservoirs"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "RES_NAMES": "LAKE ALICE,LAKE ESTES",
        "output_format": "json"
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "R"

    ```r
    library(httr)
    library(jsonlite)

    # API configuration
    api_key <- "YOUR_API_KEY"
    base_url <- "https://operevap.dri.edu"

    # Get reservoir metadata
    url <- paste0(base_url, "/metadata/reservoirs")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(
        RES_NAMES = "LAKE ALICE,LAKE ESTES",
        output_format = "json"
      )
    )

    # Parse response
    data <- fromJSON(content(response, "text", encoding = "UTF-8"))
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get reservoir metadata
    curl -X GET "https://operevap.dri.edu/metadata/reservoirs?RES_NAMES=LAKE%20ALICE,LAKE%20ESTES&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                   | Default                |
| ------------- | ------ | --------------------------------------------- | ---------------------- |
| output_format | string | Response format (json or csv)                 | json                   |
| RES_NAMES     | string | One or more reservoir names (comma-separated) | LAKE ALICE, LAKE ESTES |

### Response

Returns a list of dictionaries containing metadata information for the specified reservoirs. The metadata includes attributes such as:

- Geographic coordinates (latitude, longitude)
- Physical characteristics (area, depth, etc.)
- Administrative information
- Quality flags (qflag)
- And other attributes

### Notes

Use the `/info/list_RES_NAMES` endpoint to discover available reservoir names.

## Station Metadata

Retrieves metadata for one or more stations.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/metadata/stations"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "STA_NAMES": "ABERDEEN_STATION,ABIQUIU DAM_STATION",
        "output_format": "json"
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "R"

    ```r
    library(httr)
    library(jsonlite)

    # API configuration
    api_key <- "YOUR_API_KEY"
    base_url <- "https://operevap.dri.edu"

    # Get station metadata
    url <- paste0(base_url, "/metadata/stations")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(
        STA_NAMES = "ABERDEEN_STATION,ABIQUIU DAM_STATION",
        output_format = "json"
      )
    )

    # Parse response
    data <- fromJSON(content(response, "text", encoding = "UTF-8"))
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get station metadata
    curl -X GET "https://operevap.dri.edu/metadata/stations?STA_NAMES=ABERDEEN_STATION,ABIQUIU%20DAM_STATION&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                 | Default                               |
| ------------- | ------ | ------------------------------------------- | ------------------------------------- |
| output_format | string | Response format (json or csv)               | json                                  |
| STA_NAMES     | string | One or more station names (comma-separated) | ABERDEEN_STATION, ABIQUIU DAM_STATION |

### Response

Returns a list of dictionaries containing metadata information for the specified stations. The metadata includes attributes such as:

- Geographic coordinates (latitude, longitude)
- Station type
- Operational status
- Associated reservoir (if applicable)
- Quality flags (qflag)
- And other attributes

### Notes

Use the `/info/list_STA_NAMES` endpoint to discover available station names.

## Using Metadata in Other Requests

The metadata attributes can be included in timeseries responses by using the `also_return` parameter in timeseries requests. For example:

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/timeseries/daily/reservoirs/daterange"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "RES_NAMES": "LAKE ALICE",
        "datasets": "nete-volume-calcs",
        "variables": "NetE,E_volume",
        "start_date": "2020-01-01",
        "end_date": "2020-01-31",
        "units": "metric",
        "also_return": "qflag",
        "output_format": "json"
    }

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    print(data)
    ```

=== "R"

    ```r
    library(httr)
    library(jsonlite)

    # API configuration
    api_key <- "YOUR_API_KEY"
    base_url <- "https://operevap.dri.edu"

    # Get timeseries data with metadata attributes
    url <- paste0(base_url, "/timeseries/daily/reservoirs/daterange")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(
        RES_NAMES = "LAKE ALICE",
        datasets = "nete-volume-calcs",
        variables = "NetE,E_volume",
        start_date = "2020-01-01",
        end_date = "2020-01-31",
        units = "metric",
        also_return = "qflag",
        output_format = "json"
      )
    )

    # Parse response
    data <- fromJSON(content(response, "text", encoding = "UTF-8"))
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get timeseries data with metadata attributes
    curl -X GET "https://operevap.dri.edu/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20ALICE&datasets=nete-volume-calcs&variables=NetE,E_volume&start_date=2020-01-01&end_date=2020-01-31&units=metric&also_return=qflag&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

This is useful for understanding the quality or context of the data returned in timeseries responses.
