const axios = require('axios');

async function testBackend() {
    console.log("🚀 Sending code to backend...");
    
    try {
        // We send Python code to your new route
        const response = await axios.post('http://localhost:5000/execute', {
            language: "python",
            code: "print('IT WORKS! This came from the Docker Engine.')"
        });

        console.log("\n✅ SUCCESS! Received response:");
        console.log("---------------------------------");
        console.log(response.data); // Should show: { run: { stdout: "...", ... } }
        console.log("---------------------------------");
        
        if (response.data.run.stdout.includes("IT WORKS")) {
            console.log("🎉 SYSTEM IS FULLY OPERATIONAL");
        }

    } catch (error) {
        console.error("\n❌ ERROR FAILED:");
        if (error.response) {
            // The server responded with a status code other than 2xx
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            // Something else happened
            console.error(error.message);
        }
    }
}

testBackend();