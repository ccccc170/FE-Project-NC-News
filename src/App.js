import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Header from "./components/Header";
import Nav from "./components/Nav";
import User from "./components/User";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [user, setUser] = useState("Logged Out");
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="whole-app">
          <Header />
          <Nav />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Articles />} />
            <Route path="/:topic" element={<Articles />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
