# Timeseries Endpoints

The timeseries endpoints provide access to time-based data for reservoirs and stations. These endpoints are divided into two categories:

1. Reservoir timeseries data
2. Station timeseries data

Each category has endpoints for retrieving data over a date range or for a single date.

## Reservoir Timeseries Data (Date Range)

Retrieves timeseries data for one or more reservoirs over a specified date range.

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

    # Get reservoir timeseries data
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

    # Get reservoir timeseries data
    curl -X GET "https://operevap.dri.edu/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20ALICE&datasets=nete-volume-calcs&variables=NetE,E_volume&start_date=2020-01-01&end_date=2020-01-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                           | Default                                                                                                                                                                 |
| ------------- | ------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RES_NAMES     | string | One or more reservoir names (comma-separated)         | LAKE ALICE, LAKE ESTES                                                                                                                                                  |
| datasets      | string | One or more datasets (comma-separated)                | rtma, res, lem, nete-volume-calcs                                                                                                                                       |
| variables     | string | One or more variables (comma-separated)               | pr, tmmx_c, tmmn_c, vpd_kpa, vs2m, srad, etr, eto, th, sph_kgkg, pres_pa, stage_m, area_m2, depth_m, E_hs, E_nhs, Rn, Tw, Tw0, Fetch, Lerr, NetE, E_volume, NetE_volume |
| units         | string | Units for returned data (english or metric)           | metric                                                                                                                                                                  |
| start_date    | string | Start date (yyyy-mm-dd)                               | 2020-01-01                                                                                                                                                              |
| end_date      | string | End date (yyyy-mm-dd)                                 | 2020-01-31                                                                                                                                                              |
| also_return   | string | Additional metadata attributes to include in response |                                                                                                                                                                         |
| output_format | string | Response format (json or csv)                         | json                                                                                                                                                                    |

### Response

Returns a list of dictionaries containing timeseries data for the specified reservoirs, datasets, variables, and date range.

### Notes

- Use the `/info/list_RES_NAMES` endpoint to discover available reservoir names.
- Use the `/info/list_variables` endpoint to discover available variables for each dataset.
- Use the `/info/list_dates` endpoint to discover the valid date range for each dataset and variable.

## Reservoir Timeseries Data (Single Date)

