// Tämä tiedosto hoitaa kaiken "sauna-logiikan".
// Ei tiedä mitään HTTP:stä, vain tilasta ja simulaatiosta.

// Saunan tämänhetkinen tila
const saunaState = {
  temperature: 22,
  humidity: 30,
  targetTemperature: null,
  mode: "OFF",
  lastUpdated: Date.now()
};


function resetSaunaState() {
  saunaState.temperature = 22;
  saunaState.humidity = 30;
  saunaState.targetTemperature = null;
  saunaState.mode = "OFF";
  saunaState.lastUpdated = Date.now();
}

// Päivitä saunan tilaa ajan kuluessa
function updateSaunaState() {
  const now = Date.now();
  const elapsedMs = now - saunaState.lastUpdated;
  const elapsedSec = elapsedMs / 1000;
  saunaState.lastUpdated = now;

  const ambientTemp = 22;

  // Lämpeneminen
  if (saunaState.mode === "HEATING" && saunaState.targetTemperature != null) {
    if (saunaState.temperature < saunaState.targetTemperature) {
      saunaState.temperature += 0.3 * elapsedSec;
    } else {
      saunaState.mode = "ON";
    }
  }

  // Jäähtyminen
  if (saunaState.mode === "OFF") {
    if (saunaState.temperature > ambientTemp) {
      saunaState.temperature -= 0.1 * elapsedSec;
    }
  }

  // Kosteus
  if (saunaState.mode === "HEATING" || saunaState.mode === "ON") {
    saunaState.humidity = Math.min(80, saunaState.humidity + 0.05 * elapsedSec);
  } else {
    saunaState.humidity = Math.max(30, saunaState.humidity - 0.03 * elapsedSec);
  }
}

// Julkinen API tälle palvelulle:

function getSaunaState() {
  return saunaState;
}

function setTargetTemperature(temp) {
  const num = Number(temp);
  if (isNaN(num)) {
    const err = new Error("Invalid temperature");
    err.statusCode = 400;
    throw err;
  }
  saunaState.targetTemperature = num;
  saunaState.mode = "HEATING";
}

function turnOffSauna() {
  saunaState.mode = "OFF";
  saunaState.targetTemperature = null;
}

// Käynnistetään simulaatiolooppi
function startSimulationLoop() {
  setInterval(updateSaunaState, 1000);
}

module.exports = {
  getSaunaState,
  setTargetTemperature,
  turnOffSauna,
  startSimulationLoop,
  resetSaunaState
};
