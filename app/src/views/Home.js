import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";

import { isAuthenticated, user} from '@auth0/auth0-react'
import Order from "../components/Order";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
    <Content />
  </Fragment>
);

export default Home;
