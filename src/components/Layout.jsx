import { Outlet } from "react-router-dom";

// Components
import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export default Layout
