import { roles } from "../../middleware/auth.js";

export const endpoint = {
    get:[roles.user],
    update:[roles.user],
    get:[roles.user],
    logout:[roles.user],
    changepassword:[roles.user],
    softDelete:[roles.user]
}