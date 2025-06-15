// lib/validation.ts
import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  description: z.string().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  avatarUrl: z.string().url().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
