// App.js
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormState from "./context/forms/FormState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import FormPage from "./components/FormPage";
import Template from "./components/Template";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <FormState>
      <Router>
        <NavBar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/about"
              element={<About showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/formpage"
              element={<FormPage showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path="formpage/template/:id"
              element={<Template showAlert={showAlert} />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </FormState>
  );
}

export default App;
