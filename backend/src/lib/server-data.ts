import "dotenv/config"

export const server = {
    port: parseInt(process.env.SERVER_PORT || "3000"),
    host: (process.env.SERVER_HOST || "0.0.0.0")
}

export const saltRounds = parseInt(process.env.PASSWORD_SALT_VALUE || "10");

export const secretKey = process.env.JWT_SECRET_KEY || ""
