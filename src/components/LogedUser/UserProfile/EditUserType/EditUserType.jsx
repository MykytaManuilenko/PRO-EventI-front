import React, { useState } from "react";
import TypeCard from "../../../UI/TypeCard/TypeCard";
import Multiselect from "multiselect-react-dropdown";
import Button from "../../../UI/Button/Button";
import axiosInstance from "../../../../utils/axiosInstance";
import "./EditUserType.scss";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../redux/slices/ui";

const EditUserType = (props) => {
  const dispatch = useDispatch();
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [types, setTypes] = useState([]);
  const [userTypes, setUserTypes] = useState(props.userInfo.eventTypes);

  const addType = () => {
    axiosInstance
      .get("/api/event-types")
      .then((res) => {
        console.log("res :>> ", res);
        setTypesValues(res.data, userTypes);
      })
      .catch((err) => {
        dispatch(
          uiActions.openAlert({
            status: "error",
            message: err.response.data.message,
          })
        );
        console.log("err :>> ", err);
      });
    setShowMultiSelect(!showMultiSelect);
  };

  const onSelect = (e) => {
    setSelectedValue(e);
    if (e.length > 0) {
      e.map((value) => {
        userTypes.push(value.name);
        setShowMultiSelect(false);
      });
      axiosInstance
        .put("/api/users/me/event-types", { eventTypes: userTypes })
        .then((res) => {
          console.log("res :>> ", res);
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Event types are updated successfully!",
            })
          );
        })
        .catch((err) => {
          dispatch(
            uiActions.openAlert({
              status: "error",
              message: err.response.data.message,
            })
          );
          console.log("err :>> ", err);
        });
    }
  };

  const onDelete = (valueId) => {
    const typesArray = [...userTypes];
    const index = typesArray.indexOf(valueId);
    typesArray.splice(index, 1);

    axiosInstance
      .put("/api/users/me/event-types", { eventTypes: typesArray })
      .then((res) => {
        console.log("res :>> ", res);
        setUserTypes(typesArray);
        setTypesValues([...types, { name: valueId }], typesArray);
      })
      .catch((err) => {
        dispatch(
          uiActions.openAlert({
            status: "error",
            message: err.response.data.message,
          })
        );
        console.log("err :>> ", err);
      });
  };

  const setTypesValues = (dropdownValues, selectedUserTypes) => {
    const unusedTypesArray = [];
    const usedTypesArray = [];
    console.log("selectedUserTypes :>> ", selectedUserTypes);
    dropdownValues.map((value) => {
      if (selectedUserTypes.includes(value.name)) {
        usedTypesArray.push(value);
        console.log("if :>> ", value);
      } else {
        unusedTypesArray.push(value);
        console.log("else :>> ", value);
      }
    });
    if (unusedTypesArray.length >= 0) {
      console.log("AAA :>> ");
      console.log("unusedTypesArray :>> ", unusedTypesArray);
      setTypes(unusedTypesArray);
    } else {
      console.log("BBB :>> ");
      setTypes(dropdownValues);
    }
  };

  return (
    <div className="userTypePart">
      <div className="userTypeContainer">
        {userTypes &&
          userTypes.map((eventType, key) => {
            return (
              <TypeCard
                key={key}
                typeName={eventType}
                showMultiSelect={showMultiSelect}
                onDelete={() => onDelete(eventType)}
              />
            );
          })}
      </div>
      {showMultiSelect && (
        <Multiselect
          onRemove={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onSelect={(e) => onSelect(e)}
          onKeyPressFn={function noRefCheck() {}}
          placeholder="Type"
          displayValue="name"
          closeOnSelect={false}
          selectionLimit={2}
          options={types}
          style={{
            searchBox: {
              border: "none",
              borderBottom: "1px solid #fcc117",
              borderRadius: "0",
            },
            inputField: {
              margin: "0",
              height: "100%",
            },
            chips: {
              backgroundColor: "rgba(167, 169, 163, 0.41)",
              color: "#0C0D2C",
            },
          }}
        />
      )}
      <Button class="addTypeButton" onClick={addType}>
        {showMultiSelect ? "x" : "+"}
      </Button>
    </div>
  );
};

export default EditUserType;
