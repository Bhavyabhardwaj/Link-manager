import z from "zod";

export const usernameValidator = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
});

export const bioPageValidator = z.object({
    name: z.string().min(1).max(100).optional(),
    bio: z.string().max(500).optional(),
    image: z.string().url().optional(),
    theme: z.enum(['light', 'dark', 'auto']).optional().default('auto'),
    isPublic: z.boolean().optional()
});

export const bioLinkValidator = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
    url: z.string().url("Please provide a valid URL"),
    description: z.string().max(500).optional(),
    order: z.number().int().min(0).optional(),
    icon: z.string().max(10).optional()
});


export type UsernameInput = z.infer<typeof usernameValidator>;
export type BioPageInput = z.infer<typeof bioPageValidator>;
export type BioLinkInput = z.infer<typeof bioLinkValidator>;