
import { z } from "zod";

export const singupSchema = z.object({
        username: z.string().min(1, { message: "username is required." }),
        email: z.string().email({ message: "email is required." }),
        password: z.string().min(5, { message: "password must be 6 character." }),
        name: z.string().min(1, { message: "name is required." }),
});