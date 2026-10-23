import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

// MapLibre v6 can't locate its worker inside a bundle on its own
export default defineNuxtPlugin(() => {
  setWorkerUrl(workerUrl);
});
