import dictionaryError from "../utils/errors.dictionary.js";

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      if (!response) return http.NotFound(res, dictionaryError.NOT_FOUND);
      return http.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      if (!response) return http.NotFound(res, dictionaryError.NOT_FOUND);
      return http.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      if (!response) return http.NotFound(res, dictionaryError.CREATE);
      return http.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      if (!response) return http.NotFound(res, dictionaryError.NOT_FOUND);
      else {
        const update = await this.service.update(id, req.body);
        return http.Ok(res, update);
      }
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      if (!response) return http.NotFound(res, dictionaryError.NOT_FOUND);
      else {
        const del = await this.service.remove(id);
        return http.Ok(res, del);
      }
    } catch (error) {
      next(error);
    }
  };
}