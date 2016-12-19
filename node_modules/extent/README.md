[![Build Status](https://travis-ci.org/mapbox/extent.svg)](https://travis-ci.org/mapbox/extent)

# extent

A simple geographical extent.

## api

### `extent()`

Create a new extent object

### `extent.include([lon, lat])`

Expand the extent to include a lon, lat point.

### `extent.union([wsen])`

Expand the extent to include another extent.

### `extent.bbox()`

Get the extent's value. `null` if no points have
been included yet. Order is `[WSEN]` to match the [GeoJSON](http://geojson.org/)
standard.

### `extent.polygon()`

Get the extent as a [GeoJSON](http://geojson.org/) Polygon geometry object.

### `extent.contains([lon, lat])`

Returns `true` if this extent contains the given point, and false if not. Points
on the boundary of the extent are considered to be contained. If the extent is
invalid, returns `null`.
