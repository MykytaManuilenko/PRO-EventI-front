import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ButtonBasedDropdown = (props) => {
  const customDropdown = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      className="moreButton"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img src="/more.svg" alt="" />
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
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item onClick={props.onClick}>Cancel</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ButtonBasedDropdown;
