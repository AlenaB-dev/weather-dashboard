import { useEffect, useState } from "react";

export function useGeolocation() {
  const [city, setCity] = useState(null);
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setPosition({ lat, lon });

        try {
          // Use Nominatim to get certain city
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
          );

          if (!res.ok) throw new Error("Failed to fetch city");

          const data = await res.json();
          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county;

          setCity(cityName || "Unknown location");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      },
    );
  }, []);

  return { city, position, error, isLoading };
}
