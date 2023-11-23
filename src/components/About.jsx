import React from "react";
import img from "../assets/eQ2iX001.svg";
import Button from "../layout/Button";
import Heading from "../layout/Heading";
import { Link } from "react-router-dom"
import { FaRegCheckCircle } from "react-icons/fa"; // Make sure to install react-icons if not already

const About = () => {
  return (
    <div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className="w-full md:w-2/4">
        <img src={img} alt="About Us" className="w-full" />
      </div>

      <div className="w-full md:w-2/4 text-center md:text-left">
        <Heading title1="Getting" title2="Started?" />
        <ul className="text-lightText space-y-4 text-left list-none">


          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Register:</strong> Sign up for an account by providing necessary details.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Login:</strong> Use your username and password to log in to your account.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Create Portfolio:</strong> Go to the section and start a new stock portfolio.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Add Stocks:</strong> Find stocks and add them to your portfolio.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>View Portfolio:</strong> Review your portfolio and stock details.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Track Total Value:</strong> Keep an eye on your portfolio's total value.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Transactions:</strong> Buy or sell stocks as needed.</li>
          <li><FaRegCheckCircle className="inline mr-2" /> <strong>Transaction History:</strong> Check your transaction records.</li>
        </ul>

        <Link to="/dashboard"  className="mt-6 inline-block">
          <Button title="Get Started" />
        </Link>
      </div>
    </div>
  );
};

export default About;