export type MapStyle = "color" | "light" | "dark";

export const MAP_STYLES: Record<
  MapStyle,
  { label: string; icon: string; url: string }
> = {
  color: {
    label: "Coloured",
    icon: "i-lucide-palette",
    url: "https://tiles.openfreemap.org/styles/liberty",
  },
  light: {
    label: "Light",
    icon: "i-lucide-sun",
    url: "https://tiles.openfreemap.org/styles/positron",
  },
  dark: {
    label: "Dark",
    icon: "i-lucide-moon",
    url: "https://tiles.openfreemap.org/styles/dark",
  },
};
