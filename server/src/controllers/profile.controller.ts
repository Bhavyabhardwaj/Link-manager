import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors";
import { profileService } from "../services";
import { deviceUtil, ipUtil } from "../utils";
import { getIpInfo } from "../utils/ip";

export const getBioPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;
        const profile = await profileService.getUserBioPage(username);
        res.status(200).json({
            status: "success",
            message: "User bio page fetched successfully",
            data: profile
        });
    } catch (error) {
        next(error);
    }
};

export const clickBioLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { linkId } = req.params;
        const userAgent = req.headers['user-agent'] || '';
        const ip = req.ip || req.socket.remoteAddress;
        const referrer = req.headers.referer || '';
        const [ipInfo, deviceInfo] = await Promise.all([
            ipUtil.getIpInfo(ip || ""),
            Promise.resolve(deviceUtil.extractDeviceInfo(userAgent || ""))
        ]);

        const result = await profileService.trackBioLinkClick(linkId, {
            userAgent,
            ipAddress: ipInfo.ip,
            referrer,
            country: ipInfo.country,
            city: ipInfo.city,
            agent: deviceInfo.browser,
            device: deviceInfo.deviceType,
            os: deviceInfo.os,
            browser: deviceInfo.browser
        });
        res.redirect(result.redirectUrl);
    } catch (error) {
        next(error);
    }
};