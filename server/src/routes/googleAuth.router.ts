import { Router } from "express";
import passport from "passport";
import { jwtUtil } from "../utils";

const googleAuthRouter = Router();

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 */
// to authenticate google requests
googleAuthRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get('/google/callback',
    (req, res, next) => {
        passport.authenticate('google', { session: false }, (err: any, user: any, info: any) => {
            if (err) {
                console.error('Google OAuth error:', err);
                const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
                return res.redirect(`${clientUrl}/auth/signin?error=Authentication failed`);
            }
            
            if (!user) {
                console.error('Google OAuth: No user returned');
                const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
                return res.redirect(`${clientUrl}/auth/signin?error=Authentication failed`);
            }
            
            try {
                const token = jwtUtil.generateToken({ data: user as object, expiresIn: '1d' });
                
                // Redirect to frontend with token and user data
                const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
                const encodedUser = encodeURIComponent(JSON.stringify(user));
                
                console.log(`Redirecting to: ${clientUrl}/auth/oauth/callback?token=${token.substring(0, 10)}...`);
                
                res.redirect(`${clientUrl}/auth/oauth/callback?token=${token}&user=${encodedUser}`);
            } catch (tokenError) {
                console.error('Token generation error:', tokenError);
                const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
                res.redirect(`${clientUrl}/auth/signin?error=Token generation failed`);
            }
        })(req, res, next);
    }
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns JWT token and user info on successful authentication
 *       401:
 *         description: Authentication failed
 */

export default googleAuthRouter;