const API_URL = import.meta.env.VITE_API_URL;


export async function fetchSaunaState() {
  const res = await fetch(`${API_URL}/sauna`);
  if (!res.ok) {
    throw new Error("Failed to fetch sauna state");
  }
  return res.json();
}

export async function sendCommand(type, payload) {
  const res = await fetch(`${API_URL}/sauna/command`, {
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
