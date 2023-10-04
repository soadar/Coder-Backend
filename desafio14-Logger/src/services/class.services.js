import log from "../utils/logger";

export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const items = await this.dao.getAll();
      return items;
    } catch (error) {
      log.fatal(error)
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      log.fatal(error)
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      if (!newItem) return false;
      else return newItem;
    } catch (error) {
      log.fatal(error)
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return await this.dao.update(id, obj);
    } catch (error) {
      log.fatal(error)
    }
  };

  delete = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return await this.dao.delete(id);
    } catch (error) {
      log.fatal(error)
    }
  };
}
