import { Router } from "express";
import { rateLimiters } from "../middlewares";
import { redirectController } from "../controllers";

const redirectRouter = Router();

/**
 * @swagger
 * /{slug}/info:
 *   get:
 *     summary: Get information about a short link without redirecting
 *     tags: [Short Links]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Short link slug
 *         example: bf2024
 *     responses:
 *       200:
 *         description: Link information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Link information retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     url:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     shortUrl:
 *                       type: string
 *                     clickCount:
 *                       type: number
 *                     expiresAt:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *       404:
 *         description: Short link not found
 */
redirectRouter.get('/:slug/info', rateLimiters.publicPageLimiter, redirectController.getLinkInfo);

/**
 * @swagger
 * /{slug}/analytics:
 *   get:
 *     summary: Get analytics for a short link
 *     tags: [Short Links]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Short link slug
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: ['1h', '24h', '7d', '30d']
 *           default: '24h'
 *         description: Analytics timeframe
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Number of recent clicks to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *           default: 0
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     link:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         url:
 *                           type: string
 *                         slug:
 *                           type: string
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalClicks:
 *                           type: number
 *                         uniqueClicks:
 *                           type: number
 *                         recentClicks:
 *                           type: array
 *                           items:
 *                             type: object
 */
redirectRouter.get('/:slug/analytics', rateLimiters.publicPageLimiter, redirectController.getLinkAnalytics);

/**
 * @swagger
 * /{slug}:
 *   get:
 *     summary: Redirect to original URL using short link
 *     tags: [Short Links]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Short link slug
 *         example: bf2024
 *     responses:
 *       301:
 *         description: Permanent redirect to original URL
 *       404:
 *         description: Short link not found, expired, or limit reached
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: Link not found
 *                 message:
 *                   type: string
 *                   example: The short link you're looking for doesn't exist or has been deleted
 */
redirectRouter.get('/:slug', rateLimiters.clickLimiter, redirectController.redirectToOriginalUrl);

export default redirectRouter;