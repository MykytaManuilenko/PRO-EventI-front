import Button from "../../UI/Button/Button";
import React, { useEffect, useState } from "react";
import "./EventPageAdmin.scss";
import axiosInstance from "../../../utils/axiosInstance";
import ModalCustom from "../CreateEventType/ModalCustom";
import EditModal from "../EditEventType/EditModal";

import { CreateIcon, DeleteIcon } from "../../../assets/icons";

const EventPageAdmin = () => {
  const [types, setTypes] = useState([]);
  const [modalShow, setModalShow] = useState();
  const [modalEShow, setModalEShow] = useState();

  const [changeModal, setChangeModal] = useState(true);
  const [typeName, setTypeName] = useState();
  const [typeID, setTypeID] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/api/event-types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, [changeModal]);

  const deleteType = (typeId) => {
    axiosInstance
      .delete(`/api/event-types/${typeId}`)
      .then((res) => {
        console.log("res :>> ", res);
        setChangeModal(!changeModal);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  return (
    <>
      <div className="contnTypeAdmin">
        <p className="headerText">Event Types</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.length !== 0 &&
              types.map((type, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "35%" }}>{type.eventTypeId}</td>
                    <td style={{ width: "35%" }}>{type.name}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        class="editButt"
                        onClick={() => {
                          setTypeName(type.name);
                          setTypeID(type.eventTypeId);
                          setModalEShow(true);
                        }}
                      >
                        <CreateIcon />
                      </Button>
                      <Button
                        class="deleteButt"
                        onClick={() => deleteType(type.eventTypeId)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="buttCont">
          <Button class="buttAdd" onClick={() => setModalShow(true)}>
            Add Type
          </Button>
          <EditModal
            show={modalEShow}
            onHide={() => setModalEShow(false)}
            typename={typeName && typeName}
            typeid={typeID && typeID}
            setChanged={setChangeModal}
            changed={changeModal}
          />
          <ModalCustom
            show={modalShow}
            onHide={() => setModalShow(false)}
            setChanged={setChangeModal}
            changed={changeModal}
          />
        </div>
      </div>
    </>
  );
};

export default EventPageAdmin;
