import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Header from "./components/Header";
import Nav from "./components/Nav";
import User from "./components/User";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/:topic" element={<Articles />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
