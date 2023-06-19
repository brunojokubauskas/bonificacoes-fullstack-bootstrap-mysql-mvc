const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const funcionarioRoutes = require("./routes/funcionario.routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/funcionario", funcionarioRoutes);

app.listen(PORT, () => {
  console.log("Respondendo na porta: " + PORT);
});