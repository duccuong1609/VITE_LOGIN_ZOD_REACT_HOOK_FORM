import * as z from "zod";

const passwordValidation = z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(30, { message: "Password must be at most 30 characters long" })
        // .regex(
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //     "Password must contain at least one letter, one number, and one special character"
        // )
;

export default passwordValidation