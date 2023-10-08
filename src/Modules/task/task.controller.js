// import userModel from "../../../DB/models/User.model.js";
// import { asyncHandler } from "../../utils/error.handlier.js";
// import taskModel from "../../../DB/models/Task.model.js";


// // 7-get all tasks that not done after deadline
// export const getTasksAfterDeadline = asyncHandler(async (req, res, next) => {

//   const checkAfterDeadline = new Date("2023-08-01"); // check after deadline date
//   const tasks = await taskModel.find({
//     deadline: { $lt: checkAfterDeadline },
//     status: ["ToDo", "Doing"],
//   });

//   // console.log(new Date("2023-07-31"));

//   if (!tasks[0]) {
//     return next(new Error("There are not tasks", {cause:200}));
//   }
//   return res.status(200).json({ message: "Done", tasks });
// });
