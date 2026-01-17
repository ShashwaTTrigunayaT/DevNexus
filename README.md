# DevNexus 🚀
### **Real-Time Collaboration. Instant Execution.**

**DevNexus** is a high-performance, collaborative IDE built to handle real-time synchronization and secure remote code execution. It allows developers to join shared rooms, write code together with sub-100ms latency, and run scripts in a sandboxed environment.



---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nexus Intelligence](https://img.shields.io/badge/Intelligence-Nexus--Insight-blueviolet?style=for-the-badge)
![System Architecture](https://img.shields.io/badge/Architecture-Orchestrated--LLM-orange?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


---

## ✨ Key Features

- [x] **Real-Time Sync:** Simultaneous editing powered by Socket.io and Redis Pub/Sub.
- [x] **Remote Execution:** "Run" button to compile code in **20+ languages** via Piston API.
- [x] **Sandboxed Environment:** Execution happens in isolated Docker containers to prevent host-system attacks.
- [x] **Dynamic Rooms:** Unique session links for instant collaboration (e.g., `/room/shashwat-ravan`).
- [x] **State Persistence:** Code snippets are automatically saved to MongoDB.
- [x] **Monaco Editor:** Integrated VS Code engine for syntax highlighting and Intellisense.
- [x] **AI-Powered Code Analysis:** Integrated Google Gemini Pro to provide instant code explanations, complexity analysis, and bug detection.
- [x] **Context-Aware Debugging:** The AI understands the specific programming language and current code state to suggest optimized refactors.

---

## 🏗 Engineering Depth (Beyond CRUD)

This project was built to solve complex challenges in distributed systems and security:

### 1. Scaling WebSockets with Redis Pub/Sub
In standard Node.js, WebSockets are stored in the server's local RAM. If the backend scales to multiple instances, users on different servers cannot see each other's changes.
* **The Solution:** I implemented a **Redis Adapter**. Redis acts as a message broker that synchronizes socket events across all server nodes, making the system horizontally scalable.

### 2. Secure Code Execution (Sandboxing)
Running user-submitted code (like `rm -rf /` or infinite loops) is a major security risk.
* **The Solution:** The execution layer is decoupled. Code is sent to an isolated **Docker-based Piston engine** with strict CPU and Memory limits, ensuring that user scripts cannot access the host file system or network.



### 3. Write-Through Caching Pattern
To avoid high-frequency database writes on every keystroke:
* **The Solution:** The "hot" state of the code is cached in **Redis**. The application flushes the code to **MongoDB** only at periodic intervals or on session exit, significantly reducing database I/O overhead.

---

## 🚀 Getting Started (Docker Compose)

DevNexus is fully containerized. You can spin up the entire infrastructure with a single command.

### 1. Clone the Repository
```bash
git clone [https://github.com/ShashwaTTrigunayaT/dev-nexus.git](https://github.com/ShashwaTTrigunayaT/dev-nexus.git)
cd dev-nexus
