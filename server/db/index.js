import { db_name } from "../constant.js";
import mongoose from "mongoose";

const connectdb = async () => {
    const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI} / ${db_name}`)
    console.log(`\nMongo db connected !! DB HOST ${connectioninstance.connection.host}`)
}
export default connectdb