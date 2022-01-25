import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../UI/Button/Button";
import MyEventsTemplate from "./MyEvents/MyEventsTemplate";
import MyLikedEventsTemplate from "./MyLikedEvents/MyLikedEventsTemplate";
import { convertDataWithoutName } from "../../../utils/convertDate";
import { useHistory } from "react-router-dom";
import EditUserType from "./EditUserType/EditUserType";
import { CameraIcon, LocationIcon } from "../../../assets/icons";
import Loading from "../../UI/Loading/Loading";
import AlertBootstrap from "../../UI/Alert/AlertBootstrap";
import defaultAvatar from "../../../assets/purpleAvatar.png";

const UserProfile = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleMyEvents, setIsVisibleMyEvents] = useState(true);
  const [isVisibleLiked, setIsVisibleLiked] = useState(false);
  const [isVisibleMyTickets, setIsVisibleMyTickets] = useState(false);
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
  const handleClick = (isMyEvents, isLiked, isMyTickets) => {
    setIsVisibleMyEvents(isMyEvents);
    setIsVisibleLiked(isLiked);
    setIsVisibleMyTickets(isMyTickets);
    setScrollPosition(window.pageYOffset);
    window.scrollTo(0, scrollPosition);
  };

  console.log("userInfo.address :>> ", userInfo.address);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <AlertBootstrap disappear />
      <div className="profileCont">
        <div className="userInfoContainer">
          <div className="registerDate">
            Registered from {convertDataWithoutName(userInfo.createdAt)}
          </div>
          <div className="userData">
            <div
              className="choosePhotoButton"
              style={
                userInfo.avatarUrl
                  ? {
                      background: `center / cover no-repeat url(${userInfo.avatarUrl}) `,
                      border: "3px solid #8698e9",
                    }
                  : {
                      background: `center / cover no-repeat url(${defaultAvatar}) `,
                      border: "3px solid #8698e9",
                    }
              }
            ></div>
            <div className="userDetails">
              <p>
                {userInfo.firstName} {userInfo.lastName}
              </p>
              <div
                className="location"
                onClick={() => history.push("/userProfile/edit")}
              >
                <LocationIcon />
                <p>
                  {userInfo.address.city === null &&
                  userInfo.address.country === null
                    ? "Choose city"
                    : `${userInfo.address.city},
                    ${userInfo.address.country}`}
                </p>
              </div>
            </div>
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
              onClick={() => handleClick(true, false, false)}
            >
              My Events
            </button>
            <button
              className={"tab" + (isVisibleLiked ? " active" : "")}
              onClick={() => handleClick(false, true, false)}
            >
              Liked
            </button>
            <button
              className={"tab" + (isVisibleMyTickets ? " active" : "")}
              onClick={() => handleClick(false, false, true)}
            >
              My Tickets
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
        </div>
      </div>
    </>
  );
};

export default UserProfile;
