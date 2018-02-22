const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('./config');

mongoose.connect(config.dbConnect).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err.message);
})

const PORT = process.env.PORT || 5150;
const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app)

require('./model/user')
require('./services/passport')


app.listen(PORT, ()=>{
    console.log('server running on PORT:'+PORT);
});