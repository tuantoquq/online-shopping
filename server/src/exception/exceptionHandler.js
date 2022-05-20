import { apiStatus, httpStatus } from "../constants/index.js";

export const methodNotAllowed = (req, res) => {
    res.status(httpStatus.METHOD_NOT_ALLOWED).send({
        status: apiStatus.OTHER_ERROR,
        message: "Method not allowed!"
    }) 
};