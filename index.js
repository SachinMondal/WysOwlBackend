const express = require("express");
const app = express();
const port = 5000;
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('./config/passport_layout_stratergy');
const passportJwt = require('./config/passport_jwt_stratergy');
const passportGoogle = require('./config/passport_google_auth_stratergy');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo')(session);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
// Use JSON and URL-encoded body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie-parser middleware
app.use(cookieParser());

// Set up express-session middleware with MongoDB storage

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100 // 1 hour
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }
        , function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in locals middleware
app.use(passport.setAuthenticatedUser);

// Use routes
app.use("/", require('./routes')); // Replace with your actual routes

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log("Error in connecting to the database:", err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});
