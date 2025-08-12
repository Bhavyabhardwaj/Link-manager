<div align="center">

# 🔗 Link Manager!

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&pause=1000&color=4A90E2&center=true&vCenter=true&width=600&lines=Welcome+to+Link+Manager!;Full-Stack+URL+Shortener;Advanced+Analytics+%26+Insights;Built+with+TypeScript+%26+Love" alt="Typing SVG" />

<p align="center">
  <strong>A powerful, feature-rich full-stack URL shortener with advanced analytics, custom slugs, and seamless user management</strong>
</p>

<!-- Badges -->
<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/Bhavyabhardwaj/Link-manager-server?color=4A90E2&logo=github">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/Bhavyabhardwaj/Link-manager-server?color=FFD700&logo=github">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/Bhavyabhardwaj/Link-manager-server?color=32CD32&logo=github">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/Bhavyabhardwaj/Link-manager-server?color=FF6B6B&logo=github">
  <img alt="License" src="https://img.shields.io/github/license/Bhavyabhardwaj/Link-manager-server?color=9B59B6&logo=opensourceinitiative">
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-docker-deployment">Docker</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

</div>

## 🌟 **Features**

<div align="center">
<table>
<tr>
<td align="center" width="33%">

### 🚀 **Performance**
⚡ Lightning-fast URL shortening<br>
🔄 Real-time analytics<br>
📱 Mobile-responsive design<br>
⚡ Optimized database queries

</td>
<td align="center" width="33%">

### 🔐 **Security**
🛡️ Rate limiting protection<br>
🔒 JWT authentication<br>
🔑 OAuth integration (Google, GitHub)<br>
🛡️ Input validation & sanitization

</td>
<td align="center" width="33%">

### 📊 **Analytics**
📈 Detailed click tracking<br>
🌍 Geographic analytics<br>
📱 Device & browser detection<br>
📅 Time-based insights

</td>
</tr>
</table>
</div>

### ✨ **Core Features**

- **🔗 URL Shortening**: Create short, memorable links with custom slugs
- **📊 Advanced Analytics**: Track clicks, geographic data, device information, and more
- **🎨 QR Code Generation**: Generate QR codes for your shortened links
- **👤 User Authentication**: Secure login with Google and GitHub OAuth
- **🔐 Password Reset**: Secure password recovery system
- **⚡ Rate Limiting**: Protection against abuse and spam
- **🌐 Public Links**: Share links without authentication
- **📱 Responsive Design**: Works seamlessly on all devices
- **🐳 Docker Support**: Easy deployment with Docker containers

## 📁 **Project Structure**

This is a **monorepo** containing both the frontend and backend applications:

```
📦 Link Manager (Monorepo)
├── 🎨 client/                    # React + TypeScript Frontend
│   ├── 📦 package.json          # Frontend dependencies
│   ├── ⚙️ vite.config.ts        # Vite configuration
│   ├── 🎯 tsconfig.json         # TypeScript config
│   ├── 🎨 src/                  # Source code
│   │   ├── 📱 components/       # React components
│   │   ├── 📄 pages/            # Page components
│   │   ├── 🔧 hooks/            # Custom hooks
│   │   ├── 🎨 styles/           # CSS/styling
│   │   └── 🔌 utils/            # Utility functions
│   └── 📦 public/               # Static assets
├── ⚙️ server/                    # Node.js + Express Backend
│   ├── 📦 package.json          # Backend dependencies
│   ├── 🐳 Dockerfile            # Docker configuration
│   ├── 🗄️ prisma/              # Database schema & migrations
│   ├── 📡 src/                  # Source code
│   │   ├── 🛣️ routes/           # API routes
│   │   ├── 🎮 controllers/      # Request handlers
│   │   ├── 🔧 services/         # Business logic
│   │   ├── 🗄️ models/          # Database models
│   │   ├── 🛡️ middlewares/     # Express middlewares
│   │   ├── 🔧 utils/            # Utility functions
│   │   └── ✅ validation/       # Input validation
│   └── 📚 docs/                 # API documentation
├── 🏗️ package.json             # Workspace configuration
├── 🔒 package-lock.json         # Dependency locks
├── 📝 README.md                 # This file
└── 🙈 .gitignore               # Git ignore rules
```

