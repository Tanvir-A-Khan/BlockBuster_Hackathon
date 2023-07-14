import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import LandingLayout from "./LandingLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ArtItem from "./components/Pages/Art/ArtItem";
import Dashboard from "./components/Pages/Auth/Dashboard";
import ModifyArtModal from "./components/Pages/Auth/ModifyArtModal";
import Signin from "./components/Pages/AuthPages/Signin";
import Signup from "./components/Pages/AuthPages/Signup";
import { useAuthContext } from "./contexts/authContext";

export default function App() {
  const [decide, setDecide] = useState(false);
  const { user, setUser } = useAuthContext();
  const authChecked = () => {
    if (user?.wallet) return true;
    else {
      const localUser = localStorage.getItem("user");
      const localType = localStorage.getItem("type");
      if (localUser) {
        setUser({ wallet: localUser, type: localType });
      }
    }
    return true;
  };

  useEffect(() => {
    setDecide(authChecked());
  }, []);

  return (
    decide && (
      <div className="bg-slate-900 text-white px-2">
        <div className="container mx-auto ">
          <Toaster position="top-center" reverseOrder={false} />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingLayout />} />
              <Route path="/search" element={<CommonLayout />} />
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <Signin />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route path="/art/:id" element={<ArtItem />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              \
              <Route path="/art/modify/:id" element={<ModifyArtModal />} />\
            </Routes>
          </Router>
          <Footer />
        </div>
      </div>
    )
  );
}
