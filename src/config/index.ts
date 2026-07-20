
import dotenv from "dotenv";

import path from "node:path";

dotenv.config({
    path: path.join(process.cwd(),".env")
})

export const config={
    port: process.env.PORT,
    connectionString: process.env.CONNECTIONSTRING,
    jwt_secret: process.env.JWT_SECRET
    
}
