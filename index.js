const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../todo/routes/routes");
const app = express();
const PORT = 3000;

app.set("viewengine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log("Server started at port ", PORT);
});
