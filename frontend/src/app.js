const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Determine the live URL dynamically or use the amigowebster.in fallback
const getLiveURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== "undefined") {
    // If we're on a custom live domain, use the current origin with the path
    if (window.location.hostname.includes("amigowebster.in")) {
      return "https://amigowebster.in/hillsite";
    }
    // Dynamic fallback for custom domains
    return window.location.origin + "/hillsite";
  }
  return "https://amigowebster.in/hillsite";
};

export const API_URL = isLocal ? "http://localhost:5000" : getLiveURL();

// export const API_URL = "https://amigowebster.in/hillsite-api";
export default API_URL;
