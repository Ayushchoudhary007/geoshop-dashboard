import { z } from "zod";

export const userInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
