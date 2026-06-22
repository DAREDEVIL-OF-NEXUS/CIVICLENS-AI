import { useEffect, useRef, useState } from "react";
import { getCoordinates, reverseGeocode } from "../utils/geocode.js";

function useGeolocationSync() {
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [locating, setLocating] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const debounceRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (!navigator.geolocation) return;

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const name = await reverseGeocode(lat, lng);

          setSelectedLocation({ lat, lng, name });
          setLocationInput(name);
          setLocationError("");
        } catch (error) {
          console.error(error);
          setLocationError("Could not resolve your current location.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    const cleanValue = String(locationInput || "").trim();

    if (!cleanValue) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setGeocoding(true);
        const result = await getCoordinates(cleanValue);
        setSelectedLocation(result);
        setLocationError("");
      } catch (error) {
        console.error(error);
      } finally {
        setGeocoding(false);
      }
    }, 700);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [locationInput]);

  const setLocationFromMap = async ({ lat, lng }) => {
    try {
      const name = await reverseGeocode(lat, lng);
      const next = { lat, lng, name };
      setSelectedLocation(next);
      setLocationInput(name);
      setLocationError("");
    } catch (error) {
      console.error(error);
      const fallback = {
        lat,
        lng,
        name: `Selected location (${lat.toFixed(5)}, ${lng.toFixed(5)})`,
      };
      setSelectedLocation(fallback);
      setLocationInput(fallback.name);
    }
  };

  const ensureResolvedLocation = async () => {
    if (
      selectedLocation &&
      Number.isFinite(Number(selectedLocation.lat)) &&
      Number.isFinite(Number(selectedLocation.lng))
    ) {
      return selectedLocation;
    }

    const cleanValue = String(locationInput || "").trim();
    if (!cleanValue) {
      throw new Error("Location is required.");
    }

    const result = await getCoordinates(cleanValue);
    setSelectedLocation(result);
    return result;
  };

  return {
    locationInput,
    setLocationInput,
    selectedLocation,
    setLocationFromMap,
    ensureResolvedLocation,
    locationError,
    locating,
    geocoding,
  };
}

export default useGeolocationSync;