export const formatDate = (dateString) => {
    const userLocale = navigator.language || "en-US"; // Detect user locale
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(userLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  export function toLocalISOString(date) {

    return new Date(date).toISOString();
  }