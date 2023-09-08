import { check } from "express-validator";
import { validateResult } from "../helpers/handleValidation.js";

export const ValidationCreateUserAndLogin = [
    check("email")
    .exists()
    .notEmpty()
    .isString(),
    check("password")
    .exists()
    .notEmpty()
    .isString(),
    (req,res,next) => {validateResult(req,res,next)}

]

