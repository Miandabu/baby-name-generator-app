export default async function handler(req, res) {
  const { mode, gender, origin, startsWith, theme, name1, name2 } = req.body;
  const prompt =
    mode === 'combine'
      ? `Combine the names ${name1} and ${name2} to create 5 unique baby names.`
      : `Generate 5 ${gender || ''} baby names of ${origin || ''} origin that start with \"${startsWith}\" with the theme \"${theme}\".`;

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8
      })
    });
    const json = await apiRes.json();
    const raw = json.choices[0].message.content;
    const names = raw.split(/\\d+\\.\\s*/).map(n => n.trim()).filter(Boolean);
    res.status(200).json({ names });
  } catch (err) {
    console.error(err);
    res.status(500).json({ names: [] });
  }
}
