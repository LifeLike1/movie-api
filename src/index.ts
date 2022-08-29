import express from "express";
import { Routes } from "@/lib/routes";
import PersonRoutes from "@/routes/person.route";
import { errorHandler } from "@/middlewares/errorHandler.middleware";
import PersonController from "./controllers/person.controller";
import PersonService from "./services/person.service";
import DatabaseInstance from "./lib/DatabaseInstance";
import MovieRoutes from "./routes/movie.route";
import MovieService from "./services/movie.service";
import MovieController from "./controllers/movie.controller";

const app = express();
const PORT = process.env.BACKEND_PORT;

const personRoutes = new PersonRoutes(
  express.Router(),
  new PersonController(new PersonService(DatabaseInstance.getInstance()))
);

const movieRoutes = new MovieRoutes(
  express.Router(),
  new MovieController(new MovieService(DatabaseInstance.getInstance()))
);

//config
app.use(express.json());

// routes
app.use(Routes.PEOPLE, personRoutes.getRoutes());
app.use(Routes.MOVIES, movieRoutes.getRoutes());

// error handler
app.use(errorHandler);

app.listen(PORT || 3005, () => {
  console.log(`Server started on port ${PORT || 3005}`);
});
