import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/whimsy", async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).send("Missing question");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Whimsy, a decorating fairy who gives charming, cozy, magical style suggestions." },
          { role: "user", content: question }
        ],
        max_tokens: 120,
        temperature: 0.8
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "(No response)";
    return res.status(200).send(reply);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Whimsy’s magic spark fizzled!");
  }
});

app.get("/", (req, res) => res.send("🧚 Whimsy Fairy Webhook is live!"));
app.listen(PORT, () => console.log("Whimsy is listening on port", PORT));
