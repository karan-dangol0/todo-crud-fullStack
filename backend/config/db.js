import mongoose from "mongoose";

const ConnectToDb = async () => {
  if (!process.env.MONGO_URI) {
    console.log("Mongo uri is missing in env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected!");

    mongoose.connection.on("connected", () => {
      console.log("MongoDb connection is open");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Mongodb connection error", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected");
    });

    process.on("SIGABRT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.log("Error connecting to MongoDb: ", error);
    process.exit(1);
  }
};

export default ConnectToDb;
