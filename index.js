const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 2000;

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", (err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
