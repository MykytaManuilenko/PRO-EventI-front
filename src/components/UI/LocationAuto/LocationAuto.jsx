import { React, useState } from "react";
import "./LocationAuto.scss";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress } from "react-places-autocomplete";

const LocationAuto = (props) => {
  const [cities, setCities] = useState(
    props.locationValue &&
      `${props.locationValue.street}, ${props.locationValue.city}, ${props.locationValue.country}`
  );

  const hadleChange = (value) => {
    setCities(value);
  };

  const handleSelect = async (value) => {
    setCities(value);
    console.log("value :>> ", value);
    const city = value.split(",")[1];
    const street = value.split(",")[0];

    geocodeByAddress(value).then((res) => {
      res[0].address_components.map((add) => {
        if (add.types[0] === "country") {
          props.setAddress({
            city: city,
            street: street,
            country: add.short_name,
          });
        }
      });
    });
  };

  return (
    <>
      <PlacesAutocomplete
        value={cities && cities}
        onChange={hadleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: ["pl"] } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ width: "100%" }}>
            <input
              {...getInputProps({
                placeholder: "Choose city",
                className: props.className,
              })}
            />
            <label style={{ left: 0 }} className={props.labelClass}>
              Location
            </label>

            <div
              className={
                suggestions.length > 0 ? "suggestionList" : "suggestionOff"
              }
            >
              {loading ? <div>loading...</div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#FCC117" : "#fff",
                  color: suggestion.active ? "#fff" : "#000000",
                  weight: suggestion.active ? "600" : "500",
                };

                return (
                  <div
                    key={index}
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
    </>
  );
};

export default LocationAuto;
