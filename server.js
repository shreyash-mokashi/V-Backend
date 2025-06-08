const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

// CORS config
app.use(cors({
  origin: [
    'https://your-vercel-app-url.vercel.app', // replace this with your Vercel frontend URL
    'http://localhost:3000'                   // allow local React dev
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/admin", require("./routes/admin"));
app.use("/uploads", express.static("uploads")); // image serving is correct here
app.use("/api/upload", require("./routes/upload"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
