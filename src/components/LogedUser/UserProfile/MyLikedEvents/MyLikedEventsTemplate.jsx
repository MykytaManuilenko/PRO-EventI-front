import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import Card from "../../../UI/Card/Card";
import { convertData } from "../../../../utils/convertDate";
import "./MyLikedEvents.scss";
import { useHistory } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import Spinner from "react-bootstrap/Spinner";
import Loading from "../../../UI/Loading/Loading";

const MyLikedEventsTemplate = (props) => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, props.scrollPosition);
    axiosInstance
      .get(
        "/api/events/my/like",
        props.cardQuantityShown && {
          params: { limit: props.cardQuantityShown },
        }
      )
      .then((res) => {
        console.log("res :>> ", res);
        setLikedEvents(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="containerForLikedPage">
        <div className="header">
          <p className="headerText">Liked</p>
          <Button class="showButt" onClick={() => history.push("/likedEvents")}>
            Show all
          </Button>
        </div>

        <div className="containerForLikedEvent">
          {likedEvents && likedEvents.length > 0 ? (
            likedEvents.map((likedEvent) => {
              return (
                <Card
                  image={likedEvent.backgroundUrl}
                  name={likedEvent.title}
                  eventId={likedEvent.eventId}
                  isLiked={likedEvent.isLiked}
                  key={likedEvent.eventId}
                  date={convertData(likedEvent.startTime)}
                  isCanceled={likedEvent.canceled}
                />
              );
            })
          ) : (
            <p>You have no liked events :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyLikedEventsTemplate;
