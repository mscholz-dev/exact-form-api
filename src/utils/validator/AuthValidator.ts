import Validator from "./Validator.js";

// types
import { TSignJwt } from "../type.js";

export default class AuthValidator extends Validator {
  inspectCookieData({
    username,
    email,
    role,
  }: TSignJwt) {}
}
