import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const GoogleMaps = (props) => {
  const [clickedMarker, setClickedMarker] = useState(false);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: props.lat,
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
      <Marker position={center} onClick={() => setClickedMarker(true)} />
      {clickedMarker && (
        <InfoWindow
          position={center}
          onCloseClick={() => setClickedMarker(false)}
        >
          <div>
            <a
              href={`http://maps.google.com/maps?z=12&t=m&q=loc:${props.lat}+${props.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              Visit on Google Maps
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMaps;
