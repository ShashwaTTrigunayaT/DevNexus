const Groq = require("groq-sdk");

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function getAIResponse(req, res) {
    try {
        const { code, prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Construct the prompt context
        const systemInstruction = `
        You are an expert coding assistant.
        INSTRUCTIONS:
        - Provide concise, helpful answers.
        - If the user asks to fix a bug, explain the fix and show the corrected code block.
        - Keep the tone professional but encouraging.
        `;

        const userContent = `
        CODE CONTEXT:
        \`\`\`
        ${code || "// No code provided"}
        \`\`\`

        USER QUESTION:
        ${prompt}
        `;

        // Call Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: userContent }
            ],
            model: "llama-3.3-70b-versatile", // Ensure this model ID is correct for your account
            temperature: 0.7,
            max_tokens: 1024,
        });

        // Extract response
        const aiResponse = chatCompletion.choices[0]?.message?.content || "No response generated.";

        res.status(200).json({ reply: aiResponse });

    } catch (err) {
        console.error("Groq AI Error:", err);
        return res.status(500).json({ error: "Failed to generate AI response" });
    }
}

module.exports = { getAIResponse };