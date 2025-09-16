import * as z from "zod";
import usernameValidation from "./username-validation";
import passwordValidation from "./password-validation";

const loginSchema = z.object({
    username: usernameValidation,
    password: passwordValidation,
    rememberMe: z.boolean().default(false).optional(),
});

export default loginSchema;