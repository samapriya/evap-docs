# Examples

This section provides example code snippets for common tasks using the Reservoir Evaporation API.
NOTE: R and cURL have not been tested yet!

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

=== "R"

    ```r
    library(httr)
    library(jsonlite)
    library(dplyr)
    library(ggplot2)
    library(lubridate)

    # API configuration
    API_KEY <- "your_api_key_here"
    BASE_URL <- "https://api-url.example"  # Replace with the actual API base URL
    HEADERS <- add_headers(`api-key` = API_KEY)
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

=== "R"

    ```r
    get_reservoirs <- function() {
      # Get a list of available reservoirs
      url <- paste0(BASE_URL, "/info/list_RES_NAMES")
      response <- GET(url, HEADERS)

      if (status_code(response) == 200) {
        return(fromJSON(content(response, "text", encoding = "UTF-8")))
      } else {
        print(paste("Error:", status_code(response)))
        return(NULL)
      }
    }

    # Example usage
    reservoirs <- get_reservoirs()
    print(paste("Number of reservoirs:", length(reservoirs)))
    print("First 5 reservoirs:")
    for (i in 1:5) {
      print(paste("-", reservoirs[i]))
    }
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

=== "R"

    ```r
    get_reservoir_metadata <- function(reservoir_names) {
      # Get metadata for specified reservoirs
      url <- paste0(BASE_URL, "/metadata/reservoirs")
      params <- list(
        RES_NAMES = paste(reservoir_names, collapse = ","),
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        return(fromJSON(content(response, "text", encoding = "UTF-8")))
      } else {
        print(paste("Error:", status_code(response)))
        return(NULL)
      }
    }

    # Example usage
    reservoir_metadata <- get_reservoir_metadata(c("LAKE ALICE", "LAKE ESTES"))
    for (i in 1:length(reservoir_metadata$res_name)) {
      print(paste("Reservoir:", reservoir_metadata$res_name[i]))
      print(paste("  Latitude:", reservoir_metadata$latitude[i]))
      print(paste("  Longitude:", reservoir_metadata$longitude[i]))
      print(paste("  State:", reservoir_metadata$state[i]))
    }
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

=== "R"

    ```r
    get_reservoir_timeseries <- function(reservoir_name, start_date, end_date) {
      # Get timeseries data for a reservoir
      url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      params <- list(
        RES_NAMES = reservoir_name,
        datasets = "nete-volume-calcs",
        variables = "NetE,E_volume",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        return(fromJSON(content(response, "text", encoding = "UTF-8")))
      } else {
        print(paste("Error:", status_code(response)))
        return(NULL)
      }
    }

    # Example usage
    data <- get_reservoir_timeseries("LAKE ALICE", "2020-01-01", "2020-12-31")

    # Convert to data frame for analysis
    df <- as.data.frame(data)
    df$start_date <- as.Date(df$start_date)

    # Plot the data
    ggplot(df, aes(x = start_date, y = NetE (mm))) +
      geom_line() +
      labs(
        title = "Net Evaporation for LAKE ALICE (2020)",
        x = "Date",
        y = "Net Evaporation (mm/day)"
      ) +
      theme_minimal() +
      theme(
        panel.grid = element_line(color = "gray90"),
        plot.title = element_text(hjust = 0.5)
      )
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

