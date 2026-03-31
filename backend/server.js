const express = require("express");
const cors = require("cors");
require("dotenv").config();

const eventsRouter = require("./routes/events");
const aiRouter = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "EventNear API is running!" });
});

app.use("/events", eventsRouter);
app.use("/ai", aiRouter);   

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});