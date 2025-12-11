const express = require("express");
const router = express.Router();

const {
  getSaunaState,
  setTargetTemperature,
  turnOffSauna
} = require("../services/saunaService");

// GET /api/sauna
router.get("/sauna", (req, res, next) => {
  try {
    const state = getSaunaState();
    res.json(state);
  } catch (err) {
    next(err);
  }
});

// POST /api/sauna/command
router.post("/sauna/command", (req, res, next) => {
  try {
    const { type, payload } = req.body;

    if (type === "SET_TARGET_TEMPERATURE") {
      setTargetTemperature(payload && payload.temperature);
    } else if (type === "TURN_OFF") {
      turnOffSauna();
    } else {
      const error = new Error("Unknown command type");
      error.statusCode = 400;
      throw error;
    }

    const state = getSaunaState();
    res.json(state);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
