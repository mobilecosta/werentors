import "dotenv/config"

export const server = {
    port: parseInt(process.env.SERVER_PORT || "3000"),
    host: (process.env.SERVER_HOST || "0.0.0.0")
}
