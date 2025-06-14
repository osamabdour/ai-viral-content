
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { platform, niche, ideas, length, language } = req.body;

  const prompt = `Generate ${ideas} viral ${platform} content ideas in ${language} for the niche: ${niche}. Each idea should be ${length} in script length.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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"
        }
      }
    );

    const result = response.data.choices[0].message.content;
    res.json({ content: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate content." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
