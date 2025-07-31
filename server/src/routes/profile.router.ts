import { Router } from "express";
import { profileController } from "../controllers";

const profileRouter = Router();

/**
 * @swagger
 * /profile/{username}:
 *   get:
 *     summary: Get public bio page for a user
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the profile to view
 *         example: john
 *     responses:
 *       200:
 *         description: Bio page fetched successfully
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
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                       example: john
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     bio:
 *                       type: string
 *                       example: Digital creator and entrepreneur
 *                     image:
 *                       type: string
 *                       example: https://example.com/avatar.jpg
 *                     theme:
 *                       type: string
 *                       example: light
 *                     links:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           url:
 *                             type: string
 *                           description:
 *                             type: string
 *                           icon:
 *                             type: string
 *                           clickCount:
 *                             type: number
 *       404:
 *         description: Profile not found or private
 */
profileRouter.get('/:username', profileController.getBioPage);

/**
 * @swagger
 * /profile/{username}/link/{linkId}:
 *   get:
 *     summary: Click a bio link and redirect to destination
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the profile
 *         example: john
 *       - in: path
 *         name: linkId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the link to click
 *     responses:
 *       302:
 *         description: Redirect to the link destination
 *       404:
 *         description: Link not found
 */
profileRouter.get('/:username/link/:linkId', profileController.clickBioLink);

export default profileRouter;