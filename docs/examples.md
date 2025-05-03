# Examples

This section provides example code snippets for common tasks using the Reservoir Evaporation API.

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/samapriya/evap-docs/blob/main/docs/notebooks/examples.ipynb)

## Setup
### Set up a virtual environment

```console
python3 -m venv venv
source venv/bin/activate
pip install geopandas
pip install matplotlib
pip install pandas
pip install requests
```

=== "Python"

    ```python
    import requests
    import pandas as pd
    import matplotlib.pyplot as plt
    import json

    # API configuration
    API_KEY = "your_api_key_here"
    BASE_URL = "https://operevap.dri.edu/"  # Replace with the actual API base URL
    HEADERS = {
        "api-key": API_KEY
    }
    ```

=== "cURL"

    ```sh
    # Store your API key and base URL for reuse
    API_KEY="your_api_key_here"
    BASE_URL="https://api-url.example"  # Replace with the actual API base URL
    ```

## Get Available Reservoirs

=== "Python"

    ```python
    def get_reservoirs():
        """Get a list of available reservoirs."""
        url = f"{BASE_URL}/info/list_RES_NAMES"
        response = requests.post(url, headers=HEADERS)

        if response.status_code == 200 and "RES_NAMES" in response.json().keys():
            return response.json()["RES_NAMES]
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    reservoirs = get_reservoirs()
    if reservoirs:
        print(f"Number of reservoirs: {len(reservoirs)}")
        print("First 5 reservoirs:")
        for res in reservoirs[:5]:
            print(f"- {res}")

    ```

=== "cURL"

    ```sh
    # Get a list of available reservoirs
    curl -X POST "${BASE_URL}/info/list_RES_NAMES" \
         -H "api-key: ${API_KEY}" \
         -H "Content-Type: application/json"
    ```

## Get Reservoir Metadata

=== "Python"

    ```python
    def get_reservoir_metadata(reservoir_names):
        """Get metadata for specified reservoirs."""
        url = f"{BASE_URL}/metadata/reservoirs"
        params = {
            "RES_NAMES": ",".join(reservoir_names),
            "output_format": "json"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    reservoir_metadata = get_reservoir_metadata(["LAKE ALICE", "LAKE ESTES"])
    for res in reservoir_metadata:
        print(f"Reservoir: {res['RES_NAME']}")
        print(f"  Latitude: {res['LAT']}")
        print(f"  Longitude: {res['LON']}")
        print(f"  State: {res['Shape_Area']}")
    ```

