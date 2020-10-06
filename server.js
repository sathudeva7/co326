var awsIot = require("aws-iot-device-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
let a = "NoFire";
var device = awsIot.device({
  keyPath: "d4355f3e77-private.pem.key",
  certPath: "d4355f3e77-certificate.pem.crt",
  caPath: "AmazonRootCA1.pem",
  clientId: "co326",
  host: "aqggby5s4s93e-ats.iot.us-east-1.amazonaws.com",
});

device.on("connect", function () {
  console.log("connect");

  device.subscribe("topic_1");

  console.log("published");
});

device.subscribeToDevices;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  //res.send(a.toString());
  //res.json({ title: "api", message: "root" });
});

app.get("/test", (req, res) => {
  //res.sendFile(__dirname +"/views/test.html",);

  device.on("message", function (topic, payload) {
    a = payload;
  });
  if (a.toString() === "1") {
    device.publish("topic_2", JSON.stringify(5));
  }
  res.json({ Fire: a.toString(), Gas: "root" });
});

app.post("/fire", function (req, res) {
  //var user_name = req.body.user;
  // var password = req.body.password;
  // console.log("User name = " + user_name + ", password is " + password);
  device.publish("topic_2", JSON.stringify(1));
  res.end("yes");
});
app.post("/gas", function (req, res) {
  //var user_name = req.body.user;
  // var password = req.body.password;
  // console.log("User name = " + user_name + ", password is " + password);
  device.publish("topic_2", JSON.stringify(2));
  res.end("yes");
});

app.listen(3000, () => {
  console.log("Started on PORT 3000");
});
