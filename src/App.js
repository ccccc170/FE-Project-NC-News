import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Home from "./components/Home";
import Nav from "./components/Nav";
import User from "./components/User";

function App() {
  const [articles, setArticles] = useState([]);
  return (
    <BrowserRouter>
      <>
        <Header />
        <Nav />
        <Home articles={articles} setArticles={setArticles} />
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
