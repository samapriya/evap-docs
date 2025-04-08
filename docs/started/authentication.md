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

# Authentication

## API Key

Access to the Reservoir Evaporation API requires an API key. This key must be included with each request to authenticate your application.

## Requesting an API Key

To obtain an API key, use the following endpoint with Python requests:

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

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Your full name (First Last) |
| email | string | A valid email address where the API key will be sent |
| justification | string | A brief explanation of why you would like an API key and how you will use it |

### Response

After submitting your request, you should receive an email with your API key within 24 hours.

## Using Your API Key

Once you have received your API key, you must include it in the header of each API request:

```python
import requests

url = "https://operevap.dri.edu/info/list_datasets"
headers = {
    "api-key": "YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)
```

### Example: Getting CSV Output

```python
import requests

url = "https://operevap.dri.edu/info/list_datasets"
headers = {
    "api-key": "YOUR_API_KEY"
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

## API Key Security

- Keep your API key secure and do not share it publicly.
- If you believe your API key has been compromised, request a new one.
- Do not embed your API key directly in client-side code that is accessible to users.
