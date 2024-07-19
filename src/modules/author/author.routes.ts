import { Router } from "express";
import AuthorHandlers from "./author.controller.js";

export const authorRouter = Router();
const authorHandlers = new AuthorHandlers();

authorRouter.route("/").get(authorHandlers.getAuthors).post(authorHandlers.createAuthor);

authorRouter.route("/:id").get(authorHandlers.getAuthor).patch(authorHandlers.updateAuthor).delete(authorHandlers.deleteAuthor);
