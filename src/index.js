import express from "express";
import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";
import bodyParser from "body-parser";
import passport from "passport";
import { passportAuth } from "./config/jwt-middleware.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);
app.use("/api", apiRoutes);
app.listen(3000, async () => {
  console.log("server started");
  connect();
  console.log("MongoDB connected");
});
