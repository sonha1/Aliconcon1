import userRouter from "./user.route.js";
export default app => {
  app.use("/api/v1/user", userRouter);
};
