---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Getting Started

This section provides an overview of how to begin using the Reservoir Evaporation API.

## Prerequisites

Before using the API, you will need:

1. An API key (see [Authentication](authentication.md))
2. Basic understanding of REST APIs and HTTP requests
3. A tool to make HTTP requests (e.g., cURL, Postman, or programming languages like Python, JavaScript, etc.)

## Base URL

All API requests should be made to the base URL of the API:

```
https://operevap.dri.edu
```

## Request Format

The API accepts request parameters as query parameters in the URL. Here's an example using Python requests:

```python
import requests

params = {
    "RES_NAMES": "LAKE ALICE",
    "start_date": "2020-01-01",
    "end_date": "2020-01-31"
}

url = "https://operevap.dri.edu/timeseries/daily/reservoirs/daterange"
headers = {
    "api-key": "YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)
```

## Response Format

The API returns data in either JSON or CSV format, which can be specified using the `output_format` parameter in your requests:

- `output_format=json` (default)
- `output_format=csv`

Example of requesting CSV output:

```python
import requests

params = {
    "RES_NAMES": "LAKE ALICE",
    "start_date": "2020-01-01",
    "end_date": "2020-01-31",
    "output_format": "csv"
}

url = "https://operevap.dri.edu/timeseries/daily/reservoirs/daterange"
headers = {
    "api-key": "YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
csv_data = response.text
print(csv_data)

# Optionally save to file
with open('lake_alice_data.csv', 'w') as f:
    f.write(csv_data)
```

## Units

For endpoints that return numerical values, you can specify whether you want the data in metric or English units using the `units` parameter:

- `units=metric` (default)
- `units=english`

Example using English units:

```python
import requests

params = {
    "RES_NAMES": "LAKE ALICE",
    "start_date": "2020-01-01",
    "end_date": "2020-01-31",
    "units": "english"
}

url = "https://operevap.dri.edu/timeseries/daily/reservoirs/daterange"
headers = {
    "api-key": "YOUR_API_KEY"
}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(data)
```

## API Sections

The API is organized into the following sections:

1. **Auth** - Endpoints for requesting API keys
2. **Help/Info** - Endpoints for discovering available datasets, variables, reservoirs, stations, and date ranges
3. **Metadata** - Endpoints for retrieving metadata about reservoirs and stations
4. **Timeseries** - Endpoints for retrieving timeseries data for reservoirs and stations

## Python Example

A Python example for interacting with the API is available at:
https://drive.google.com/drive/folders/1_JAM9JGwf40Tjo3fkx28mIP1tW5M55AO?usp=sharing

This example can help you get started with using the API in your Python applications.

## Next Steps

1. [Request an API key](../started/authentication.md)
2. Explore the available [reservoirs and stations](../endpoints/info-endpoints.md)
3. Retrieve [metadata](../endpoints/metadata-endpoints.md) for your reservoirs of interest
4. Retrieve [timeseries data](../endpoints/timeseries-endpoints.md) for your analysis
