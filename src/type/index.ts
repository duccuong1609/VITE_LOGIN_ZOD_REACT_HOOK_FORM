import type loginSchema from "@/validation/login-validation";
import type z from "zod";

export type LoginFormData = z.infer<typeof loginSchema>;