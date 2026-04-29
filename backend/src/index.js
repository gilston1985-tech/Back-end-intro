// 1. Indlæs dotenv ALLERFØRST
import 'dotenv/config'; 

// 2. Derefter dine andre imports
import connectDB from "./config/database.js";
import app from "./app.js";

// 3. Nu behøver du ikke at køre dotenv.config() manuelt længere, 
// da import-linjen ovenfor har gjort det.

const startServer = async () => {
    try {
        await connectDB();
        
        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port : ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("MongoDb connection failed!!", error);
    }
};

startServer();