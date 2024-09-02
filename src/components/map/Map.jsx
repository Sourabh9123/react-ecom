import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing marker issue in React with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map = () => {
  const fetchLocationByIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      console.log(data, "------------------------------------");
      const { latitude, longitude, city, region, country } = data;
      console.log(
        "IP-Based Location -> Latitude: ",
        latitude,
        "Longitude: ",
        longitude
      );
      // setLocationData({ latitude, longitude });
      console.log("state", locationData);
    } catch (error) {
      console.error("Error fetching IP-based location: ", error);
    }
  };

  const [locationData, setLocationData] = useState({
    latitude: 22.5,
    longitude: 88.3,
  });
  const [loading, setLoading] = useState(true);

  const getPermissionLandLong = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(
          "Exact Location -> Latitude: ",
          latitude,
          "Longitude: ",
          longitude
        );
        setLocationData({ latitude, longitude });
        setLoading(false); // Set loading to false once location is retrieved
      },
      (error) => {
        console.error("Error fetching location: ", error);
        setLoading(false); // Stop loading even if there's an error
      },
      options
    );
  };

  useEffect(() => {
    getPermissionLandLong();
    fetchLocationByIP();
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  const { latitude, longitude } = locationData;

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
        <Popup>
          Current Location: {latitude.toFixed(7)}, {longitude.toFixed(7)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
