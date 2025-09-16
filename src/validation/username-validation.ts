import * as z from "zod"

const usernameValidation = z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(30, { message: "Username must be at most 30 characters long" })

export default usernameValidation