import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";
import { EnvironmentConfig } from "../config/environment";
import { Logger } from "../utils";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging with proper logger
  Logger.error("Request error occurred", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Handle custom errors
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
    return;
  }

  // Handle Prisma errors
  if (error.name === "PrismaClientKnownRequestError") {
    res.status(400).json({
      status: "error",
      message: "Database operation failed",
    });
    return;
  }

  // Handle validation errors (Zod)
  if (error.name === "ZodError") {
    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: (error as any).errors,
    });
    return;
  }

  // Handle JWT errors
  if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    });
    return;
  }

  // Default error handler
  res.status(500).json({
    status: "error",
    message: EnvironmentConfig.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message,
  });
};