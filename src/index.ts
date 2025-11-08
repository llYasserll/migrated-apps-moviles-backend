import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
