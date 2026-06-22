export const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "").trim();

function buildGeocodeUrl(params) {
  const search = new URLSearchParams({
    ...params,
    key: GOOGLE_MAPS_API_KEY,
  });

  return `https://maps.googleapis.com/maps/api/geocode/json?${search.toString()}`;
}

export async function getCoordinates(address) {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing VITE_GOOGLE_MAPS_API_KEY");
  }

  const cleanAddress = String(address || "").trim();
  if (!cleanAddress) {
    throw new Error("Location is required.");
  }

  const response = await fetch(
    buildGeocodeUrl({
      address: cleanAddress,
      components: "country:IN",
    })
  );

  const data = await response.json();

  if (data.status !== "OK" || !data.results?.[0]?.geometry?.location) {
    throw new Error("Unable to geocode the location.");
  }

  return {
    name: data.results[0].formatted_address,
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };
}

export async function reverseGeocode(lat, lng) {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing VITE_GOOGLE_MAPS_API_KEY");
  }

  const response = await fetch(
    buildGeocodeUrl({
      latlng: `${lat},${lng}`,
    })
  );

  const data = await response.json();

  if (data.status !== "OK" || !data.results?.[0]?.formatted_address) {
    throw new Error("Unable to reverse geocode the location.");
  }

  return data.results[0].formatted_address;
}