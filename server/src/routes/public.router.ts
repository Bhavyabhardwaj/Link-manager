import { Router } from "express";
import { publicController } from "../controllers";
import { rateLimiters } from "../middlewares";
import redirectRouter from "./redirect.router";

const publicRouter = Router();

// Handle root path before redirect router
publicRouter.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Link Manager API is running",
        version: "1.0.0",
        documentation: "/api-docs"
    });
});

// Handle favicon and other common requests
publicRouter.get("/favicon.ico", (req, res) => {
    res.status(204).end();
});

/**
 * @swagger
 * /api/public/u/{username}:
 *   get:
 *     summary: Get public profile by username
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the public profile
 *     responses:
 *       200:
 *         description: Public profile fetched successfully
 *       404:
 *         description: Profile not found
 */
publicRouter.get("/u/:username", rateLimiters.publicPageLimiter, publicController.getProfile);

// Mount redirect router last to handle slug-based redirects
publicRouter.use('/', redirectRouter);

export default publicRouter;