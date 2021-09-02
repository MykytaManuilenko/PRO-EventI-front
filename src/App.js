import "./App.scss";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import AllEvents from "./components/AllEvents/AllEvents";
import LogInPage from "./components/LogInPage/LogInPage"
import RegisterPage from "./components/RegisterPage/RegisterPage"

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/allEvents">
        <AllEvents />
      </Route>
      <Route exact path="/login">
        <LogInPage/>
      </Route>
      <Route exact path="/registration">
        <RegisterPage/>

      </Route>
    </div>
  );
}

export default App;
