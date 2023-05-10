const { Router } = require("express");

const routes = Router();

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");

routes.use("/notes", notesRouter);
routes.use("/users", usersRouter);

module.exports = routes;