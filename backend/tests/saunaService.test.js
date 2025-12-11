const {
  getSaunaState,
  setTargetTemperature,
  turnOffSauna,
  resetSaunaState
} = require("../src/services/saunaService");

describe("saunaService", () => {
  beforeEach(() => {
    // Nollataan tila ennen jokaista testiä
    resetSaunaState();
  });

  test("alkutilassa sauna on OFF ja huonelämpöinen", () => {
    const state = getSaunaState();
    expect(state.mode).toBe("OFF");
    expect(state.temperature).toBe(22);
    expect(state.humidity).toBe(30);
    expect(state.targetTemperature).toBeNull();
  });

  test("setTargetTemperature asettaa tavoitelämpötilan ja käynnistää lämmityksen", () => {
    setTargetTemperature(75);
    const state = getSaunaState();
    expect(state.targetTemperature).toBe(75);
    expect(state.mode).toBe("HEATING");
  });

  test("setTargetTemperature heittää virheen, jos arvo ei ole numero", () => {
    expect(() => setTargetTemperature("ei-numero")).toThrow("Invalid temperature");
  });

  test("turnOffSauna sammuttaa kiukaan ja tyhjentää tavoitelämpötilan", () => {
    setTargetTemperature(80);
    let state = getSaunaState();
    expect(state.mode).toBe("HEATING");

    turnOffSauna();
    state = getSaunaState();
    expect(state.mode).toBe("OFF");
    expect(state.targetTemperature).toBeNull();
  });
});
