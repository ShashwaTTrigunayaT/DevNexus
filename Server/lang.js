const axios = require('axios'); // Ensure you ran 'npm install axios' first

const PISTON_URL = 'http://localhost:2000/api/v2/packages';

async function install() {
    console.log("1. Updating Package List...");
    try {
        await axios.post(PISTON_URL);
    } catch (e) {
        // Ignore error here, sometimes it returns 200 with no body
    }

    console.log("2. Installing Node.js...");
    try {
        const resNode = await axios.post(PISTON_URL, {
            language: "node",
            version: "18.15.0"
        });
        console.log("   -> " + resNode.data.message);
    } catch (err) {
        console.error("   -> Error: " + err.message);
    }

    console.log("3. Installing Python...");
    try {
        const resPython = await axios.post(PISTON_URL, {
            language: "python",
            version: "3.10.0"
        });
        console.log("   -> " + resPython.data.message);
    } catch (err) {
        console.error("   -> Error: " + err.message);
    }

    console.log("\n4. Verifying Installation...");
    const resCheck = await axios.get(PISTON_URL);
    const languages = resCheck.data.map(pkg => pkg.language);
    
    if (languages.includes('node') && languages.includes('python')) {
        console.log("✅ SUCCESS! Node and Python are installed.");
        console.log("Installed languages:", languages);
    } else {
        console.log("❌ FAILED. Current languages:", languages);
    }
}

install();