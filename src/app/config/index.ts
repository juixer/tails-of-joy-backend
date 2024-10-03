import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRES_IN,
};
