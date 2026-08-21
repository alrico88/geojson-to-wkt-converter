import { parseFromWK, convertToWK } from "wkt-parser-helper";
import { Formatter } from "fracturedjsonjs";
import { exampleGeoJSON, exampleWKT } from "~/helpers/examples";

const jsonFormatter = new Formatter();

const DRAWN_SOURCE_LABELS = {
  geojson: "GeoJSON",
  wkt: "WKT",
} as const;

export default defineStore("mainStore", () => {
  const geojson = ref("");
  const wkt = ref("");

  const error = reactive({
    isError: false,
    message: "",
    from: "",
  });

  const drawnMap = ref(null);
  const drawnSource = ref<null | "geojson" | "wkt">(null);

  const drawnSourceLabel = computed(() =>
    drawnSource.value === null
      ? "Nothing"
      : DRAWN_SOURCE_LABELS[drawnSource.value]
  );

  function discardError() {
    error.isError = false;
  }

  function triggerError(from: "geojson" | "wkt", errMessage: string): void {
    error.isError = true;
    error.from = from;
    error.message = errMessage;
  }

  function convertGeoJSONToWkt() {
    discardError();

    try {
      const parsed = JSON.parse(geojson.value);

      wkt.value = convertToWK(parsed);
    } catch (err) {
      triggerError("geojson", getErrorMessage(err));
    }
  }

  function convertWktToGeoJSON() {
    discardError();

    try {
      const asGeoJSON = parseFromWK(wkt.value);

      if (asGeoJSON === null) {
        throw new Error("Invalid WKT string");
      }

      geojson.value = jsonFormatter.Serialize(asGeoJSON) as string;
    } catch (err) {
      triggerError("wkt", getErrorMessage(err));
    }
  }

  function drawOnMap(element: "geojson" | "wkt") {
    discardError();

    try {
      const value =
        element === "geojson"
          ? JSON.parse(geojson.value)
          : parseFromWK(wkt.value);

      if (value === null) {
        throw new Error("Invalid WKT string");
      }

      drawnMap.value = value;
      drawnSource.value = element;
    } catch (err) {
      triggerError(element, getErrorMessage(err));
    }
  }

  function getErrorMessage(err: unknown): string {
    return err instanceof Error ? err.message : String(err);
  }

  function loadExample(element: "geojson" | "wkt") {
    if (element === "geojson") {
      wkt.value = "";
      geojson.value = jsonFormatter.Serialize(exampleGeoJSON) as string;
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
