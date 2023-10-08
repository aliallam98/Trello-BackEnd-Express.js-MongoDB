import { roles } from "../../middleware/auth.js";

export const endpoint = {
    get:[roles.user]
}