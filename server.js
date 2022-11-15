// Required Packages
const express = require('express');
const session = require('express-session');
const http = require('http');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const cors = require("cors")
// Initialize some stuff
const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Declare a port.
const PORT = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// MIDDLEWARE
app.use(express.static("public"))
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(cors());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Create http server with our express instance
let server = http.createServer(app);
// Connect our socket instance to our server.
const io = require("socket.io")(server)

// On a succesfull connection to our declared port (8080)
io.on("connection", socket => {
  // Console log the id was connected to
  console.log(socket.id)
  socket.emit("connection-message", socket.id)

  // .on referencing the custom event we declared on the client side and any parameters we included.
  // In this case we are checking for message content and the room they intend the message for.
  socket.on("send-message", (message, user) => {
      socket.broadcast.emit("recieve-message", message, user);
      // Console log the message serverside.
      console.log(message);
      console.log(user);
  })
})

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
