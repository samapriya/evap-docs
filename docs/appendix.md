# Appendix

## Available Variables

### Reservoir Variables

The following variables are available for reservoirs across different datasets:

#### RTMA Dataset (Weather Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| pr | Precipitation | mm | in |
| tmmx_c | Maximum temperature | °C | °F |
| tmmn_c | Minimum temperature | °C | °F |
| vpd_kpa | Vapor pressure deficit | kPa | kPa |
| vs2m | Wind speed at 2 meters | m/s | mph |
| srad | Solar radiation | W/m² | W/m² |
| th | Specific humidity | kg/kg | kg/kg |
| sph_kgkg | Specific humidity | kg/kg | kg/kg |
| pres_pa | Air pressure | Pa | Pa |

*Pre-2016 weather data is derived from the hybrid RTMA-gridMET dataset. See the [Methods](https://operevap.launchpad.wiki/methods/) section for additional details.

#### RES Dataset (Reservoir Physical Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| stage_m | Water surface elevation | m | ft |
| area_m2 | Surface area | m² | acre |
| depth_m | Average depth | m | ft |

#### LEM Dataset (DLEM Evaporation and Heat Stoarge Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| E_hs | Heat storage evaporation | mm/day | in/day |
| E_nhs | No heat storage evaporation | mm/day | in/day |
| Rn | Net radiation | W/m² | W/m² |
| Tw | Water temperature | °C | °F |
| Tw0 | Surface water temperature | °C | °F |
| Fetch | Fetch | m | ft |
| Lerr | Latent heat of evaporation | W/m² | W/m² |

#### NETE-VOLUME-CALCS Dataset (Net Evaporation and Evaporation Volume Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| NetE | Net evaporation | mm/day | in/day |
| E_volume | Evaporation volume | m³ | acre-ft |
| NetE_volume | Net evaporation volume | m³ | acre-ft |

## HTTP Status Codes

The API may return the following HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Successful response |
| 401 | Unauthorized (invalid or missing API key) |
| 404 | Not found (resource not found) |
| 422 | Validation error (invalid parameters) |
| 500 | Server error |

## Data Quality Flags

The API may include quality flags in the response data. These flags indicate the quality or reliability of the data:

| Flag | Description |
|------|-------------|
| 0 | Good data |
| 1 | Suspect data (automatically flagged) |
| 2 | Suspect data (manually flagged) |
| 3 | Missing data (gap filled) |
| 9 | Missing data (not filled) |

## File Formats

### Shapefile Components

When uploading shapefiles to filter reservoirs or stations by location, the following files are required:

| File Extension | Description |
|----------------|-------------|
| .shp | The main file that stores the geometry |
| .dbf | The database file that stores the attributes |
| .prj | The projection file that stores the coordinate system |
| .shx | The index file that stores the index of the geometry |

## Glossary

| Term | Definition |
|------|------------|
| Evaporation | The process by which water changes from a liquid to a gas or vapor |
| Net Evaporation | The difference between evaporation and precipitation (evaporation minus precipitation) |
| Reservoir | A large natural or artificial lake used as a source of water supply |
| Timeseries | A series of data points indexed in time order |
| Metadata | Data that provides information about other data |
| API | Application Programming Interface |
| REST | Representational State Transfer, an architectural style for APIs |
| JSON | JavaScript Object Notation, a lightweight data-interchange format |
| CSV | Comma-Separated Values, a text file format that uses commas to separate values |
| Dataset | A collection of data |
| Variable | A measurable property |
| Units | The standard of measurement |
| Metric | The International System of Units (SI) |
| English | The US Customary Units |
| Quality Flag | An indicator of the quality or reliability of the data |
| Shapefile | A geospatial vector data format for geographic information system software |
