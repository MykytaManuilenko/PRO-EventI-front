import "./App.scss";
import { Route } from "react-router-dom";
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

function App() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <LogNavBar />
          <UserNav />
        </>
      ) : (
        // <UserNav />
        /* </> */
        <NavBar />
      )}

      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/allEvents">
        <AllEvents />
      </Route>
      <Route exact path="/login">
        <LogInPage />
      </Route>
      <Route exact path="/registration">
        <RegisterPage />
      </Route>
      <Route path="/confirm/registration">
        <Confirmation />
      </Route>
      <Route exact path="/userProfile">
        <UserProfile />
      </Route>
      <Route exact path="/events">
        <EventsPage />
      </Route>
      <Route exact path="/createEvent">
        <CreateEvent />
      </Route>
    </div>
  );
}

export default App;
