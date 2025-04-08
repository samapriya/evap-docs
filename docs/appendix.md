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

#### RES Dataset (Reservoir Physical Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| stage_m | Water surface elevation | m | ft |
| area_m2 | Surface area | m² | acre |
| depth_m | Average depth | m | ft |

#### LEM Dataset (Energy Balance Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| E_hs | Heat storage evaporation | mm/day | in/day |
| E_nhs | No heat storage evaporation | mm/day | in/day |
| Rn | Net radiation | W/m² | W/m² |
| Tw | Water temperature | °C | °F |
| Tw0 | Surface water temperature | °C | °F |
| Fetch | Fetch | m | ft |
| Lerr | Latent heat of evaporation | W/m² | W/m² |

#### NETE-VOLUME-CALCS Dataset (Evaporation Variables)
| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| NetE | Net evaporation | mm/day | in/day |
| E_volume | Evaporation volume | m³ | acre-ft |
| NetE_volume | Net evaporation volume | m³ | acre-ft |

### Station Variables

The following variables are available for stations:

| Variable | Description | Units (Metric) | Units (English) |
|----------|-------------|----------------|-----------------|
| ATemp | Air temperature | °C | °F |
| ATemp_Min | Minimum air temperature | °C | °F |
| ATemp_Max | Maximum air temperature | °C | °F |
| BP | Barometric pressure | hPa | inHg |
| BR | Bowen ratio | unitless | unitless |
| Ce | Bulk transfer coefficient | unitless | unitless |
| DO | Dissolved oxygen | mg/L | mg/L |
| DO_percent | Dissolved oxygen percentage | % | % |
| EnergyT | Energy balance term | W/m² | W/m² |
| ETo | Reference evapotranspiration (grass) | mm/day | in/day |
| ETr | Reference evapotranspiration (alfalfa) | mm/day | in/day |
| evap_1 | Evaporation method 1 | mm/day | in/day |
| evap_2 | Evaporation method 2 | mm/day | in/day |
| evap_3 | Evaporation method 3 | mm/day | in/day |
| evap_4 | Evaporation method 4 | mm/day | in/day |
| evap_5 | Evaporation method 5 | mm/day | in/day |
| HSEnergyFlux | Heat storage energy flux | W/m² | W/m² |
| IncomingSR | Incoming solar radiation | W/m² | W/m² |
| inflow | Inflow | m³/s | cfs |
| SurfaceT | Surface temperature | °C | °F |
| MO_StabilityL | Monin-Obukhov stability length | m | ft |
| NC_EnergyStored | Net change in energy stored | W/m² | W/m² |
| NR | Net radiation | W/m² | W/m² |
| NW_AdvectedE | Net advected energy | W/m² | W/m² |
| outflow | Outflow | m³/s | cfs |
| PH | pH | unitless | unitless |
| RH | Relative humidity | % | % |
| SamplingD | Sampling depth | m | ft |
| SkinTemp | Skin temperature | °C | °F |
| SpecConduct | Specific conductance | μS/cm | μS/cm |
| SWin | Incoming shortwave radiation | W/m² | W/m² |
| VP | Vapor pressure | kPa | kPa |
| VPD | Vapor pressure deficit | kPa | kPa |
| WTemp | Water temperature | °C | °F |
| WVD | Wind vector direction | degrees | degrees |
| WD | Wind direction | degrees | degrees |
| WS | Wind speed | m/s | mph |
| PofDays | Percentage of days with data | % | % |

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
