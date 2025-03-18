import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: "Pesan tidak boleh kosong" });

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      prompt: userMessage,
      stream: false,
    });

    res.json({ reply: `LangzBot: ${response.data.response}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghubungi AI" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
