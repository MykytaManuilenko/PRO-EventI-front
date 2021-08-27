import "./App.scss";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import AllEvents from "./components/AllEvents/AllEvents";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/allEvents">
        <AllEvents />
      </Route>
    </div>
  );
}

export default App;