=== "R"

    ```r
    compare_reservoirs <- function(reservoir_names, start_date, end_date, variable = "NetE (mm)") {
      # Compare a variable between multiple reservoirs
      url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      params <- list(
        RES_NAMES = paste(reservoir_names, collapse = ","),
        datasets = "nete-volume-calcs",
        variables = variable,
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        return(fromJSON(content(response, "text", encoding = "UTF-8")))
      } else {
        print(paste("Error:", status_code(response)))
        return(NULL)
      }
    }

    # Example usage
    reservoirs_to_compare <- c("LAKE ALICE", "LAKE ESTES", "RUEDI RESERVOIR")
    comparison_data <- compare_reservoirs(reservoirs_to_compare, "2020-06-01", "2020-08-31")

    # Process and visualize data
    df <- as.data.frame(comparison_data)
    df$start_date <- as.Date(df$start_date)

    # Prepare data for plotting
    df_wide <- df %>%
      pivot_wider(
        id_cols = start_date,
        names_from = RES_NAME,
        values_from = NetE (mm)
      )

    # Reshape for ggplot
    df_long <- df %>%
      select(start_date, RES_NAME, NetE (mm))

    # Plot the data
    ggplot(df_long, aes(x = start_date, y = NetE (mm), color = RES_NAME)) +
      geom_line() +
      labs(
        title = "Net Evaporation Comparison (Summer 2020)",
        x = "Date",
        y = "Net Evaporation (mm/day)",
        color = "Reservoir"
      ) +
      theme_minimal() +
      theme(
        panel.grid = element_line(color = "gray90"),
        plot.title = element_text(hjust = 0.5),
        legend.position = "bottom"
      )
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

=== "R"

    ```r
    get_monthly_evaporation_volumes <- function(reservoir_name, year) {
      # Calculate monthly evaporation volumes for a reservoir
      start_date <- paste0(year, "-01-01")
      end_date <- paste0(year, "-12-31")

      url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      params <- list(
        RES_NAMES = reservoir_name,
        datasets = "nete-volume-calcs",
        variables = "E_volume",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        data <- fromJSON(content(response, "text", encoding = "UTF-8"))
        df <- as.data.frame(data)
        df$start_date <- as.Date(df$start_date)

        # Calculate monthly totals
        monthly_data <- df %>%
          mutate(month = format(start_date, "%b")) %>%
          group_by(month) %>%
          summarize(E_volume = sum(E_volume (m3), na.rm = TRUE)) %>%
          mutate(month = factor(month, levels = month.abb))

        return(monthly_data)
      } else {
        print(paste("Error:", status_code(response)))
        return(NULL)
      }
    }

    # Example usage
    monthly_volumes <- get_monthly_evaporation_volumes("LAKE MEAD", 2020)

    # Plot monthly volumes
    ggplot(monthly_volumes, aes(x = month, y = E_volume (m3))) +
      geom_col(fill = "steelblue") +
      labs(
        title = "Monthly Evaporation Volumes for LAKE MEAD (2020)",
        x = "Month",
        y = "Evaporation Volume (cubic meters)"
      ) +
      theme_minimal() +
      theme(
        panel.grid = element_line(color = "gray90"),
        plot.title = element_text(hjust = 0.5)
      )
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

