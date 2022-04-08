import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona");
// mongoose.connect("mongodb://localhost/amazona", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
/* eslint-disable */
const PORT = process.env.PORT || 3001;
/* eslint-enable */

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/public/index.html"))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });
//const httpServer = http.Server(app);

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});
// httpServer.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });
app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}.`);
});
