import { useEffect, useState } from "react";
import { fetchSaunaState, sendCommand } from "./api";

function App() {
  const [sauna, setSauna] = useState(null);
  const [targetTempInput, setTargetTempInput] = useState("75");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    async function load() {
      try {
        setError("");
        const data = await fetchSaunaState();
        setSauna(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Virhe haettaessa saunan tilaa");
      }
    }

    load();

    // Pollaa tilaa 2 sek välein
    intervalId = setInterval(load, 2000);

    return () => clearInterval(intervalId);
  }, []);

  async function handleSetTarget() {
    const temp = Number(targetTempInput);
    if (isNaN(temp)) {
      setError("Anna kelvollinen lämpötila");
      return;
    }
    try {
      setError("");
      const data = await sendCommand("SET_TARGET_TEMPERATURE", {
        temperature: temp
      });
      setSauna(data);
    } catch (e) {
      console.error(e);
      setError("Virhe lähetettäessä komentoa");
    }
  }

  async function handleTurnOff() {
    try {
      setError("");
      const data = await sendCommand("TURN_OFF");
      setSauna(data);
    } catch (e) {
      console.error(e);
      setError("Virhe lähetettäessä komentoa");
    }
  }

  if (loading) {
    return <div style={containerStyle}>Ladataan saunan tilaa...</div>;
  }

  if (!sauna) {
    return <div style={containerStyle}>Ei saunan tilaa saatavilla</div>;
  }

  return (
    <div style={containerStyle}>
      <h1>Smart Sauna Demo</h1>

      {error && (
        <div style={{ marginBottom: "1rem", color: "red" }}>
          {error}
        </div>
      )}

      <div style={cardStyle}>
        <p><strong>Lämpötila:</strong> {sauna.temperature.toFixed(1)} °C</p>
        <p><strong>Kosteus:</strong> {sauna.humidity.toFixed(1)} %</p>
        <p><strong>Tila:</strong> {sauna.mode}</p>
        <p>
          <strong>Tavoitelämpö:</strong>{" "}
          {sauna.targetTemperature != null
            ? `${sauna.targetTemperature} °C`
            : "ei asetettu"}
        </p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Tavoitelämpö (°C):{" "}
          <input
            type="number"
            value={targetTempInput}
            onChange={(e) => setTargetTempInput(e.target.value)}
            style={{ width: "80px" }}
          />
        </label>
        <button onClick={handleSetTarget} style={{ marginLeft: "0.5rem" }}>
          Aseta
        </button>
      </div>

      <button onClick={handleTurnOff}>
        Sammuta kiuas
      </button>
    </div>
  );
}

const containerStyle = {
  maxWidth: "480px",
  margin: "2rem auto",
  fontFamily: "system-ui",
  padding: "1rem"
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
};

export default App;