=== "cURL"

    ```sh
    # Get metadata for specified reservoirs
    curl -X GET "${BASE_URL}/metadata/reservoirs?RES_NAMES=LAKE%20ALICE,LAKE%20ESTES&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

## Get Timeseries Data for a Reservoir

=== "Python"

    ```python
    def get_reservoir_timeseries(reservoir_name, start_date, end_date):
        """Get timeseries data for a reservoir."""
        url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        params = {
            "RES_NAMES": reservoir_name,
            "datasets": "nete-volume-calcs",
            "variables": "NetE,E_volume",
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    data = get_reservoir_timeseries("LAKE ALICE", "2020-01-01", "2020-12-31")

    # Convert to pandas DataFrame for analysis
    df = pd.DataFrame(data)
    df['start_date'] = pd.to_datetime(df['start_date'])
    df.set_index('start_date', inplace=True)

    # Plot the data
    plt.figure(figsize=(12, 6))
    plt.plot(df.index, df['NetE (mm)'], label='Net Evaporation')
    plt.title('Net Evaporation for LAKE ALICE (2020)')
    plt.xlabel('Date')
    plt.ylabel('Net Evaporation (mm/day)')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()
    ```

=== "cURL"

    ```sh
    # Get timeseries data for a reservoir
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20ALICE&datasets=nete-volume-calcs&variables=NetE,E_volume&start_date=2020-01-01&end_date=2020-12-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

## Compare Evaporation Between Multiple Reservoirs

=== "Python"

    ```python
    def compare_reservoirs(reservoir_names, start_date, end_date, variable="NetE"):
        """Compare a variable between multiple reservoirs."""
        url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        params = {
            "RES_NAMES": ",".join(reservoir_names),
            "datasets": "nete-volume-calcs",
            "variables": variable,
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    reservoirs_to_compare = ["LAKE ALICE", "LAKE ESTES", "RUEDI RESERVOIR"]
    comparison_data = compare_reservoirs(reservoirs_to_compare, "2020-06-01", "2020-08-31")

    # Process and visualize data
    df = pd.DataFrame(comparison_data)
    df['start_date'] = pd.to_datetime(df['start_date'])

    # Pivot the data to have one column per reservoir
    pivot_df = df.pivot_table(index='start_date', columns='RES_NAME', values='NetE (mm)')

    # Plot the data
    plt.figure(figsize=(12, 6))
    for reservoir in reservoirs_to_compare:
        plt.plot(pivot_df.index, pivot_df[reservoir], label=reservoir)

    plt.title('Net Evaporation Comparison (Summer 2020)')
    plt.xlabel('Date')
    plt.ylabel('Net Evaporation (mm/day)')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()
    ```

=== "cURL"

    ```sh
    # Compare evaporation between multiple reservoirs
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20ALICE,LAKE%20ESTES,RUEDI%20RESERVOIR&datasets=nete-volume-calcs&variables=NetE&start_date=2020-06-01&end_date=2020-08-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

## Calculate Monthly Evaporation Volumes

=== "Python"

    ```python
    def get_monthly_evaporation_volumes(reservoir_name, year):
        """Calculate monthly evaporation volumes for a reservoir."""
        start_date = f"{year}-01-01"
        end_date = f"{year}-12-31"

        url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        params = {
            "RES_NAMES": reservoir_name,
            "datasets": "nete-volume-calcs",
            "variables": "E_volume",
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame(data)
            df['start_date'] = pd.to_datetime(df['start_date'])
            df.set_index('start_date', inplace=True)

            # Calculate monthly totals
            monthly_data = df.resample('M').sum()
            monthly_data.index = monthly_data.index.strftime('%b')

            return monthly_data
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    monthly_volumes = get_monthly_evaporation_volumes("LAKE MEAD", 2020)

    # Plot monthly volumes
    plt.figure(figsize=(12, 6))
    plt.bar(monthly_volumes.index, monthly_volumes['E_volume (m3)'])
    plt.title('Monthly Evaporation Volumes for LAKE MEAD (2020)')
    plt.xlabel('Month')
    plt.ylabel('Evaporation Volume (cubic meters)')
    plt.grid(True)
    plt.tight_layout()
    plt.show()
    ```

=== "cURL"

    ```sh
    # Get monthly evaporation volumes data
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20MEAD&datasets=nete-volume-calcs&variables=E_volume&start_date=2020-01-01&end_date=2020-12-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

## Retrieve and Analyze Weather Data for a Reservoir

=== "Python"

    ```python
    def get_weather_data(reservoir_name, start_date, end_date):
        """Get weather data for a reservoir."""
        url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        params = {
            "RES_NAMES": reservoir_name,
            "datasets": "rtma",
            "variables": "pr,tmmx_c,tmmn_c,vpd_kpa,srad",
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    weather_data = get_weather_data("LAKE POWELL", "2020-06-01", "2020-08-31")
    df = pd.DataFrame(weather_data)
    df['start_date'] = pd.to_datetime(df['start_date'])
    df.set_index('start_date', inplace=True)

    # Calculate monthly averages
    monthly_weather = df.resample('M').agg({
        'pr (mm)': 'sum',
        'tmmx_c (degC)': 'mean',
        'tmmn_c (degC)': 'mean',
        'vpd_kpa (kpa)': 'mean',
        'srad (wm2)': 'mean'
    })

    print("Monthly Weather Summary for LAKE POWELL (Summer 2020):")
    print(f"Month | Total Precip (mm) | Avg Max Temp (°C) | Avg Min Temp (°C)")
    for idx, row in monthly_weather.iterrows():
        month = idx.strftime('%b %Y')
        print(f"{month} | {row['pr (mm)']:.1f} | {row['tmmx_c (degC)']:.1f} | {row['tmmn_c (degC)']:.1f}")
    ```

=== "cURL"

    ```sh
    # Get weather data for a reservoir
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20POWELL&datasets=rtma&variables=pr,tmmx_c,tmmn_c,vpd_kpa,srad&start_date=2020-06-01&end_date=2020-08-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

## Working with Multiple Datasets

### Combine Evaporation and Weather Data

=== "Python"

    ```python
    def combine_datasets(reservoir_name, start_date, end_date):
        """Combine evaporation and weather data for analysis."""
        # Get evaporation data
        evap_url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        evap_params = {
            "RES_NAMES": reservoir_name,
            "datasets": "nete-volume-calcs",
            "variables": "NetE,E_volume",
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        evap_response = requests.get(evap_url, headers=HEADERS, params=evap_params)

        # Get weather data
        weather_url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        weather_params = {
            "RES_NAMES": reservoir_name,
            "datasets": "rtma",
            "variables": "pr,tmmx_c,tmmn_c,vpd_kpa,srad",
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        weather_response = requests.get(weather_url, headers=HEADERS, params=weather_params)

        if evap_response.status_code == 200 and weather_response.status_code == 200:
            evap_data = pd.DataFrame(evap_response.json())
            weather_data = pd.DataFrame(weather_response.json())

            # Prepare data
            evap_data['start_date'] = pd.to_datetime(evap_data['start_date'])
            evap_data.set_index(['start_date', 'RES_NAME'], inplace=True)

            weather_data['date'] = pd.to_datetime(weather_data['start_date'])
            weather_data.set_index(['start_date', 'RES_NAME'], inplace=True)

            # Merge datasets
            combined_data = pd.merge(evap_data, weather_data, left_index=True, right_index=True)

            return combined_data
        else:
            print(f"Error: {evap_response.status_code} or {weather_response.status_code}")
            return None

    # Example usage
    combined_data = combine_datasets("LAKE MEAD", "2020-06-01", "2020-08-31")
    combined_data.reset_index(inplace=True)

    # Calculate correlation between variables
    correlation = combined_data[['NetE (mm)', 'tmmx_c (degC)', 'vpd_kpa (kpa)', 'srad (wm2)']].corr()
    print("Correlation Matrix:")
    print(correlation)

    # Plot relationship between temperature and evaporation
    plt.figure(figsize=(10, 6))
    plt.scatter(combined_data['tmmx_c (degC)'], combined_data['NetE (mm)'])
    plt.title('Relationship Between Maximum Temperature and Net Evaporation')
    plt.xlabel('Maximum Temperature (°C)')
    plt.ylabel('Net Evaporation (mm/day)')
    plt.grid(True)
    plt.tight_layout()
    plt.show()
    ```

=== "cURL"

    ```sh
    # Get evaporation data
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20MEAD&datasets=nete-volume-calcs&variables=NetE,E_volume&start_date=2020-06-01&end_date=2020-08-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}" > evap_data.json

    # Get weather data
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20MEAD&datasets=rtma&variables=pr,tmmx_c,tmmn_c,vpd_kpa,srad&start_date=2020-06-01&end_date=2020-08-31&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}" > weather_data.json

    # Note: Further processing would need to be done with tools like jq or imported into another tool
    ```

## Exporting Data to CSV

=== "Python"

    ```python
    def export_data_to_csv(reservoir_names, start_date, end_date, output_file):
        """Export data for multiple reservoirs to CSV."""
        url = f"{BASE_URL}/timeseries/daily/reservoirs/daterange"
        params = {
            "RES_NAMES": ",".join(reservoir_names),
            "datasets": "nete-volume-calcs",
            "variables": "NetE,E_volume",
            "start_date": start_date,
            "end_date": end_date,
            "units": "metric",
            "output_format": "json"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame(data)
            df.to_csv(output_file, index=False)
            print(f"Data exported to {output_file}")
            return True
        else:
            print(f"Error: {response.status_code}")
            return False

    # Example usage
    reservoir_list = ["LAKE POWELL", "LAKE MEAD", "FLAMING GORGE RESERVOIR"]
    export_data_to_csv(reservoir_list, "2020-01-01", "2020-12-31", "colorado_river_basin_evaporation_2020.csv")
    ```

=== "cURL"

    ```sh
    # Export data to a file
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20POWELL,LAKE%20MEAD,FLAMING%20GORGE%20RESERVOIR&datasets=nete-volume-calcs&variables=NetE,E_volume&start_date=2020-01-01&end_date=2020-12-31&units=metric&output_format=csv" \
         -H "api-key: ${API_KEY}" > colorado_river_basin_evaporation_2020.csv
    ```

These examples demonstrate common use cases for the Reservoir Evaporation API and provide a starting point for your own analysis. You can modify and extend these examples to suit your specific needs.
