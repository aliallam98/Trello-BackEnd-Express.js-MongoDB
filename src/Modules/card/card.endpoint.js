import { roles } from "../../middleware/auth.js";

export const endpoint = {
    get:[roles.user],
    create:[roles.user],
    update:[roles.user],
    delete:[roles.user]
}