import { geojsonToWkt, wktToGeojson } from "wkt-parser-helper";
import { Formatter } from "fracturedjsonjs";
import type { GeoJSON } from "geojson";
import { exampleGeoJSON, exampleWKT } from "~/helpers/examples";

const jsonFormatter = new Formatter();

function formatJSON(value: unknown): string {
  return jsonFormatter.Serialize(value) ?? "";
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function parseWkt(value: string): GeoJSON {
  const parsed = wktToGeojson(value.trim());

  if (!parsed) {
    throw new Error("Invalid WKT string");
  }

  return parsed;
}

export default defineStore("mainStore", () => {
  const geojson = ref("");
  const wkt = ref("");

  const error = reactive<{
    isError: boolean;
    message: string;
    from: InputFormat | null;
  }>({
    isError: false,
    message: "",
    from: null,
  });

  const drawnMap = shallowRef<GeoJSON | null>(null);
  const drawnSource = ref<InputFormat | null>(null);

  const drawnSourceLabel = computed(() =>
    drawnSource.value === null ? "Nothing" : FORMAT_LABELS[drawnSource.value]
  );

  function discardError() {
    error.isError = false;
    error.from = null;
  }

  function triggerError(from: InputFormat, err: unknown): void {
    error.isError = true;
    error.from = from;
    error.message = getErrorMessage(err);
  }

  function convertGeoJSONToWkt() {
    discardError();

    try {
      wkt.value = geojsonToWkt(JSON.parse(geojson.value));
    } catch (err) {
      triggerError("geojson", err);
    }
  }

  function convertWktToGeoJSON() {
    discardError();

    try {
      geojson.value = formatJSON(parseWkt(wkt.value));
    } catch (err) {
      triggerError("wkt", err);
    }
  }

  function drawOnMap(element: InputFormat) {
    discardError();

    try {
      drawnMap.value =
        element === "geojson" ? JSON.parse(geojson.value) : parseWkt(wkt.value);
      drawnSource.value = element;
    } catch (err) {
      triggerError(element, err);
    }
  }

  function loadExample(element: InputFormat) {
    discardError();

    if (element === "geojson") {
      wkt.value = "";
      geojson.value = formatJSON(exampleGeoJSON);
    } else {
      wkt.value = exampleWKT;
      geojson.value = "";
    }
  }

  return {
    geojson,
    wkt,
    error,
    drawnMap,
    drawnSource,
    drawnSourceLabel,
    discardError,
    convertGeoJSONToWkt,
    convertWktToGeoJSON,
    drawOnMap,
    loadExample,
  };
});
