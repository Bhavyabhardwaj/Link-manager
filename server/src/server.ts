import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import passport from "passport";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares";
import { swaggerDocs, swaggerDocsSetup } from "./docs/swagger";
import { schedulerUtil } from "./utils";
import { EnvironmentConfig } from "./config/environment";
import Logger from "./utils/logger";
import './config/passportGithub';
import './config/passportGoogle';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = EnvironmentConfig.PORT;

// Cookie session configuration with proper environment variables
app.use(cookieSession(EnvironmentConfig.getCookieConfig('github-auth-session')))
app.use(cookieSession(EnvironmentConfig.getCookieConfig('google-auth-session')))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint with proper typing
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    message: "Server is up and running.",
    environment: EnvironmentConfig.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API documentation
app.use('/api-docs', swaggerDocs, swaggerDocsSetup);

// Routes
app.use("/", router);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
  Logger.info(`Environment: ${EnvironmentConfig.NODE_ENV}`);
  Logger.info(`API Documentation: ${EnvironmentConfig.BASE_URL}/api-docs`);
  
  // Initialize scheduled tasks for link management
  schedulerUtil.initializeScheduledTasks();
});