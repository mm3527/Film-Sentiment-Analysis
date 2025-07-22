import { useState } from "react";
import { useSelector } from "react-redux";

function ChatbotApp({ prompt }) {
  const UsersApiKey = useSelector((state) => state.home.API_KEY);
  const [response, setResponse] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const callChatGPT = async () => {
    if (loading) return;
    setLoading(true);
    setErr(null);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UsersApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Viewers sentiment for ${prompt} movie, 5 positive & 5 negative points`,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      {response || err ? (
        response ? (
          <div className="GPT_response">
            {response.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ) : (
          <div style={{ color: "#f88" }}>
            {err} (check your API key)
            <button onClick={() => window.location.reload()}>Refresh</button>
          </div>
        )
      ) : (
        <button onClick={callChatGPT} disabled={loading}>
          {loading ? "Analyzing…" : "View Response"}
        </button>
      )}
    </div>
  );
}

export default ChatbotApp;
