import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../UI/Button/Button";
import MyEventsTemplate from "./MyEvents/MyEventsTemplate";
import MyLikedEventsTemplate from "./MyLikedEvents/MyLikedEventsTemplate";
import HistoryTemplate from "./History/HistoryTemplate";
import { convertDataWithoutName } from "../../../utils/convertData";
import { useHistory } from "react-router-dom";
import EditUserType from "./EditUserType/EditUserType";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleMyEvents, setIsVisibleMyEvents] = useState(true);
  const [isVisibleLiked, setIsVisibleLiked] = useState(false);
  const [isVisibleMyTickets, setIsVisibleMyTickets] = useState(false);
  const [isVisibleHistory, setIsVisibleHistory] = useState(false);
  const [scrollPosition, setScrollPosition] = useState();
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserInfo(res.data);
        setIsLoading(false);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const handleClick = (isMyEvents, isLiked, isMyTickets, isHistory) => {
    setIsVisibleMyEvents(isMyEvents);
    setIsVisibleLiked(isLiked);
    setIsVisibleMyTickets(isMyTickets);
    setIsVisibleHistory(isHistory);
    setScrollPosition(window.pageYOffset);
    window.scrollTo(0, scrollPosition);
  };

  console.log("userInfo.address :>> ", userInfo.address);

  return isLoading ? (
    <p> Loading...</p>
  ) : (
    <div className="profileCont">
      <div className="userInfoContainer">
        <div className="registerDate">
          Registered from {convertDataWithoutName(userInfo.createdAt)}
        </div>
        <div className="userData">
          <div className="choosePhotoButton">
            <img
              alt=""
              src="./camera_icon.svg"
              style={{
                height: "50px",
                width: "60px",
                marginBottom: "10px",
              }}
            />
            {/* <p className={eventStyle.addPhoto}>Add photo</p> */}
          </div>
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </div>
        <div className="bottomPart">
          <EditUserType userInfo={userInfo} />
          <div className="buttonsContainer">
            <button
              className="changePassButton"
              onClick={() => history.push("/userProfile/changePassword")}
            >
              Change password
            </button>
            <Button
              class="editButt"
              onClick={() => history.push("/userProfile/edit")}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="userTabs">
          <button
            className={"tab" + (isVisibleMyEvents ? " active" : "")}
            onClick={() => handleClick(true, false, false, false)}
          >
            My Events
          </button>
          <button
            className={"tab" + (isVisibleLiked ? " active" : "")}
            onClick={() => handleClick(false, true, false, false)}
          >
            Liked
          </button>
          <button
            className={"tab" + (isVisibleMyTickets ? " active" : "")}
            onClick={() => handleClick(false, false, true, false)}
          >
            My Tickets
          </button>
          <button
            className={"tab" + (isVisibleHistory ? " active" : "")}
            onClick={() => handleClick(false, false, false, true)}
          >
            History
          </button>
        </div>

        {isVisibleMyEvents && (
          <MyEventsTemplate
            cardQuantityShown={3}
            scrollPosition={scrollPosition}
          />
        )}
        {isVisibleLiked && (
          <MyLikedEventsTemplate
            cardQuantityShown={5}
            scrollPosition={scrollPosition}
          />
        )}
        {isVisibleHistory && (
          <HistoryTemplate
            cardQuantityShown={5}
            scrollPosition={scrollPosition}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
