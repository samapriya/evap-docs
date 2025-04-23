# Authentication

## API Key

Access to the Reservoir Evaporation API requires an API key. This key must be included with each request to authenticate your application.

## Requesting an API Key

To obtain an API key, you need to make a request to the authentication endpoint:

=== "Python"

    ```python
    import requests

    url = "https://operevap.dri.edu/auth/request_key"
    params = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "justification": "Research on reservoir evaporation for climate impact study"
    }

    response = requests.get(url, params=params)
    print(response.text)
    ```

=== "R"

    ```r
    library(httr)

    # API configuration
    base_url <- "https://operevap.dri.edu"

    # Request an API key
    url <- paste0(base_url, "/auth/request_key")

    response <- GET(
      url,
      query = list(
        name = "John Doe",
        email = "john.doe@example.com",
        justification = "Research on reservoir evaporation for climate impact study"
      )
    )

    # Print response
    content <- content(response, "text", encoding = "UTF-8")
    cat(content)
    ```

=== "cURL"

    ```sh
    # Request an API key
    curl -X GET "https://operevap.dri.edu/auth/request_key?name=John%20Doe&email=john.doe@example.com&justification=Research%20on%20reservoir%20evaporation%20for%20climate%20impact%20study"
    ```

### Parameters

| Parameter     | Type   | Description                                                                  |
| ------------- | ------ | ---------------------------------------------------------------------------- |
| name          | string | Your full name (First Last)                                                  |
| email         | string | A valid email address where the API key will be sent                         |
| justification | string | A brief explanation of why you would like an API key and how you will use it |

### Response

After submitting your request, you should receive an email with your API key within 24 hours.

## Using Your API Key

Once you have received your API key, you must include it in the header of each API request:

=== "Python"

    ```python
    import requests
    import os

    # You can store your API key as an environment variable for security
    api_key = os.environ.get("OPEREVAP_API_KEY", "YOUR_API_KEY")

    url = "https://operevap.dri.edu/info/list_datasets"
    headers = {
        "api-key": api_key
    }

    response = requests.get(url, headers=headers)
    data = response.json()
    print(data)
    ```

=== "R"

    ```r
    library(httr)
    library(jsonlite)

    # API configuration
    # Store your API key in .Renviron for security
    api_key <- Sys.getenv("OPEREVAP_API_KEY", "YOUR_API_KEY")
    base_url <- "https://operevap.dri.edu"

    # Make a request using your API key
    url <- paste0(base_url, "/info/list_datasets")

    response <- GET(
      url,
      add_headers("api-key" = api_key)
    )

    # Parse response
    data <- fromJSON(content(response, "text", encoding = "UTF-8"))
    print(data)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Make a request using your API key
    curl -X GET "https://operevap.dri.edu/info/list_datasets" \
         -H "api-key: ${API_KEY}"
    ```

## Example: Getting CSV Output

=== "Python"

    ```python
    import requests
    import os

    # Get API key from environment variable
    api_key = os.environ.get("OPEREVAP_API_KEY", "YOUR_API_KEY")

    url = "https://operevap.dri.edu/info/list_datasets"
    headers = {
        "api-key": api_key
    }
    params = {
        "output_format": "csv"
    }

    response = requests.get(url, headers=headers, params=params)
    csv_data = response.text
    print(csv_data)

    # Optionally save to file
    with open('datasets.csv', 'w') as f:
        f.write(csv_data)
    ```

=== "R"

    ```r
    library(httr)

    # API configuration
    api_key <- Sys.getenv("OPEREVAP_API_KEY", "YOUR_API_KEY")
    base_url <- "https://operevap.dri.edu"

    # Get data in CSV format
    url <- paste0(base_url, "/info/list_datasets")

    response <- GET(
      url,
      add_headers("api-key" = api_key),
      query = list(output_format = "csv")
    )

    # Get CSV content
    csv_data <- content(response, "text", encoding = "UTF-8")
    cat(csv_data)

    # Optionally save to file
    write(csv_data, file = "datasets.csv")

    # Or read directly into a data frame
    csv_connection <- textConnection(csv_data)
    datasets_df <- read.csv(csv_connection)
    close(csv_connection)
    print(datasets_df)
    ```

=== "cURL"

    ```sh
    # Set your API key
    API_KEY="YOUR_API_KEY"

    # Get data in CSV format
    curl -X GET "https://operevap.dri.edu/info/list_datasets?output_format=csv" \
         -H "api-key: ${API_KEY}" \
         -o datasets.csv
    ```

## API Key Security

- Keep your API key secure and do not share it publicly.
- If you believe your API key has been compromised, request a new one.
- Do not embed your API key directly in client-side code that is accessible to users.
- Use environment variables or secure configuration files to store your API key:
  - Python: Use `os.environ.get("OPEREVAP_API_KEY")`
  - R: Use `Sys.getenv("OPEREVAP_API_KEY")`
  - Bash/cURL: Use `export OPEREVAP_API_KEY="your-key"` and reference with `${OPEREVAP_API_KEY}`
