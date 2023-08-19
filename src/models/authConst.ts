export default class AuthConst {
  public static CRYPT_SALT = Number(process.env.CRYPT_SALT);
  public static JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  public static TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
  public static TOKEN_REFRESH_EXPIRE_TIME =
    process.env.TOKEN_REFRESH_EXPIRE_TIME;
}
