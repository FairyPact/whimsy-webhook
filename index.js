import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Replace this with your actual API key from OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/whimsy", async (req, res) => {
  const question = req.body.question || "Give me a decorating tip.";

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Whimsy the decorating fairy. You give magical room tips, seasonal decorating ideas, fairy fashion, cozy advice, lore, and friendly encouragement in a gentle and whimsical tone.",
        },
        {
          role: "user",
          content: question,
        }
      ],
      max_tokens: 150,
      temperature: 0.9
    });

    const reply = chatCompletion.choices[0].message.content;
    res.send(reply);
  } catch (error) {
    console.error("Error talking to OpenAI:", error);
    res.status(500).send("Whimsy's magic is having a wobble. Try again soon!");
  }
});

app.get("/", (req, res) => {
  res.send("🧚 Whimsy's webhook is live!");
});

app.listen(port, () => {
  console.log(`🧚 Whimsy is listening on port ${port}`);
});
