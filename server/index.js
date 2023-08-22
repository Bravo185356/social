const express = require("express");
const createChatWebsocket = require("./websockets/chatWebsocket");
const createOnlineStatusWebsocket = require('./websockets/onlineWebsocket')

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const friendsRoutes = require("./routes/friends.routes");
const avatarRoutes = require("./routes/avatar.routes");
const postRoutes = require("./routes/post.routes");
const requestsRoutes = require("./routes/requests.routes");
const searchRoutes = require("./routes/search.routes");
const chatRoutes = require("./routes/chat.routes");

const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;
const app = express();
createChatWebsocket();
createOnlineStatusWebsocket()

app.use(cors());
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", friendsRoutes);
app.use("/api", avatarRoutes);
app.use("/api", postRoutes);
app.use("/api", requestsRoutes);
app.use("/api", searchRoutes);
app.use("/api", chatRoutes);

app.listen(PORT, () => console.log(`working on ${PORT}`));
