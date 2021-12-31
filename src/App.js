import "./App.scss";
import Landing from "./components/Landing/Landing";
import AllEvents from "./components/AllEvents/AllEvents";
import LogInPage from "./components/LogInPage/LogInPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Confirmation from "./components/RegisterPage/Confirmation/Confirmation.jsx";
import UserProfile from "./components/LogedUser/UserProfile/UserProfile";
import EventsPage from "./components/LogedUser/EventsPages/EventsPage";
import CreateEvent from "./components/LogedUser/EventsPages/CreateEvent/CreateEvent";
import NavBar from "./components/Navigation/NavBar/NavBar";
import LogNavBar from "./components/Navigation/LogNavBar/LogNavBar";
import UserNav from "./components/Navigation/UserNav/UserNav";
import Footer from "./components/Navigation/Footer/Footer";
import { useSelector } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/AuthVerification/PrivateRoute";
import EventPageAdmin from "./components/AdminPanel/EventPage/EventPageAdmin";
import EventDetail from "./components/LogedUser/EventsPages/EventDetail/EventDetail";
import MyEvents from "./components/LogedUser/UserProfile/MyEvents/MyEvents";
import myLikedEvents from "./components/LogedUser/UserProfile/MyLikedEvents/MyLikedEvents";
import EditUserProfile from "./components/LogedUser/UserProfile/EditUserProfile/EditUserProfile";
import History from "./components/LogedUser/UserProfile/History/History";
import UsersPage from "./components/AdminPanel/UsersPage/UsersPage";
import ChangePassword from "./components/LogedUser/UserProfile/ChangePassword/ChangePassword";
// import CreateEventType from "./components/AdminPanel/CreateEventType/CreateEventType";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  const userRole = useSelector((state) => state.authentication.userRole);
  return (
    <div className="App">
      <nav>
        {isAuthenticated ? (
          <>
            <LogNavBar /> <UserNav />
          </>
        ) : (
          <NavBar />
        )}
      </nav>
      <main
        style={
          isAuthenticated
            ? {
                width: "calc(100% - 260px)",
                marginLeft: "260px",
                marginBottom: "20px",
                background:
                  "linear-gradient(116.48deg, rgba(255, 255, 255, 0.56) 0.47%, rgba(255, 255, 255, 0.357) 113.36%)",
              }
            : null
        }
      >
        <Switch>
          <Route exact path="/">
            {!isAuthenticated ? <Landing /> : <Redirect to="/userProfile" />}
          </Route>

          <Route exact path="/login">
            {!isAuthenticated ? <LogInPage /> : <Redirect to="/userProfile" />}
          </Route>

          <Route exact path="/registration">
            <RegisterPage />
          </Route>

          <Route exact path="/allEvents">
            {!isAuthenticated ? <AllEvents /> : <Redirect to="/userProfile" />}
          </Route>
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/events/:eventId"
            Component={EventDetail}
            roles={["USER", "SYSTEM_ADMIN", "UNCONFIRMED_USER"]}
          />

          <PrivateRoute
            isAuth={isAuthenticated}
            path="/myEvents"
            Component={MyEvents}
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/likedEvents"
            Component={myLikedEvents}
            roles={["USER", "SYSTEM_ADMIN"]}
          />

          <PrivateRoute
            isAuth={isAuthenticated}
            path="/userProfile/edit"
            Component={EditUserProfile}
            roles={["USER", "SYSTEM_ADMIN"]}
          />

          <PrivateRoute
            isAuth={isAuthenticated}
            path="/userProfile/changePassword"
            Component={ChangePassword}
            roles={["USER", "SYSTEM_ADMIN"]}
          />

          <PrivateRoute
            isAuth={isAuthenticated}
            path="/userProfile"
            Component={UserProfile}
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/history"
            Component={History}
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/events"
            Component={
              userRole === "SYSTEM_ADMIN" ? EventPageAdmin : EventsPage
            }
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/createEvent"
            Component={CreateEvent}
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/allUsers"
            Component={UsersPage}
            roles={["SYSTEM_ADMIN"]}
          />
        </Switch>
      </main>

      <footer>{!isAuthenticated && <Footer />}</footer>

      <Route path="/confirm/registration">
        <Confirmation />
      </Route>
    </div>
  );
}

export default App;
