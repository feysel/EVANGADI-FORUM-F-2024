import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";

function Home() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Optionally update the document title based on the route
  useEffect(() => {
    const pageTitle =
      location.pathname === "/" ? "Home" : location.pathname.split("/").pop();
    document.title = `YourAppName | ${
      pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
    }`;
  }, [location.pathname]);

  return (
    <>
      <Header />
      {/* Optionally add an error boundary around the Outlet */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Home;
