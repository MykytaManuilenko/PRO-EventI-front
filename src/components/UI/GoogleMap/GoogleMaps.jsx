import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const GoogleMaps = (props) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  //   const lat = parseFloat(props.lat);

  //   const lng = parseFloat(props.lng);
  const center = {
    lat: props.lat,
    // lat: 52.13,
    lng: props.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBN_OWsAKQlSBEXtL_APmQstbRZalUVSOE",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMaps;
