require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MONGO = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.usdlv.mongodb.net/mern?retryWrites=true&w=majority`;
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server start at PORT ${PORT}`);
});
