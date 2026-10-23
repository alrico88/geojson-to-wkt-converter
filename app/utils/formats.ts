export type InputFormat = "geojson" | "wkt";

export const FORMAT_LABELS: Record<InputFormat, string> = {
  geojson: "GeoJSON",
  wkt: "WKT",
};

export const FORMAT_FILE_EXTENSIONS: Record<InputFormat, string> = {
  geojson: "geojson",
  wkt: "txt",
};

export function downloadText(content: string, filename: string): void {
  const url = URL.createObjectURL(new Blob([content]));
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export type JsonStyle = "pretty" | "minified";

export interface OutputOptions {
  /** Decimal places to round coordinates to; `null` keeps them untouched */
  precision: number | null;
  jsonStyle: JsonStyle;
}
