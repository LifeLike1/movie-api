import express from "express";
import { Routes } from "@/lib/routes";
import PersonRoutes from "@/routes/person.route";
import { errorHandler } from "@/middlewares/errorHandler.middleware";

const app = express();
const PORT = process.env.BACKEND_PORT;

//config
app.use(express.json());

// routes
app.use(Routes.PEOPLE, PersonRoutes.getRoutes());

// error handler
app.use(errorHandler);

app.listen(PORT || 3005, () => {
  console.log(`Server started on port ${PORT || 3005}`);
});
