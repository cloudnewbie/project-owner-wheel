# Project Owner Wheel

A React and p5.js web application for visualizing project topics and their owners through an interactive wheel diagram.

## Features

- Interactive wheel visualization with p5.js
- Topic selection dropdown
- Dynamic arrow pointing to project owners
- Responsive design with Tailwind CSS
- TypeScript support

## Project Mappings

- **GLIMS Bluesky Migration** → Sayan Ghosh
- **DMS** → Sayan Ghosh  
- **DSCS Hackathon** → Emmanuel Akinlabi
- **DR and HA for DDP** → Shivanjali Kumar
- **MongoDB eval** → Chandra Vyas, Jay Mehta

## Tech Stack

- React 18
- TypeScript
- p5.js for visualization
- Tailwind CSS for styling
- Vite for build tooling
- Express.js backend

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to view the application

## Project Structure

- `client/` - React frontend application
- `server/` - Express.js backend
- `shared/` - Shared types and schemas
- `components/` - Reusable React components

## Components

- `SimpleWheelVisualization` - Main wheel component using p5.js
- `TopicSelector` - Dropdown for selecting project topics
- `AppHeader` - Application header component

## Development

The wheel visualization is built with p5.js and uses precise angle calculations to point arrows to the correct project owners based on the selected topic.