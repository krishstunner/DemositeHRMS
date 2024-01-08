import { useEffect } from "react";
import Homepage from "../components/Homepage";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import LoginForm from "./../components/LoginForm";
import Cookies from "js-cookie";
import Router from "next/router";

const IndexPage = () => {
  useEffect(() => {
    // Check if the cookie is present
    const isLoggedIn = Cookies.get("isLoggedIn"); // Change this to the name of your cookie

    if (isLoggedIn === "true") {
      // Redirect to /dashboard if the cookie is present
      Router.push("/dashboard");
    }
  }, []);

  return <Homepage />;
  //  {Cookies.get("isLoggedIn") ? Router.push('/dashboard') :  <Homepage />};
};

export default IndexPage;
