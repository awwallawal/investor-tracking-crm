# 3. Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| Frontend Language | TypeScript | ~5.x | Type safety for robust, maintainable code. | Catches errors early, improves developer experience. |
| Frontend Framework | React | ~18.x | Building the user interface with components. | Industry standard for modern, interactive UIs. |
| UI Component Library | Material-UI (MUI) | ~5.x | Pre-built, professional UI components. | Speeds up development and ensures a consistent, high-quality look and feel. |
| State Management | Redux Toolkit | ~2.x | Managing complex application state. | Official, opinionated toolset for efficient Redux development. |
| Backend Language | TypeScript | ~5.x | Type safety for the backend API. | Consistency with frontend, reduces bugs, improves code quality. |
| Backend Framework | Express.js | ~4.x | Building the backend REST API. | Minimal, flexible Node.js framework; the 'E' in MERN. |
| API Style | REST | N/A | Standard for client-server communication. | Well-understood, stateless, and perfect for this application's needs. |
| Database | MongoDB | ~7.x | Storing all application data. | Document-based NoSQL database; the 'M' in MERN. Flexible and scalable. |
| File Storage | Cloudinary | API | Storing uploaded documents (e.g., letters). | Provides a simple API for file storage and delivery with a robust free tier. |
| Authentication | JWT (JSON Web Tokens) | ~9.x | Securely transmitting information between parties. | Standard for stateless authentication in REST APIs. |
| Email Service | Nodemailer | ~6.x | Sending emails from the backend. | Robust and widely-used email library for Node.js. |
| Frontend Testing | Jest & RTL | latest | Unit & component testing for React. | Industry standard for testing React applications. |
| Backend Testing | Jest & Supertest | latest | Unit & API endpoint testing for Express. | Allows for testing API endpoints without a running server. |
| E2E Testing | Cypress | latest | End-to-end testing of user flows. | Powerful tool for testing the application from the user's perspective. |
| Build/Bundler | Vite | ~5.x | Frontend development server and build tool. | Extremely fast developer experience and optimized production builds. |
| CI/CD | Vercel & Render | N/A | Automated builds and deployments. | Both platforms have excellent, integrated CI/CD pipelines. |
| Monitoring | Vercel/Render Built-in | N/A | Basic application health monitoring. | Provides essential metrics out-of-the-box for easy operational oversight. |
| Logging | Pino | ~8.x | High-performance logging for Node.js. | Fast, simple, and produces structured logs suitable for production. |
| CSS Framework | CSS Modules | N/A | Scoped, component-level CSS styling. | Allows writing plain CSS without global scope conflicts; built into Vite. |
