export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      secondary: "sky",
      success: "emerald",
      info: "blue",
      warning: "amber",
      error: "red",
      neutral: "slate",
    },
    card: {
      slots: {
        header: "px-4 py-3 sm:px-4",
        body: "p-4 sm:p-4",
        footer: "px-4 py-3 sm:px-4",
      },
    },
  },
});
