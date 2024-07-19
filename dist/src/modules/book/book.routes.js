import { Router } from "express";
import BookHandlers from "./book.controller.js";
export const bookRouter = Router();
const bookHandlers = new BookHandlers();
bookRouter.route("/").get(bookHandlers.getBooks).post(bookHandlers.createBook);
bookRouter.route("/:id").get(bookHandlers.getBook).patch(bookHandlers.updateBook).delete(bookHandlers.deleteBook);
//# sourceMappingURL=book.routes.js.map