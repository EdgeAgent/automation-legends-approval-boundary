# Approval boundary starter

A dependency-free Node starter that formats a proposed consequential action for **human approval**. It keeps evidence and constraints beside the decision, leaves reviewer fields blank until a person acts, and defines a decline-or-revise path.

## Run locally

```bash
npm run demo
npm start
```

Open `http://localhost:3000` to prepare a reviewable approval record. The API endpoint is `POST /api/proposal`; a health check is available at `GET /health`.

## Deploy

Deploy on any Node 20 host with `npm start`, or use Docker:

```bash
docker build -t approval-boundary .
docker run -p 3000:3000 approval-boundary
```

## Contract

The result includes `proposal`, `evidence`, `constraints`, `approval_question`, and `decline_or_revise_path`. It also reports `awaiting_human_approval`; no approval is implied or simulated.
