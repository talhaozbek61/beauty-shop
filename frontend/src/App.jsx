import { Route, Routes } from "react-router-dom";

import "./style.css";

import Header from "./components/header";
import Footer from "./components/footer";

import HomePage from "./pages/home/page";
import CreatePage from "./pages/create/page";
import ProductPage from "./pages/:id/page";
import NotFoundPage from "./pages/not-found/page";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
