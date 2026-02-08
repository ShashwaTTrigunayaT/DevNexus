const axios = require('axios');
const LANGUAGE_VERSIONS = {
    "javascript": { language: "node", version: "18.15.0" },
    "typescript": { language: "typescript", version: "5.0.3" },
    "python": { language: "python", version: "3.10.0" },
    "java": { language: "java", version: "15.0.2" },
    "csharp": { language: "csharp", version: "6.12.0" },
    "php": { language: "php", version: "8.2.3" },
};
async function executeCode(req , res) {
    
    const { language, code } = req.body;
    if(!code){
        return res.status(400).json({ error: "Code is required" }); 

    }
    const pistonConfig = LANGUAGE_VERSIONS[language];
    if (!pistonConfig) {
        return res.status(400).json({ error: "Invalid language" });
    }
    console.log(pistonConfig);
    try {
        const response = await axios.post('http://localhost:2000/api/v2/execute', {
            language: pistonConfig.language,
            version: pistonConfig.version,
            files: [                 // Piston requires this array
                {
                    content: code    // Your code goes here
                }
            ]
        });
       res.json({ run: response.data.run });
    } catch (error) {
        res.status(500).json({ error: "Execution failed", details: error.message });
    }
}
module.exports = { executeCode };