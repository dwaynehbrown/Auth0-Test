import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";

import logo from "../assets/logo.svg";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { render } from "react-dom";
import Loading from "./Loading";
import { Button, Input,NavLink } from "reactstrap/";
import axios from 'axios';


const Order = props => {
    const {
        user,
        getAccessTokenSilently,
        isAuthenticated,
        loginWithRedirect,
        logout
    } = useAuth0();

    return (
        <>
{}



            <h1>What's your flavour ...</h1>
            <h2>Tell us, what's your flavour?</h2>


            <br />
            <br />
            <Input
                placeholder={"Enter your preference (even if it's pineapple)"}
            />

            <br />
            <Button>Submit </Button>

                <NavLink
                    tag={RouterNavLink}
                    to="/"
                    exact
                    activeClassName="router-link-exact-active"
                >
                    Skip
                  </NavLink>

        </>
    )
};

export default Order;
