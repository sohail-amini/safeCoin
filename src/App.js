import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Authentication/Login";
import { Signup } from "./Components/Authentication/Signup";
import { HomeWrapper } from "./Components/Main/Home";
export const GlobalContext = React.createContext();

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  return (
    <GlobalContext.Provider value={{ toast, setToast }}>
      <Routes>
        <Route path="/home/*" element={<HomeWrapper />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
