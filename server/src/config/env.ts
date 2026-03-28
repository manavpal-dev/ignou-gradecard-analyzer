import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT || "3000",
    API_KEY: process.env.API_KEY || ""
}