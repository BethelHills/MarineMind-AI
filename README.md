# MarineMind AI

AI-Powered Marine Maintenance Assistant

MarineMind AI is an intelligent marine maintenance platform designed for vessel engineers, ship operators, and maintenance teams. The system helps monitor equipment health, manage maintenance schedules, analyze faults, generate AI-powered maintenance reports, manage vessel documents, and provide real-time maintenance recommendations through an advanced AI assistant.

Built for modern maritime operations, MarineMind AI combines maintenance management with artificial intelligence to reduce downtime, improve safety, and support faster fault diagnosis.

---

## Features

### Dashboard

- Real-time maintenance overview
- Equipment health monitoring
- Active alerts and notifications
- Maintenance statistics
- Fleet performance insights

### Equipment Management

- Equipment inventory tracking
- Equipment health scores
- Maintenance history
- Operational status monitoring
- Equipment detail management

### Maintenance Management

- Preventive maintenance scheduling
- Maintenance task tracking
- Work order management
- Service history records
- Maintenance completion workflow

### AI Assistant

- Marine engineering support
- Equipment troubleshooting
- Maintenance recommendations
- Technical guidance
- AI-powered fault analysis

### Alerts Center

- Critical fault notifications
- Maintenance reminders
- Equipment warning alerts
- Operational risk monitoring
- Alert prioritization

### Reports Center

- Maintenance reports
- AI-generated reports
- Equipment health reports
- Exportable maintenance records
- Performance analytics

### Document Vault

- Technical manuals
- Inspection reports
- Maintenance records
- Equipment certificates
- Vessel documentation

### Settings & Administration

- User preferences
- AI configuration
- Security controls
- Notification management
- System configuration

---

## Key Feature

### AI Fault Diagnosis

MarineMind AI can analyze equipment fault descriptions and return possible causes, inspection steps, safety precautions, recommended actions, and a maintenance fault report summary.

**Example**

Input:

```txt
Main engine temperature is increasing rapidly.
```

Output:

```txt
Equipment: Main Engine

Possible Causes:
- Cooling water restriction
- Fouled heat exchanger
- Thermostat malfunction

Risk Level: High

Inspection Checklist:
- Check seawater inlet
- Inspect heat exchanger
- Verify coolant circulation

Recommended Actions:
- Inspect cooling system
- Check seawater flow
- Monitor engine load

Safety Precautions:
- Reduce engine load if safe
- Monitor temperature continuously

Maintenance Fault Report Summary:
Rapid temperature increase detected. Immediate inspection of the cooling system is recommended to prevent overheating and potential engine damage.
```

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide Icons

### Backend

- Node.js
- Express.js
- OpenAI API

### Deployment

- GitHub
- QuikDB

---

## Project Structure

```txt
src/
│
├── pages/
│   ├── Dashboard
│   ├── Equipment
│   ├── Maintenance
│   ├── AIAssistant
│   ├── Alerts
│   ├── Reports
│   ├── Documents
│   └── Settings
│
├── components/
│   ├── AppLayout
│   ├── Navigation
│   └── Shared UI
│
└── services/
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/BethelHills/MarineMind-AI.git
```

Navigate into the project:

```bash
cd MarineMind-AI
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=5001
VITE_API_URL=http://localhost:5001
```

Start the application:

```bash
npm run dev:all
```

Frontend:

```txt
http://localhost:8080
```

Backend:

```txt
http://localhost:5001
```

---

## Screenshots

### Landing Page

Add screenshot here

### Dashboard

Add screenshot here

### Equipment

Add screenshot here

### Maintenance

Add screenshot here

### AI Assistant

Add screenshot here

### Alerts

Add screenshot here

### Reports

Add screenshot here

### Documents

Add screenshot here

### Settings

Add screenshot here

---

## Use Cases

MarineMind AI is designed for:

- Marine Engineers
- Ship Operators
- Fleet Managers
- Vessel Maintenance Teams
- Maritime Training Institutions
- Offshore Operations

---

## Future Improvements

- Predictive maintenance engine
- Equipment sensor integration
- Vessel fleet management
- Maintenance calendar synchronization
- Multi-vessel support
- Offline operation mode
- AI voice assistant
- Mobile application
- PDF report generation
- Advanced analytics dashboard

---

## Why MarineMind AI

MarineMind AI is more than a maintenance tracker. It is an intelligent marine engineering assistant that combines maintenance management, fault diagnostics, AI-powered reporting, and document management into a single platform designed specifically for maritime operations.

The goal is to help vessel engineers make faster maintenance decisions, improve equipment reliability, reduce downtime, and enhance operational safety.

---

## Author

Bethel Hillary

Marine Engineer | Full-Stack Developer

GitHub: https://github.com/BethelHills

Project: https://github.com/BethelHills/MarineMind-AI
