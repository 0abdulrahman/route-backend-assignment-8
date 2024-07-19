import express from "express";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware.js";
import notFoundRoutesMiddleware from "./middlewares/notFoundRoute.middleware.js";
import { bookRouter } from "./modules/book/book.routes.js";
import { authorRouter } from "./modules/author/author.routes.js";

export const app = express();

app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.use("*", notFoundRoutesMiddleware);
app.use(errorHandlingMiddleware);
