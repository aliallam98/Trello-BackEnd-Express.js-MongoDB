import userModel from "../../../DB/models/User.model.js";
import CryptoJS from "crypto-js"
import { asyncHandler } from "../../utils/errorHandling.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { compare, hash } from "../../utils/HashAndCompare.js";
import { generateToken } from "../../utils/GenerateAndVerifyToken.js";
import { sendEmail } from "../../utils/email.js";
import { generatorLimitTimeOTP, generatorOTP } from "../../utils/Reuseable.js";

// signup and if this user was existing before and deleted (softdelete => keep all Data) will handle this
export const signUp = asyncHandler( async (req, res, next) => {
    //   let { firstName, lastName, email, password, phone, age } = req.body;
      //   console.log({ firstName, lastName, email, password, phone, age,gender });
    
      const isEmailExist = await userModel.findOne({ email:req.body.email });
      if(isEmailExist?.isDeleted){
        return next(new ErrorClass("Deleted and Will Build BL based On Requirments", 401));
      }
      if (isEmailExist) return next(new ErrorClass("This Email In Use", 409));

    
      req.body.password = hash({plaintext:req.body.password})
       if(req.body.phone){
        req.body.phone = CryptoJS.AES.encrypt(req.body.phone,process.env.CRYPTOKEY).toString()
       }

      const OTP = generatorOTP(6)
       req.body.OTP = OTP
      const user = await userModel.create(req.body);

      const text = `Use This OTP : ${OTP.OTPCode} To Conifrm Your Email`
      sendEmail({to:user.email, subject:"Confirm You Email",text})

 
    //   const token = jwt.sign(
    //     { id: user._id, email: user.email },
    //     process.env.EMAILSECERTKEY,
    //     { expiresIn: 60 * 5 }
    //   );
    //   const reToken = jwt.sign(
    //     { id: user._id, email: user.email },
    //     process.env.EMAILSECERTKEY
    //   );
    //   const unsubscribeToken = jwt.sign(
    //     { id: user._id, email: user.email },
    //     process.env.EMAILSECERTKEY
    //   );
    
    //   const link = `${req.protocol}://${req.headers.host}/user/confirmemail/${token}`;
    //   const relink = `${req.protocol}://${req.headers.host}/user/confirmemail/resend/${reToken}`;
      return res.status(201).json({ message: "User Created Successfully", user });
    })

//     Using Token

// export const confirmEmail = asyncHandler(async (req, res, next) => {
//   const { token } = req.params;
//   console.log(token);

//   const decoded = jwt.verify(token, process.env.EMAILSECERTKEY);
//   console.log(decoded);
//   const user = await userModel.findByIdAndUpdate(decoded.id, {
//     confirmEmail: true,
//   });
//   return user
//     ? res.status(200).json({ message: "Done" })
//     : res.status(404).send(`<a>Not Registered Account Click here to go to signup page</a>`);
// });

// export const confirmEmailResend = asyncHandler(async (req, res, next) => {
//   const { token } = req.params;
//   console.log(token);
//   const decoded = jwt.verify(token, process.env.EMAILSECERTKEY);
//   console.log(decoded);
//   const user = await userModel.findById(decoded.id);
//   if (!user) {
//     return res.status(404).send(
//       `<a>Not Registered Account Click here to go to signup page</a>`
//     );
//   }
//   if (user.confirmEmail) {
//     return res.status(400).send(`<a>Already Confirmed Click Here Go to SignIn Page</a>`);
//   }
//   const newToken = jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//     },
//     process.env.EMAILSECERTKEY,
//     { expiresIn: 60 * 5 }
//   );
//   const link = `${req.protocol}://${req.headers.host}/user/confirmemail/${newToken}`;
//   sendEmail({
//     to: user.email,
//     subject: "ConfirmEmail",
//     html: `<!DOCTYPE html>
//   <html>
//   <head>
//       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
//   <style type="text/css">
//   body{background-color: #88BDBF;margin: 0px;}
//   </style>
//   <body style="margin:0px;"> 
//   <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
//   <tr>
//   <td>
//   <table border="0" width="100%">
//   <tr>
//   <td>
//   <h1>
//       <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
//   </h1>
//   </td>
//   <td>
//   <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
//   </td>
//   </tr>
//   </table>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
//   <tr>
//   <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
//   <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <p style="padding:0px 100px;">
//   </p>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
//   </td>
//   </tr>

