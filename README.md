# TeamConnect – Workplace Collaboration

A React + Vite workplace collaboration starter for the Nexon Challenge. It includes a responsive workspace UI with project channels, direct-message views, and a shift-handover channel.

## Current status

**This download is a frontend starter in demo mode, not a completed Nexconn integration.** The UI lets you navigate channels and send local in-browser demo messages. Messages are not yet delivered to other users and do not persist after refresh.

Do not submit this as proof of Nexconn Chat SDK usage until you complete and test the real SDK connection.

## Requirements

- Node.js LTS (20+ recommended)
- npm
- Nexconn developer account and App Key
- A secure backend/token service for Nexconn user authentication

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, copy the environment template with:

```powershell
Copy-Item .env.example .env
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Nexconn integration checklist

1. Create a Nexconn application in the official Nexconn Console and obtain its App Key.
2. Confirm the exact current Web Chat SDK package names, supported initialization flow, and APIs from Nexconn's official documentation/sample. SDK APIs can change; do not guess method names.
3. Implement a backend endpoint that authenticates your application and issues a user-scoped Nexconn token using credentials kept server-side.
4. Initialize the official Nexconn Chat SDK in `src/services/nexconn.js` using the App Key and token returned by your backend.
5. Replace the local `send()` state update in `src/App.jsx` with the documented SDK send-message API.
6. Load channel lists and message history through the SDK, and subscribe to incoming message events.
7. Test with two separate user accounts/browser sessions. Verify messages arrive in real time and history loads after refresh.
8. Update the submission write-up to describe only the SDK features that are genuinely working.

### Security

- Never commit `.env`, App Secret, or user access tokens.
- Do not put App Secret or privileged tokens in `VITE_*` variables; Vite exposes these values to browser code.
- Add server-side authorization so users can only access channels and conversations they are allowed to use.

## Deploy

Build:

```bash
npm run build
```

Deploy the project to Vercel or another static hosting provider. Configure only public frontend variables there. Your token service must be deployed separately over HTTPS.

## GitHub

Create a public repository named `teamconnect`, then:

```bash
git init
git add .
git commit -m "Initial TeamConnect workplace collaboration UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/teamconnect.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.
