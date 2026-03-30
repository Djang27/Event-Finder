const express = require("express");
const cors = require("cors");
require("dotenv").config();

const eventsRouter = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "EventNear API is running!" });
});

app.use("/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});