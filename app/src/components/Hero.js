import React from "react";

import logo from "../assets/logo.svg";

import { useAuth0 } from "@auth0/auth0-react";
import { render } from "react-dom";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
    NavLink,
} from "reactstrap";


const Hero = () => {
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    return (
        <>
            {!isAuthenticated && <>

                <div className="text-center hero my-5">
                    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
                    <h1 className="mb-4">Super Yummy Tummy Tickler</h1>

                    <p className="lead">
                        Quite simply the best pizza you've never had.
                        <br />

                        <a onClick={() => {
                            loginWithRedirect({
                                screen_hint:'signup',
                                // scope: 'order:order'
                            })
                        }}>Sign up to order</a>
                    </p>

                </div>
                
            </>}

            {isAuthenticated && <>

                <div className="text-center hero my-5">
                    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
                    <h1 className="mb-4">Super Yummy Tummy Tickler</h1>

                    <p className="lead">
                        Quite simply the best pizza you've never had.
                        <br /> <br />
                        <NavLink
                            tag={RouterNavLink}
                            to="/order"
                            exact
                            activeClassName="router-link-exact-active"
                        >
                           Order now

                        </NavLink>
                    </p>
                </div>
            </>}
        </>
    )
};

export default Hero;
