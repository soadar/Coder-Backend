import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

export const errorMiddleware = (error, req, res, next) => {
    console.log(error.stack);
    return http.ServerError(res, 'Internal Server Error')
}