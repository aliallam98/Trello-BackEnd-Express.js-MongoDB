import { globalErrorHandling } from "./utils/errorHandling.js";
import userRouter from "./Modules/user/user.router.js";
import boardRouter from "./Modules/board/board.router.js";
import listRouter from "./Modules/list/list.router.js";
import cardRouter from "./Modules/card/card.router.js";
import commentRouter from "./Modules/comment/comment.router.js";
import attachmentRouter from "./Modules/attachment/attachment.router.js";
import connectDB from "../DB/connection.js";

const AppInit = (app, express) => {
  app.use(express.json());

  app.get('/', (req,res)=>{
    return res.send('Home');
  })


  app.use("/user", userRouter);
  app.use("/board", boardRouter);
  app.use("/list", listRouter);
  app.use("/card", cardRouter);
  app.use("/comment", commentRouter);
  app.use("/attachment", attachmentRouter);

  app.use(globalErrorHandling);
  connectDB();
};

export default AppInit;
