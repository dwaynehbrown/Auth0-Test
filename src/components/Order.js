import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { render } from "react-dom";
import Loading from "./Loading";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
    Button,
    NavLink,
} from "reactstrap";
import axios from "axios";


const Order = (props) => {

    const {
        user,
        loginWithRedirect

    } = useAuth0();


    const onPlaceOrder =
        async () => {
            
            loginWithRedirect({
                redirectUri: 'http://localhost:3000/complete',
                audience: 'pizza-42-express',
                scope: 'order:order update:account'
            })

        }


    console.log('order props', props);


    const onTriggerVerifyEmail = () => {

    }

    return (
        <>
            <h1>Place your order</h1>

            {!user.email_verified && <>
                <h4>1. Please verify your email before continuing</h4>
                <a onClick={onTriggerVerifyEmail}> Click here to resend email </a>

                <br />
                <br />

                <h6>2. Place your order</h6>
            </>}


            {user.email_verified && <>
                <h6 style={{ color: 'green' }}>1. You have already verified your email address</h6>
                <br />

                <h2>2. Order Details</h2>

                <br />
                <br />

                <h4>1 x Summer Yummy Tummy Tickler</h4>
                <p>Honestly, the bestpizza you've never had.</p>


                <br />

                {user && user.email_verified && <Button
                    onClick={onPlaceOrder}
                >
                    Order Now
                </Button>}
                {user && !user.email_verified && <Button
                    onClick={onPlaceOrder}
                    disabled
                >
                    Please verify your email before continuing
                </Button>}




            </>}

        </>
    )
};

export default withAuthenticationRequired(Order, {
    onRedirecting: () => <Loading />,
});