//   </table>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
//   <tr>
//   <td>
//   <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <div style="margin-top:20px;">
//   <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
//   <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
  
//   <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
//   <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
//   </a>
  
//   <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
//   <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
//   </a>
//   </div>
//   </td>
//   </tr>
//   </table>
//   </td>
//   </tr>
//   </table>
//   </body>
//   </html>`,
//   });
//   return res.status(200).send("Check Your Email");
// });

// export const sendunsubscribeEmail = asyncHandler(async (req, res, next) => {
//   const { token } = req.params;
//   const decoded = jwt.verify(token, process.env.EMAILSECERTKEY);

//   const user = await userModel.findById(decoded.id);
//   if(!user){
//     return res.status(404).send(`<a>Not Registered Account Click here to go to signup page</a>`);
//   }
//   const newToken = jwt.sign({id:user._id,email:user.email},process.env.EMAILSECERTKEY)
//   const link = `${req.protocol}://${req.headers.host}/user/confirmunsubscribe/${newToken}`;
//   sendEmail({
//     to: user.email,
//     subject: "Unsubscribe Email",
//     html: `<!DOCTYPE html>
//   <html>
//   <head>
//       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
//   <style type="text/css">
//   body{background-color: #88BDBF;margin: 0px;}
//   </style>
//   <body style="margin:0px;"> 
//   <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
//   <tr>
//   <td>
//   <table border="0" width="100%">
//   <tr>
//   <td>
//   <h1>
//       <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
//   </h1>
//   </td>
//   <td>
//   <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
//   </td>
//   </tr>
//   </table>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
//   <tr>
//   <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
//   <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <p style="padding:0px 100px;">
//   </p>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Delete your Account</a>
//   </td>
//   </tr>

//   </table>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
//   <tr>
//   <td>
//   <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
//   </td>
//   </tr>
//   <tr>
//   <td>
//   <div style="margin-top:20px;">
//   <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
//   <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
  
//   <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
//   <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
//   </a>
  
//   <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
//   <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
//   </a>
//   </div>
//   </td>
//   </tr>
//   </table>
//   </td>
//   </tr>
//   </table>
//   </body>
//   </html>`,
//   });
//   return res.status(200).send("Check Your Email");
// });
// export const unsubscribeEmail= asyncHandler(async(req,res,next)=>{
//   const {token} = req.params
//   const decoded = jwt.verify(token,process.env.EMAILSECERTKEY)
//   const user = await userModel.findByIdAndDelete(decoded.id)
//   return user ? res.status(200).json({message:"User Deleted"}) : resstatus(404).send("This user is not register click here to go to login page")
// })

export const confirmEmail = asyncHandler(async (req,res,next)=>{
    const {email,OTP} = req.body

    const isVaildEmail = await userModel.findOne({email})

    if(!isVaildEmail) return next(new ErrorClass("Enter vaild Email"))
    if(isVaildEmail.confirmEmail) return next(new ErrorClass("Confirmed Before Go To Login Page .."))
    if(isVaildEmail.OTP.OTPCode !== OTP) return next(new ErrorClass("In Vaild OTP "))


    isVaildEmail.confirmEmail = true
    isVaildEmail.save()
    return res.status(200).json({message:"Your Email Is Confirmed Successfully"})
} )

export const logIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    const isEmailExist = await userModel.findOne({ email });
    if (!isEmailExist) {
      return next(new ErrorClass("Email or Password is Wrong", 400));
    }
  
    const isPasswordmatch = compare({plaintext:password,hashValue:isEmailExist.password})
    if (!isPasswordmatch) {
      return next(new ErrorClass("Email or Password is Wrong", 400));
    }
    if (!isEmailExist.confirmEmail) {
      return next(new ErrorClass("Please Confirm Your Email First", 403));
    }
    if(isEmailExist.isDeleted) return next(new ErrorClass("Not Resistered Email or Deleted Account", 403));
    const payload = {
      id:isEmailExist._id,
      name : `${isEmailExist.firstName} ${isEmailExist.lastName}`,
      email
    }
    const token = generateToken({payload})
    const refteshToken = generateToken({payload,expiresIn: 60 * 60 * 24 * 7})
    isEmailExist.isLoggedIn = true
    await isEmailExist.save()
    return res.status(200).json({ message: "Done", token , refteshToken});
  })

