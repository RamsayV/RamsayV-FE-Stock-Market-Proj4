import React from "react";
import Button from "../layout/Button";
import { Link } from "react-scroll";
import img from "../assets/mlkUzcY01.svg";
import About from "../components/About";

const HomePage = () => {
  return (
    <div className=" min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          Tools of The Trade?
          <span className="text-brightGreen"> TakeStock!</span>
        </h2>
        <p className=" text-lightText mt-5 text-start">
          Welcome to TakeStock, your portal to the dynamic world of stock
          trading. Our state-of-the-art trading platform offers you an expansive
          array of resources, from in-depth market analysis to real-time trading
          tools. Whether you're a beginner learning the basics or a seasoned
          trader refining your strategies, TakeStock is designed to empower
          your investment journey, helping you make informed decisions and
          achieve your financial aspirations.
        </p>

        <Link to="contact" spy={true} smooth={true} duration={500}>
          <Button title="Contact Us" />
        </Link>
      </div>

      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>
      <About />
    </div>
  );
};

export default HomePage;