=== "R"

    ```r
    get_weather_data <- function(reservoir_name, start_date, end_date) {
      # Get weather data for a reservoir
      url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      params <- list(
        RES_NAMES = reservoir_name,
        datasets = "rtma",
        variables = "pr,tmmx_c,tmmn_c,vpd_kpa,srad",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        return(fromJSON(content(response, "text", encoding = "UTF-8")))
      } else {
        print(paste("Error:", status_code(response)))
        return(NULL)
      }
    }

    # Example usage
    weather_data <- get_weather_data("LAKE POWELL", "2020-06-01", "2020-08-31")
    df <- as.data.frame(weather_data)
    df$start_date <- as.Date(df$start_date)

    # Calculate monthly averages
    monthly_weather <- df %>%
      mutate(month = format(start_date, "%b %Y")) %>%
      group_by(month) %>%
      summarize(
        pr_total = sum(pr (mm), na.rm = TRUE),
        tmmx_c_avg = mean(tmmx_c (degC), na.rm = TRUE),
        tmmn_c_avg = mean(tmmn_c (degC), na.rm = TRUE),
        vpd_kpa_avg = mean(vpd_kpa (kpa), na.rm = TRUE),
        srad_avg = mean(srad (wm2), na.rm = TRUE)
      )

    # Print monthly summary
    cat("Monthly Weather Summary for LAKE POWELL (Summer 2020):\n")
    cat("Month | Total Precip (mm) | Avg Max Temp (°C) | Avg Min Temp (°C)\n")

    for (i in 1:nrow(monthly_weather)) {
      cat(sprintf("%s | %.1f | %.1f | %.1f\n",
                 monthly_weather$month[i],
                 monthly_weather$pr_total[i],
                 monthly_weather$tmmx_c_avg[i],
                 monthly_weather$tmmn_c_avg[i]))
    }
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

=== "R"

    ```r
    combine_datasets <- function(reservoir_name, start_date, end_date) {
      # Combine evaporation and weather data for analysis

      # Get evaporation data
      evap_url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      evap_params <- list(
        RES_NAMES = reservoir_name,
        datasets = "nete-volume-calcs",
        variables = "NetE,E_volume",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      evap_response <- GET(evap_url, HEADERS, query = evap_params)

      # Get weather data
      weather_url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      weather_params <- list(
        RES_NAMES = reservoir_name,
        datasets = "rtma",
        variables = "pr,tmmx_c,tmmn_c,vpd_kpa,srad",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      weather_response <- GET(weather_url, HEADERS, query = weather_params)

      if (status_code(evap_response) == 200 && status_code(weather_response) == 200) {
        evap_data <- as.data.frame(fromJSON(content(evap_response, "text", encoding = "UTF-8")))
        weather_data <- as.data.frame(fromJSON(content(weather_response, "text", encoding = "UTF-8")))

        # Prepare data
        evap_data$start_date <- as.Date(evap_data$start_date)
        weather_data$start_date <- as.Date(weather_data$start_date)

        # Merge datasets
        combined_data <- inner_join(
          evap_data,
          weather_data,
          by = c("start_date", "RES_NAME")
        )

        return(combined_data)
      } else {
        print(paste("Error:", status_code(evap_response), "or", status_code(weather_response)))
        return(NULL)
      }
    }

    # Example usage
    combined_data <- combine_datasets("LAKE MEAD", "2020-06-01", "2020-08-31")

    # Calculate the correlation between variables
    correlation <- cor(combined_data[, c("NetE (mm)", "tmmx_c (degC)", "vpd_kpa (kpa)", "srad (wm2)")],
                       use = "complete.obs")
    cat("Correlation Matrix:\n")
    print(correlation)

    # Plot the relationship between temperature and evaporation
    ggplot(combined_data, aes(x = tmmx_c (degC), y = NetE (mm))) +
      geom_point() +
      geom_smooth(method = "lm", se = TRUE, color = "blue") +
      labs(
        title = "Relationship Between Maximum Temperature and Net Evaporation",
        x = "Maximum Temperature (°C)",
        y = "Net Evaporation (mm/day)"
      ) +
      theme_minimal() +
      theme(
        panel.grid = element_line(color = "gray90"),
        plot.title = element_text(hjust = 0.5)
      )
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

=== "R"

    ```r
    export_data_to_csv <- function(reservoir_names, start_date, end_date, output_file) {
      # Export data for multiple reservoirs to CSV
      url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/daterange")
      params <- list(
        RES_NAMES = paste(reservoir_names, collapse = ","),
        datasets = "nete-volume-calcs",
        variables = "NetE,E_volume",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        data <- fromJSON(content(response, "text", encoding = "UTF-8"))
        df <- as.data.frame(data)
        write.csv(df, file = output_file, row.names = FALSE)
        cat(paste("Data exported to", output_file, "\n"))
        return(TRUE)
      } else {
        cat(paste("Error:", status_code(response), "\n"))
        return(FALSE)
      }
    }

    # Example usage
    reservoir_list <- c("LAKE POWELL", "LAKE MEAD", "FLAMING GORGE RESERVOIR")
    export_data_to_csv(reservoir_list, "2020-01-01", "2020-12-31", "colorado_river_basin_evaporation_2020.csv")
    ```

=== "cURL"

    ```sh
    # Export data to a file
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/daterange?RES_NAMES=LAKE%20POWELL,LAKE%20MEAD,FLAMING%20GORGE%20RESERVOIR&datasets=nete-volume-calcs&variables=NetE,E_volume&start_date=2020-01-01&end_date=2020-12-31&units=metric&output_format=csv" \
         -H "api-key: ${API_KEY}" > colorado_river_basin_evaporation_2020.csv
    ```


<!--
## Working with Station Data
=== "Python"

    ```python
    def get_station_data(station_names, start_date, end_date):
        """Get data for weather stations."""
        url = f"{BASE_URL}/timeseries/stations/daterange"
        params = {
            "STA_NAMES": ",".join(station_names),
            "variables": "ATemp,RH,WS,WD",
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
    stations = ["LAKE MEAD_STATION", "LAKE POWELL_STATION"]
    station_data = get_station_data(stations, "2020-06-01", "2020-06-30")

    # Convert to DataFrame
    df = pd.DataFrame(station_data)
    df['date'] = pd.to_datetime(df['date'])

    # Plot temperature comparison between stations
    pivot_df = df.pivot_table(index='date', columns='sta_name', values='ATemp')

    plt.figure(figsize=(12, 6))
    for station in stations:
        plt.plot(pivot_df.index, pivot_df[station], label=station)

    plt.title('Air Temperature Comparison Between Stations (June 2020)')
    plt.xlabel('Date')
    plt.ylabel('Air Temperature (°C)')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()
    ```

=== "R"

    ```r
    get_station_data <- function(station_names, start_date, end_date) {
      # Get data for weather stations
      url <- paste0(BASE_URL, "/timeseries/stations/daterange")
      params <- list(
        STA_NAMES = paste(station_names, collapse = ","),
        variables = "ATemp,RH,WS,WD",
        start_date = start_date,
        end_date = end_date,
        units = "metric",
        output_format = "json"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        return(fromJSON(content(response, "text", encoding = "UTF-8")))
      } else {
        cat(paste("Error:", status_code(response), "\n"))
        return(NULL)
      }
    }

    # Example usage
    stations <- c("LAKE MEAD_STATION", "LAKE POWELL_STATION")
    station_data <- get_station_data(stations, "2020-06-01", "2020-06-30")

    # Convert to data frame
    df <- as.data.frame(station_data)
    df$date <- as.Date(df$date)

    # Prepare data for plotting
    df_wide <- df %>%
      pivot_wider(
        id_cols = date,
        names_from = sta_name,
        values_from = ATemp
      )

    # Reshape for ggplot
    df_long <- df %>%
      select(date, sta_name, ATemp)

    # Plot temperature comparison between stations
    ggplot(df_long, aes(x = date, y = ATemp, color = sta_name)) +
      geom_line() +
      labs(
        title = "Air Temperature Comparison Between Stations (June 2020)",
        x = "Date",
        y = "Air Temperature (°C)",
        color = "Station"
      ) +
      theme_minimal() +
      theme(
        panel.grid = element_line(color = "gray90"),
        plot.title = element_text(hjust = 0.5),
        legend.position = "bottom"
      )
    ```

=== "cURL"

    ```sh
    # Get station data
    curl -X GET "${BASE_URL}/timeseries/stations/daterange?STA_NAMES=LAKE%20MEAD_STATION,LAKE%20POWELL_STATION&variables=ATemp,RH,WS,WD&start_date=2020-06-01&end_date=2020-06-30&units=metric&output_format=json" \
         -H "api-key: ${API_KEY}"
    ```

## GIS Integration

=== "Python"

    ```python
    import geopandas as gpd
    import matplotlib.pyplot as plt
    from matplotlib.colors import Normalize
    from matplotlib.cm import ScalarMappable

    def plot_reservoir_map(date):
        """Plot a map of reservoirs with evaporation values for a specific date."""
        # Get data for all reservoirs on a specific date
        url = f"{BASE_URL}/timeseries/daily/reservoirs/date"
        params = {
            "datasets": "nete-volume-calcs",
            "variables": "NetE",
            "date": date,
            "units": "metric",
            "output_format": "json",
            "also_return": "LAT,LON"
        }

        response = requests.get(url, headers=HEADERS, params=params)

        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame(data)

            # Create GeoDataFrame
            gdf = gpd.GeoDataFrame(
                df,
                geometry=gpd.points_from_xy(df.LON, df.LAT),
                crs="EPSG:4326"
            )

            # Get US states outline for background
            states = gpd.read_file('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
            western_states = states[states['name'].isin([
                'Washington', 'Oregon', 'California', 'Idaho', 'Nevada', 'Montana',
                'Wyoming', 'Utah', 'Colorado', 'Arizona', 'New Mexico', 'Texas',
                'North Dakota', 'South Dakota', 'Nebraska', 'Kansas', 'Oklahoma'
            ])]

            # Plot
            fig, ax = plt.subplots(1, 1, figsize=(12, 8))
            western_states.boundary.plot(ax=ax, linewidth=1, color='gray')

            # Plot points with color based on NetE value
            scatter = ax.scatter(
                gdf.geometry.x,
                gdf.geometry.y,
                c=gdf['NetE (mm)'],
                cmap='YlOrRd',
                s=50,
                alpha=0.7,
                edgecolor='black'
            )

            # Add colorbar
            norm = Normalize(vmin=gdf['NetE (mm)'].min(), vmax=gdf['NetE (mm)'].max())
            sm = ScalarMappable(norm=norm, cmap='YlOrRd')
            sm.set_array([])
            cbar = fig.colorbar(sm, ax=ax)
            cbar.set_label('Net Evaporation (mm/day)')

            # Add title and labels
            plt.title(f'Reservoir Net Evaporation on {date}')
            plt.xlabel('Longitude')
            plt.ylabel('Latitude')

            plt.tight_layout()
            plt.show()

            return gdf
        else:
            print(f"Error: {response.status_code}")
            return None

    # Example usage
    reservoir_map = plot_reservoir_map("2020-07-15")
    ```

=== "R"

    ```r
    library(sf)
    library(raster)
    library(ggplot2)
    library(viridis)

    plot_reservoir_map <- function(date) {
      # Plot a map of reservoirs with evaporation values for a specific date
      url <- paste0(BASE_URL, "/timeseries/daily/reservoirs/date")
      params <- list(
        datasets = "nete-volume-calcs",
        variables = "NetE",
        date = date,
        units = "metric",
        output_format = "json",
        also_return = "LAT,LON"
      )

      response <- GET(url, HEADERS, query = params)

      if (status_code(response) == 200) {
        data <- fromJSON(content(response, "text", encoding = "UTF-8"))
        df <- as.data.frame(data)

        # Create spatial data
        gdf <- st_as_sf(df, coords = c("LON", "LAT"), crs = 4326)

        # Get US states outline (requires having US state boundaries loaded)
        # For this example, assuming 'us_states' is available or could be loaded from a package
        # This is a placeholder - in a real script, you would need to load an actual shapefile
        # For example using: us_states <- st_read("path/to/us-states.shp")

        # Create a western_states subset
        western_states <- c("Washington", "Oregon", "California", "Idaho", "Nevada",
                           "Montana", "Wyoming", "Utah", "Colorado", "Arizona",
                           "New Mexico", "Texas", "North Dakota", "South Dakota",
                           "Nebraska", "Kansas", "Oklahoma")

        # Placeholder - this would filter your actual spatial data
        # western_states_geo <- us_states[us_states$name %in% western_states, ]

        # Plot
        # This is a simplified version - in a real application, you would use
        # the actual western_states_geo spatial data
        ggplot() +
          # geom_sf(data = western_states_geo, fill = NA, color = "gray") +
          geom_sf(data = gdf, aes(color = NetE (mm)), size = 3) +
          scale_color_viridis(option = "plasma", name = "Net Evaporation\n(mm/day)") +
          labs(
            title = paste("Reservoir Net Evaporation on", date),
            x = "Longitude",
            y = "Latitude"
          ) +
          theme_minimal() +
          theme(
            plot.title = element_text(hjust = 0.5),
            legend.position = "right"
          )

        return(gdf)
      } else {
        cat(paste("Error:", status_code(response), "\n"))
        return(NULL)
      }
    }

    # Example usage
    # reservoir_map <- plot_reservoir_map("2020-07-15")
    # print(reservoir_map)  # This would display the map if the sf object is available
    ```

=== "cURL"

    ```sh
    # Get geospatial data for reservoirs on a specific date
    curl -X GET "${BASE_URL}/timeseries/daily/reservoirs/date?datasets=nete-volume-calcs&variables=NetE&date=2020-07-15&units=metric&output_format=json&also_return=latitude,longitude" \
         -H "api-key: ${API_KEY}"
    ```
-->
These examples demonstrate common use cases for the Reservoir Evaporation API and provide a starting point for your own analysis. You can modify and extend these examples to suit your specific needs.
