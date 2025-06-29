 // --- Gemini Cloud API Function ---
 export const callGemini = async (userText) => {
    const API_KEY = import.meta.env.VITE_VOXAAI_KEY;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userText }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
      return reply;
    } catch (err) {
      console.error("Gemini Error:", err);
      
    }
  };

   // --- Local Ollama Function ---
 export const callOllama = async (userText) => {
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:4b",
          prompt: userText,
          stream: false,
        }),
      });

      const data = await res.json();
      return data.response || "No reply from local LLM";
    } catch (err) {
      console.error("Ollama Error:", err);
    }
  };