const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:8081',
  '*'
];

var corsOptions = {
  origin: "http://localhost:8081",
  credentials:true,            
  //access-control-allow-credentials:true
  // optionSuccessStatus:200,
  
};

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    name: "Schudule-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: false
  })
);


const db = require("./src/app/backend/models");
const Role = db.role;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}




// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder applicationzzzzzzzzzz." });
});
app.get("/userAll", (req, res) => {
  res.json({ message: "Welcome to Appp" });
});

app.get("/data_users", (req, res) => {
  res.json({ message: "Welcome to data_users" });
});

app.get("/notification", (req, res) => {
  res.json({ message: "Welcome to notification" });
});

// app.post("/api/data_users", (req, res) => {
//   res.json({ message: "Welcome to data_users" });
// });



db.mongoose.connect(db.url, { useUnifiedTopology: true }).then(() => {
  app.listen(() => {
    console.log('app running...')
  })
}).catch(err => console.log(err))


// routes
require('./src/app/backend/routes/auth.routes')(app);
require('./src/app/backend/routes/user.routes')(app);
require("./src/app/backend/routes/routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
