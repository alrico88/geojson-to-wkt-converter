import area from "@turf/area";
import length from "@turf/length";
import { feature } from "@turf/helpers";
import { coordAll, geomEach } from "@turf/meta";
import { getGeoJSONBBox } from "bbox-helper-functions";
import type { Feature, FeatureCollection, GeoJSON } from "geojson";

function asFeature(geojson: GeoJSON): Feature | FeatureCollection {
  return geojson.type === "Feature" || geojson.type === "FeatureCollection"
    ? geojson
    : feature(geojson);
}

export function useGeometryStats(geojson: MaybeRefOrGetter<GeoJSON>) {
  return computed(() => {
    const value = toValue(geojson);
    const geometryTypes = new Set<string>();

    geomEach(value, (geometry) => {
      if (geometry) {
        geometryTypes.add(geometry.type);
      }
    });

    return {
      types: [...geometryTypes],
      vertices: coordAll(value).length,
      bbox: getGeoJSONBBox(value),
      areaSquareMeters: area(value),
      lengthKilometers: length(asFeature(value), { units: "kilometers" }),
    };
  });
}
