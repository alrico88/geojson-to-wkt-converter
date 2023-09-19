import { parseFromWK, convertToWK } from "wkt-parser-helper";
import { Formatter } from "fracturedjsonjs";

const jsonFormatter = new Formatter();

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

  const getDrawnSource = computed(() => {
    switch (drawnSource.value) {
      case "geojson":
        return "GeoJSON";
      case "wkt":
        return "WKT";
      default:
        return "Nothing";
    }
  });

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
      triggerError("geojson", JSON.stringify(err));
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
      triggerError("wkt", JSON.stringify(err));
    }
  }

  function drawOnMap(element: "geojson" | "wkt") {
    const value =
      element === "geojson"
        ? JSON.parse(geojson.value)
        : parseFromWK(wkt.value);

    drawnMap.value = value;
    drawnSource.value = element;
  }

  return {
    geojson,
    wkt,
    error,
    drawnMap,
    drawnSource,
    convertGeoJSONToWkt,
    convertWktToGeoJSON,
    drawOnMap,
    getDrawnSource,
  };
});
