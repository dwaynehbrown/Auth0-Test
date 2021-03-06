import React, { useState, useEffect } from 'react';

import logo from "../assets/logo.svg";

import { useAuth0, withAuthenticationRequired, getAccessTokenSilently } from "@auth0/auth0-react";
import { render } from "react-dom";
import Loading from "./Loading";
import Button from "reactstrap/lib/Button";
import axios from 'axios';

const Order = () => {
    const {
        user,
        getAccessTokenSilently,
        isAuthenticated,
        loginWithRedirect,
        logout
    } = useAuth0();

    const onTriggerVerifyEmail = () => {

    }

    useEffect(() => {
        (async () => {


            const token = await getAccessTokenSilently({
                audience: 'pizza-42-express',
                scope: 'order:order'
            });


            // axios.post('http://localhost:3002/api/order', {}, {
                axios.post('https://auth0-pizza42-api-dwaynehbrown.vercel.app/api/order', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
                .then(resp => {
  

                    (async () => {
                        const token = await getAccessTokenSilently({
                            audience: 'pizza-42-express',
                            scope: 'update:account',
                            
                        });

                        // axios.post('http://localhost:3002/api/updateUser', {
                            axios.post('https://auth0-pizza42-api-dwaynehbrown.vercel.app/api/updateUser', {

                                order_history: [
                                    ...((!!user && typeof user['https://pizza42order_history'] !== 'undefined') ? user['https://pizza42order_history'] : []),
                                    { ...resp.data.order }
                                ]
                            
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                            .then (resp => {
                                alert ('order complete');
                            })
                    })()

                })
        })()

    })



       

    return (
        <>



            <h1>Thanks for your order</h1>

            {user.email_verified && <>
                <h6 style={{ color: 'green' }}>1. You have already verified your email address</h6>
                <br />

                <h6 style={{ color: 'green' }}>2. Order Details</h6>

                <br />
                <br />

                <h2>Your order is on it's way</h2>

                <span>{JSON.stringify(user, null, 2)}</span>

                <br />
                <br />

                <h4>1 x Summer Yummy Tummy Tickler</h4>
                <p>Honestly, the bestpizza you've never had.</p>

                <br />



            </>}


        </>
    )
};

export default withAuthenticationRequired(Order, {
    onRedirecting: () => <Loading />,
});
