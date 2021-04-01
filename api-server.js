const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const axios = require("axios");


const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: 'pizza-42-express',
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });

});



// create order
app.get("/api/order", checkJwt, (req, res) => {

  if (req.user.scope.indexOf('order:order') > -1) {
    if (req.user["http://pizza42/email_verified"]) {

      let order = {
        timestamp: new Date().valueOf(),
        orderId: Math.random().toString(36).substr(2, 9)
      }

      res.send({ order: { ...order }, user: { a: 'b', ...req.user } });
    } else {

      res.send({ err: 'please verify email', user: { a: 'b', ...req.user } });
    }
  } else {
    res.send({ err: 'required scope not granted' })
  }

});


// create order
app.post("/api/updateUser", checkJwt, (req, res) => {

  if (req.user.scope.indexOf('update:account') > -1) {

    try {

      axios.post('https://db-test.eu.auth0.com//oauth/token', 
      { "client_id": "8WJpcieAknIeViXj9nen6Rl3Hgxwd02v"
      , "client_secret": "n-dTKYeNr3jqubT92B2b-AT6y-VbQ4oYmwaSinHEcV_TSUSwxUN_PuA2NT9pOUHP"
      , "audience": 'https://db-test.eu.auth0.com/api/v2/'
      , "grant_type": "client_credentials" }
      , { 'content-type': 'application/json' }
      )
        .then((result, err) => {

          if (err) return res.send({ err });

          const token = result.accessToken;

          axios.patch('https://db-test.eu.auth0.com/api/v2/users/' + req.user.sub,
            {
              user_metadata: {
                isTest: true
              }
            },
            { authorization: token, 'content-type': 'application/json' },
          ).then(resp2 => {
            res.send({ msg: 'updated user', token, resp: {response: resp.data}, resp2 : {response: resp2.data}});
          })

        })

    }
    catch (err) {
      res.send({
        err: true,
        msg: err
      })
    }


  }

})

app.listen(port, () => console.log(`API Server listening on port ${port}`));