## 🛠️ **Tech Stack**

<div align="center">
<table>
<tr>
<td align="center" width="50%">

### 🎨 **Frontend (client/)**
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API communication
- **Styling**: CSS Modules & Modern CSS
- **Development**: Hot reload, fast refresh

</td>
<td align="center" width="50%">

### ⚙️ **Backend (server/)**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js (Google & GitHub OAuth)
- **Documentation**: Swagger/OpenAPI
- **Security**: JWT, bcrypt, rate limiting
- **Containerization**: Docker & Docker Compose

</td>
</tr>
</table>
</div>

## 🚀 **Quick Start**

### 📋 **Prerequisites**

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** database - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **Docker** (optional) - [Download](https://www.docker.com/)

### ⚡ **One-Command Setup**

```bash
# Clone the repository
git clone https://github.com/Bhavyabhardwaj/Link-manager-server.git
cd Link-manager-server

# Install all dependencies (client + server)
npm run install:all

# Set up environment variables
cd server && cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npx prisma migrate dev

# Start both frontend and backend
npm run dev
```

🎉 **That's it!** Your application will be running at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs

### 🔧 **Detailed Setup**

<details>
<summary>Click to expand detailed setup instructions</summary>

#### **Backend Setup**

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/linkmanager"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key"
   
   # OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

#### **Frontend Setup**

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

</details>

## 🐳 **Docker Deployment**

### **Quick Docker Setup**

```bash
# Navigate to server directory
cd server

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start both client and server in development mode |
| `npm run dev:client` | 🎨 Start only the React frontend |
| `npm run dev:server` | ⚙️ Start only the Node.js backend |
| `npm run build` | 🏗️ Build both client and server for production |
| `npm run build:client` | 🎨 Build only the frontend |
| `npm run build:server` | ⚙️ Build only the backend |
| `npm run install:all` | 📦 Install dependencies for both client and server |
| `npm run test` | 🧪 Run tests for both client and server |
| `npm start` | 🚀 Start the production server |

## 📖 **API Documentation**

The comprehensive API documentation is available at `/api-docs` when the server is running.

**Key Endpoints:**

- **🔗 Links**: `POST /api/links` - Create shortened links
- **📊 Analytics**: `GET /api/analytics` - Get link analytics
- **👤 Auth**: `POST /api/auth/login` - User authentication
- **📱 Public**: `GET /:slug` - Redirect to original URL

<div align="center">
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger API Docs">
</div>

## 🤝 **Contributing**

We love your contributions! Here's how to get started:

<details>
<summary>📝 Contributing Guidelines</summary>

### **Development Workflow**

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Link-manager-server.git
   cd Link-manager-server
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Test your changes**
   ```bash
   npm run test
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git commit -m "✨ Add amazing feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Create a Pull Request**
   - Go to GitHub and create a PR
   - Describe your changes clearly
   - Wait for review and merge

### **Code Style**

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Include tests for new features

</details>

## 📊 **Project Stats**

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Bhavyabhardwaj&repo=Link-manager-server&show_icons=true&theme=radical" alt="GitHub Stats">
</div>

## 📄 **License**

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <img src="https://img.shields.io/github/license/Bhavyabhardwaj/Link-manager-server?style=for-the-badge&color=9B59B6" alt="License">
</div>

## 📧 **Contact & Support**

<div align="center">

### 🙋‍♂️ **Get in Touch**

<p align="center">
  <a href="https://github.com/Bhavyabhardwaj">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="mailto:your-email@example.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  <a href="https://linkedin.com/in/your-profile">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

### ⭐ **Show Your Support**

If you found this project helpful, please consider giving it a star! ⭐

<p align="center">
  <a href="https://github.com/Bhavyabhardwaj/Link-manager-server">
    <img src="https://img.shields.io/github/stars/Bhavyabhardwaj/Link-manager-server?style=social" alt="GitHub Stars">
  </a>
</p>

</div>

---

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
  
  **Made with ❤️ by [Bhavyabhardwaj](https://github.com/Bhavyabhardwaj)**
  
  *Building the future, one link at a time* 🔗
</div>
