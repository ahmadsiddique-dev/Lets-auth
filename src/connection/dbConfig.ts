import mongoose from "mongoose";

export async function connection() {
    try {
        await mongoose.connect(process.env.MONGDB_URI || "mongodb://localhost:27017/onepie")

        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Mongodb Connected!");
        })

        connection.on("error", (err) => {
            console.log("DB Connection Error make sure it's Up and Running: " + err);
            process.exit();
        })

    } catch (error) {
        console.log("Something Went Wrong! in connecting DB");
        console.log(error)
    }
}