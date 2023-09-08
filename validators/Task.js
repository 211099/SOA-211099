import { check } from "express-validator";
import { validateResult } from "../helpers/handleValidation.js";

export const validationCreateTask = [
    check("title")
    .exists()
    .notEmpty()
    .isString(),
    check("description")
    .exists()
    .notEmpty()
    .isString(),
    (req,res,next) => {validateResult(req,res,next)}
]
