const express = require('express');
const session = require('express-session');
const path = require('path');
const http = require('http');
const socketIo = require("socket.io");
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3000;

// Create our Socket.io instance serverside with port and options object
// ???????????????????????????????
const io = require("socket.io")(3001, {
  // Options object telling cors that its ok if people connect via 8080 even though we are hosted on 3000
  cors: {
      origin: ["http://localhost:3000"],
  },
}
);

// app.use(cors())

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

let server = http.createServer(app);

// let io = socketIo

app.use(express.static("public"))

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// On a succesfull connection to our declared port (8080)
io.on("connection", socket => {
  // Console log the id was connected to
  console.log(socket.id)
  socket.emit("connection-message", socket.id)

  // .on referencing the custom event we declared on the client side and any parameters we included.
  // In this case we are checking for message content and the room they intend the message for.
  socket.on("send-message", (message) => {
      socket.broadcast.emit("recieve-message", message);
      // Console log the message serverside.
      console.log(message)
  })
})

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
