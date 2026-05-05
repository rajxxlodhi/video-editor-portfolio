import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import ContactSubmissions from "./admin/ContactSubmissions";
import DashboardHome from "./admin/DashboardHome";
import Login from "./admin/Login";
import ManageProjects from "./admin/ManageProjects";
import ManageServices from "./admin/ManageServices";
import ManageTestimonials from "./admin/ManageTestimonials";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetails from "./pages/ProjectDetails";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";

const App = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath ? <Navbar /> : null}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="contacts" element={<ContactSubmissions />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {!isAdminPath ? <Footer /> : null}
    </>
  );
};

export default App;
