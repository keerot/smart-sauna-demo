const API_BASE = "http://localhost:4000/api";

export async function fetchSaunaState() {
  const res = await fetch(`${API_BASE}/sauna`);
  if (!res.ok) {
    throw new Error("Failed to fetch sauna state");
  }
  return res.json();
}

export async function sendCommand(type, payload) {
  const res = await fetch(`${API_BASE}/sauna/command`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type, payload })
  });

  if (!res.ok) {
    throw new Error("Failed to send command");
  }
  return res.json();
}
