import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";
import { MoreIcon } from "../../../assets/icons";
import axiosInstance from "../../../utils/axiosInstance";
import "./ButtonBasedDropdown.scss";

const ButtonBasedDropdown = (props) => {
  const history = useHistory();
  const editEvent = (eventId) => {
    history.push({
      pathname: `/myEvents/${eventId}/edit`,
      state: { eventId: eventId },
    });
  };
  const onDelete = (eventId) => {
    axiosInstance
      .delete(`/api/events/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  const customDropdown = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      className="moreButton"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <MoreIcon style={{ height: "30px", width: "20px" }} />
    </div>
  ));
  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle
          as={customDropdown}
          id="dropdown-basic"
        ></Dropdown.Toggle>
        <Dropdown.Menu>
          {props.eventStatus === "DRAFT" ? (
            <Dropdown.Item onClick={() => editEvent(props.eventId)}>
              Edit
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item onClick={() => onDelete(props.eventId)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ButtonBasedDropdown;
