import { React, useState } from "react";
import "./LocationAuto.scss";

import PlacesAutocomplete from "react-places-autocomplete";

const LocationAuto = (props) => {
  const [cities, setCities] = useState("");

  const handleSelect = async (value) => {
    props.setLocValue(value);
    props.setIsClicked(false);
    console.log("value :>> ", value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={cities}
        onChange={setCities}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input className="locationInput" {...getInputProps( { placeholder: "Choose city"} )} autoFocus/>

            <div
              className={
                suggestions.length > 0 ? "suggestionList" : "suggestionOff"
              }
            >
              {loading ? <div>loading...</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#FCC117" : "#fff",
                  color: suggestion.active ? "#fff" : "#000000",
                  weight: suggestion.active ? "600" : "500",
                };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    className="suggestions"
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationAuto;
