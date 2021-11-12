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

function App() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
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

      {/* <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/login">
        <LogInPage />
      </Route> */}

      {/* <Route exact path="/registration">
        <RegisterPage />
      </Route> */}

      <main
        style={
          isAuthenticated
            ? {
                width: "calc(100% - 230px)",
                marginLeft: "230px",
                background:
                  "linear-gradient(116.48deg, rgba(255, 255, 255, 0.56) 0.47%, rgba(255, 255, 255, 0.357) 113.36%)",
                backdropFilter: "blur(86px)",
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
            {!isAuthenticated ? (
              <RegisterPage />
            ) : (
              <Redirect to="/userProfile" />
            )}
          </Route>

          <Route exact path="/allEvents">
            {!isAuthenticated ? <AllEvents /> : <Redirect to="/userProfile" />}
          </Route>

          <PrivateRoute
            isAuth={isAuthenticated}
            path="/userProfile"
            Component={UserProfile}
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/events"
            Component={EventsPage}
            roles={["USER", "SYSTEM_ADMIN"]}
          />
          <PrivateRoute
            isAuth={isAuthenticated}
            path="/createEvent"
            Component={CreateEvent}
            roles={["USER", "SYSTEM_ADMIN"]}
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
