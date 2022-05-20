import { Router } from "express";
import enqueteRouter from "./enquete.route";

const routes = Router();

routes.use("/enquete", enqueteRouter);

export default routes;
