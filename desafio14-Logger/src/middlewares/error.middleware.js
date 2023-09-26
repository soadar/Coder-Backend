import { HttpResponse } from "../utils/http.response.js";
import log from "../utils/logger.js";
const http = new HttpResponse();

export const errorMiddleware = (error, req, res, next) => {
    log.fatal(error.stack);
    return http.ServerError(res, 'Internal Server Error')
}