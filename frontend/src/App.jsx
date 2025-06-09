import { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import "./style.css";

import { useAuthStore } from "./store/auth";

import Header from "./components/header";
import Footer from "./components/footer";

import HomePage from "./pages/home/page";
import LoginPage from "./pages/login/page";
import SignUpPage from "./pages/signup/page";
import AccountPage from "./pages/account/page";
import CreatePage from "./pages/create/page";
import ProductPage from "./pages/:id/page";
import NotFoundPage from "./pages/not-found/page";

import Skeleton from "./components/ui/skeleton";
import Container from "./components/ui/container";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthenticatedUserRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <Container className="overflow-hidden space-y-4">
        <Skeleton className="w-full h-[120px]" />
        <Container className="overflow-hidden" padding="!p-0">
          <Skeleton className="w-full h-screen" />
        </Container>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthenticatedUserRoute>
              <LoginPage />
            </AuthenticatedUserRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthenticatedUserRoute>
              <SignUpPage />
            </AuthenticatedUserRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectRoute>
              <AccountPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectRoute>
              <CreatePage />
            </ProtectRoute>
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
