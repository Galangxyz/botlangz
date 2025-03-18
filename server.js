import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("LangzBot API is running!");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: "Pesan tidak boleh kosong" });

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      stream: false,
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    res.json({ reply: `LangzBot: ${response.data.choices[0].message.content}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghubungi AI" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
