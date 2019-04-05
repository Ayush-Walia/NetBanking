//Express app
var express = require("express");
var app = express();

//for developmnet
app.env = "development";

//for production
//app.env = "production";

// Just to give good look to json ,html and css files
if (app.env == "development") {
  app.locals.pretty = true;
}

//make everything compact
if (app.env == "production") {

  var compression = require("compression"); //gzip like thing for /assets
  app.use(compression());

  app.locals.pretty = false;
}

//sass,path,morgan,bodyParser
var path = require("path"); //to get path
var logger = require("morgan"); //log every request
var bodyParser = require("body-parser"); //parse json,xml,formdata etc


// static content (public directory)
app.use(express.static(path.join(__dirname, "bank")));

//require Middlewares
app.use(logger("dev")); //logger middleware
app.use(bodyParser.json()); //Parse JSON
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); //Parse form data

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

//getting our page routes
var index = require("./app.routes");
app.use("/", index); //index (page routes)


//404 error (not found any resource)
app.use(function (req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});

//Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      error: err
    }
  });
});

//use this port
app.set("port", process.env.PORT || 80);

app.listen(app.get("port"), function () {
  console.log("Express app is listening on port " + app.get("port"));
});