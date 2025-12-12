require("dotenv").config();
const express = require("express");
const cors = require("cors");

const saunaRoutes = require("./routes/sauna");
const { startSimulationLoop } = require("./services/saunaService");

const app = express();

// Middlewaret
app.use(cors());
app.use(express.json());

// Reitit /api -polun alle
app.use("/api", saunaRoutes);

// 404 - ei löytynyt
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Keskitetty virheenkäsittely
app.use((err, req, res, next) => {
  console.error(err); // voit myöhemmin korvata loggerilla

  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: message });
});

// Käynnistetään saunan simulaatiolooppi
startSimulationLoop();

// Portti ympäristömuuttujasta tai oletus 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Smart Sauna backend running on port ${PORT}`);
});
