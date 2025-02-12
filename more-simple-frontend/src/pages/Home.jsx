// Home.jsx
import React from "react";
import Hero from "../components/Hero/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "../components/TopProducts/TopProducts";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";

const Home = ({ handleOrderPopup }) => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Hero handleOrderPopup={handleOrderPopup} />
      <TopProducts handleOrderPopup={handleOrderPopup} />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;