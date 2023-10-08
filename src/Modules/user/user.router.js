import { Router } from "express";
const router = Router();
import * as userController from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import {validation} from '../../middleware/validation.js'
import * as userVaildators from "./user.vaildation.js";
import { endpoint } from "./user.endpoint.js";

router.post("/signup/", validation(userVaildators.signUp), userController.signUp);
router.post("/confirmemail/", validation(userVaildators.confirm), userController.confirmEmail);
// // router.get("/confirmemail/:token", userController.confirmEmail);
// // router.get("/confirmemail/resend/:token", userController.confirmEmailResend);
// // router.get("/unsubscribe/:token", userController.sendunsubscribeEmail);
// // router.get("/confirmunsubscribe/:token", userController.unsubscribeEmail);

router.post("/login",validation(userVaildators.logIn),userController.logIn);
router.get("/profile", auth(endpoint.get), userController.getLogginUserProfile);
router.get("/profile/:userId",validation(userVaildators.getUserById),userController.getUserProfileById);
router.post("/changepassword",auth(endpoint.changepassword),validation(userVaildators.changeUserPassword),userController.changeUserPassword);
router.post("/forgetpassword",validation(userVaildators.sendResetOTPPassword),userController.sendResetOTPPassword);
router.post("/resetpassword",validation(userVaildators.resetPasswordByOTP),userController.resetPasswordByOTP);
router.put("/update", auth(endpoint.update) ,validation(userVaildators.updateUser), userController.updateUser);

router.post("/logout",auth(endpoint.logout) , userController.logOut);

// // router.delete("/delete", auth , userController.deleteUser);
router.patch("/softdelete", auth(endpoint.softDelete) , userController.softDelete);

export default router;


