const express = require("express");

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const friendsRouter = require("./routes/friends.routes");
const avatarRouter = require("./routes/avatar.routes");
const postRouter = require("./routes/post.routes");
const requestsRouter = require("./routes/requests.routes");
const SearchController = require("./routes/search.routes")

const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use("/static", express.static("static"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", friendsRouter);
app.use("/api", avatarRouter);
app.use("/api", postRouter);
app.use("/api", requestsRouter)
app.use("/api", SearchController)

app.listen(PORT, () => console.log(`working on ${PORT}`));
