//MODULE DEPENDENCIES
const   express = require("express"),
        bodyParser = require('body-parser'),
        methodOverride = require("method-override"),
        path = require("path"),
        dotenv = require("dotenv"),
        chalk = require('chalk');


// LOAD ENVIRONMENT VARIABLES
dotenv.config({path: ".env"});


//REQUIRE ROUTES
const indexRoutes = require("./routes/index");


//CREATE EXPRESS SERVER
const app = express();


//EXPRESS CONFIGURATION
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


//APP USE ROUTES
app.use("/", indexRoutes);


// STARTING THE SERVER
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  });
  

  module.exports = app;