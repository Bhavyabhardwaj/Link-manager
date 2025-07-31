# Link Manager

A full-stack link management application with URL shortening, analytics, and QR code generation.

## 🚀 Features

- **URL Shortening**: Create short, memorable links
- **Custom Slugs**: Personalize your shortened URLs
- **QR Code Generation**: Generate QR codes for your links
- **Analytics**: Track clicks, geographic data, and device information
- **User Authentication**: Secure login with Google and GitHub OAuth
- **Password Reset**: Secure password recovery system
- **Rate Limiting**: Protection against abuse

## 📁 Project Structure

This is a monorepo containing both the frontend and backend:

```
├── client/          # React + TypeScript frontend
├── server/          # Node.js + Express + Prisma backend
└── README.md        # This file
```

## 🛠️ Tech Stack

### Backend (server/)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js (Google & GitHub OAuth)
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

### Frontend (client/)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS modules

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Docker (optional)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Setup

You can also run the entire application using Docker:

```bash
cd server
docker-compose up -d
```

## 📖 API Documentation

The API documentation is available at `/api-docs` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- GitHub: [@Bhavyabhardwaj](https://github.com/Bhavyabhardwaj)
- Repository: [Link-manager-server](https://github.com/Bhavyabhardwaj/Link-manager-server)
