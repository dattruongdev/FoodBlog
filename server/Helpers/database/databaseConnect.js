import { connect } from "mongoose";

const connectDatabase = async () => {
  try {
    await connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME });
    console.log("MongoDB Connection Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