Retrieves timeseries data for all reservoirs on a single date.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/timeseries/daily/reservoirs/date"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "datasets": "nete-volume-calcs",
        "variables": "NetE,E_volume",
        "date": "2020-01-01",
        "units": "metric",
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

    # Get reservoir data for a single date
    url <- paste0(base_url, "/timeseries/daily/reservoirs/date")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(
        datasets = "nete-volume-calcs",
        variables = "NetE,E_volume",
        date = "2020-01-01",
        units = "metric",
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

    # Get reservoir data for a single date
    curl -X GET "https://operevap.dri.edu/timeseries/daily/reservoirs/date?datasets=nete-volume-calcs&variables=NetE,E_volume&date=2020-01-01&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                           | Default                                                                                                                                                                 |
| ------------- | ------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| datasets      | string | One or more datasets (comma-separated)                | rtma, res, lem, nete-volume-calcs                                                                                                                                       |
| variables     | string | One or more variables (comma-separated)               | pr, tmmx_c, tmmn_c, vpd_kpa, vs2m, srad, etr, eto, th, sph_kgkg, pres_pa, stage_m, area_m2, depth_m, E_hs, E_nhs, Rn, Tw, Tw0, Fetch, Lerr, NetE, E_volume, NetE_volume |
| units         | string | Units for returned data (english or metric)           | metric                                                                                                                                                                  |
| date          | string | Date (yyyy-mm-dd)                                     | 2020-01-01                                                                                                                                                              |
| also_return   | string | Additional metadata attributes to include in response |                                                                                                                                                                         |
| output_format | string | Response format (json or csv)                         | json                                                                                                                                                                    |

### Response

Returns a list of dictionaries containing timeseries data for all reservoirs for the specified datasets, variables, and date.

## Station Timeseries Data (Date Range)

Retrieves timeseries data for one or more stations over a specified date range.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/timeseries/stations/daterange"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "STA_NAMES": "LAKE MEAD_STATION",
        "variables": "ATemp,RH",
        "start_date": "2020-01-01",
        "end_date": "2020-01-31",
        "units": "metric",
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

    # Get station timeseries data
    url <- paste0(base_url, "/timeseries/stations/daterange")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(
        STA_NAMES = "LAKE MEAD_STATION",
        variables = "ATemp,RH",
        start_date = "2020-01-01",
        end_date = "2020-01-31",
        units = "metric",
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

    # Get station timeseries data
    curl -X GET "https://operevap.dri.edu/timeseries/stations/daterange?STA_NAMES=LAKE%20MEAD_STATION&variables=ATemp,RH&start_date=2020-01-01&end_date=2020-01-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                           | Default                                                                                                                                                                                                                                                                                                         |
| ------------- | ------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| STA_NAMES     | string | One or more station names (comma-separated)           | LAKE MEAD_STATION, BLW_STATION                                                                                                                                                                                                                                                                                  |
| variables     | string | One or more variables (comma-separated)               | ATemp, ATemp_Min, ATemp_Max, BP, BR, Ce, DO, DO_percent, EnergyT, ETo, ETr, evap_1, evap_2, evap_3, evap_4, evap_5, HSEnergyFlux, IncomingSR, inflow, SurfaceT, MO_StabilityL, NC_EnergyStored, NR, NW_AdvectedE, outflow, PH, RH, SamplingD, SkinTemp, SpecConduct, SWin, VP, VPD, WTemp, WVD, WD, WS, PofDays |
| units         | string | Units for returned data (english or metric)           | metric                                                                                                                                                                                                                                                                                                          |
| start_date    | string | Start date (yyyy-mm-dd)                               | 2020-01-01                                                                                                                                                                                                                                                                                                      |
| end_date      | string | End date (yyyy-mm-dd)                                 | 2020-01-31                                                                                                                                                                                                                                                                                                      |
| also_return   | string | Additional metadata attributes to include in response |                                                                                                                                                                                                                                                                                                                 |
| output_format | string | Response format (json or csv)                         | json                                                                                                                                                                                                                                                                                                            |

### Response

Returns a list of dictionaries containing timeseries data for the specified stations, variables, and date range.

### Notes

- Use the `/info/list_STA_NAMES` endpoint to discover available station names.
- Use the `/info/list_stations_variables` endpoint to discover available variables for stations.
- Use the `/info/list_stations_dates` endpoint to discover the valid date range for stations.

## Station Timeseries Data (Single Date)

Retrieves timeseries data for all stations on a single date.

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/timeseries/stations/date"
    headers = {
        "api-key": "YOUR_API_KEY"
    }
    params = {
        "variables": "ATemp,RH",
        "date": "2020-01-01",
        "units": "metric",
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

    # Get station data for a single date
    url <- paste0(base_url, "/timeseries/stations/date")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(
        variables = "ATemp,RH",
        date = "2020-01-01",
        units = "metric",
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

    # Get station data for a single date
    curl -X GET "https://operevap.dri.edu/timeseries/stations/date?variables=ATemp,RH&date=2020-01-01&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

### Parameters

| Parameter     | Type   | Description                                           | Default                                                                                                                                                                                                                                                                                                         |
| ------------- | ------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variables     | string | One or more variables (comma-separated)               | ATemp, ATemp_Min, ATemp_Max, BP, BR, Ce, DO, DO_percent, EnergyT, ETo, ETr, evap_1, evap_2, evap_3, evap_4, evap_5, HSEnergyFlux, IncomingSR, inflow, SurfaceT, MO_StabilityL, NC_EnergyStored, NR, NW_AdvectedE, outflow, PH, RH, SamplingD, SkinTemp, SpecConduct, SWin, VP, VPD, WTemp, WVD, WD, WS, PofDays |
| units         | string | Units for returned data (english or metric)           | metric                                                                                                                                                                                                                                                                                                          |
| date          | string | Date (yyyy-mm-dd)                                     | 2020-01-01                                                                                                                                                                                                                                                                                                      |
| also_return   | string | Additional metadata attributes to include in response |                                                                                                                                                                                                                                                                                                                 |
| output_format | string | Response format (json or csv)                         | json                                                                                                                                                                                                                                                                                                            |

### Response

Returns a list of dictionaries containing timeseries data for all stations for the specified variables and date.
