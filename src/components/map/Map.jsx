import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Set default icon for leaflet to fix missing marker issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = () => {
  const [locationData, setLocationData] = useState({
    latitude: 22.540282765647326,
    longitude: 88.32046458913354,
  });
  //22.540282765647326, 88.32046458913354
  //write a function which takes w parameter and return sum of it

  const get_permisstion_land_long = async () => {
    const options = {
      enableHighAccuracy: true, // Request high accuracy
      timeout: 5000, // Maximum time to wait for a response
      maximumAge: 0, // Don't use a cached location
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude: ", latitude, "Longitude: ", longitude);
        await setLocationData((prevState) => ({
          latitude,
          longitude,
        }));
        console.log(locationData);
        // You can now send the latitude and longitude to the server
      },
      (error) => {
        console.error("Error fetching location: ", error);
      }
    );
  };

  // Fetch location from the DRF backend
  useEffect(() => {
    get_permisstion_land_long();
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     console.log("Latitude: ", latitude, "Longitude: ", longitude);
    //     setLocationData(latitude, longitude);
    //     // You can now send the latitude and longitude to the server
    //   },
    //   (error) => {
    //     console.error("Error fetching location: ", error);
    //   }
    // );

    const { latitude, longitude } = locationData;

    const fetchLocation = async () => {
      try {
        const response = await fetch("http://localhost:8000/map/location/"); // DRF endpoint
        const data = await response.json();
        console.log(response, " -------------------------");
        setLocationData(data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    // fetchLocation();
  }, []);

  if (!locationData) {
    return <div>Loading map...</div>;
  }

  // const { latitude, longitude, city, region, country } = locationData;
  const { latitude, longitude } = locationData;
  const city = "";
  const region = "";
  const country = "";
  console.log("after , ", latitude, longitude);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        {/* <Popup>
          {city}, {region}, {country}
        </Popup> */}
      </Marker>
    </MapContainer>
  );
};

export default Map;