// logout
  export const logOut = asyncHandler(async (req, res, next) => {
    req.user.isLoggedIn = false
    await req.user.save()
    return res.status(200).json({ message: "Logged Out" });
  });
  

// Get loggedIn User Profile
export const getLogginUserProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  return res.status(200).json({ message: "Done", user });
});
// Get  User  By Id
export const getUserProfileById = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  if(!user) return next(new ErrorClass("Not Found" ,404))
  return res.status(200).json({ message: "Done", user });
});


// // Changing User Password must logged in
export const changeUserPassword = asyncHandler(async (req, res, next) => {
  let { oldPassword, newPassword, ConfirmNewPassword } = req.body;
  //check if the old password matching with the exist password in DB
  const isPasswordMatch = compare({plaintext:oldPassword,hashValue:req.user.password})
  if(!isPasswordMatch) return  next(new ErrorClass("Old Password Is Wrong", 400));

  if(oldPassword == newPassword) return  next(new ErrorClass("Cannot Enter The Same Password Change it To New One", 400));

  //in case it matching => updating it to the new password
   newPassword = hash({plaintext:newPassword})
   req.user.password = newPassword
   await  req.user.save();

   // can add here feature to set isloggedin = false to make any device that loggin with this user logged out 

  return res.status(200).json({ message: "Password Updated" });
});

export const sendResetOTPPassword = asyncHandler(async(req,res,next)=>{
  const {email} = req.body
  const isVaildEmail = await userModel.findOne({email})
    if(!isVaildEmail) return new ErrorClass("Not Registered Email" ,404)
    if(isVaildEmail.OTPSentTimes == process.env.MAXOTPSENTTMES) return next(new ErrorClass("Already Sent Check Your Mail" ,401))

    const OTP = generatorLimitTimeOTP(6)
    console.log(OTP);
    isVaildEmail.OTP = OTP 
    //Or Can Use $Inc
    isVaildEmail.OTPSentTimes++
    await isVaildEmail.save()
    const text = `Use This Code To Reset Your Password : ${OTP.OTPCode} 
    This Code Only Vaild For 2 Mins`

    sendEmail({to:email,subject:"ForgetPassword",text})
  return res.status(200).json({message:"Sent Check Your Email"})
})
export const resetPasswordByOTP = asyncHandler(async(req,res,next)=>{
  let {email,OTP,newPassword,confirmPassword} = req.body
  const isVaildEmail = await userModel.findOne({email})
    if(!isVaildEmail) return next(new ErrorClass("Not Registered Email" ,404))
    if(isVaildEmail.OTP.OTPCode !== OTP ) return next(new ErrorClass("Invaild OTP" ,400))
    // console.log(isVaildEmail.OTP.expiredDate);
    // console.log(new Date());
    if(isVaildEmail.OTP.expiredDate < new Date()) return next(new ErrorClass("Expired OTP" ,400))


    newPassword = hash({plaintext:newPassword})
    isVaildEmail.password = newPassword
    //log out from any device was logging in after changed password by reset
    isVaildEmail.isLoggedIn = false
    isVaildEmail.OTPSentTimes = 0
    isVaildEmail.OTP = generatorOTP(10)
    await isVaildEmail.save()

  return res.status(200).json({message:"Password Changed"})
})


// Updaing User
export const updateUser = asyncHandler(async (req, res, next) => {
  const {firstName,lastName,age, phone } = req.body;
  const user = await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true});
  if (!user) {
    return next(new ErrorClass("This User Is not Exist",404));
  }
  return res
    .status(200)
    .json({ message: "User Info Updated Successfully", user });
});

// // Soft Delete  => instead of delete user data we keep in and make mark it as isDelete = True
// And will Handle addational logic Soon
export const softDelete = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user._id, {
    isLoggedIn: false,
    isDeleted: true,
  });
  if (!user) {
    return next(new ErrorClass("This User Is not Exist",404));
  }
  return res
    .status(200)
    .json({ message: "User Activation Turned into :SoftDelete" });
});


// // Deleting User
// export const deleteUser = asyncHandler(async (req, res, next) => {
//   const user = await userModel.findByIdAndDelete(req.user._id);
//   if (!user) {
//     return next(new Error("This User Is not Exist"), {cause:404});
//   }
//   return res.status(200).json({ message: "User Deleted Successfully" });
// });

