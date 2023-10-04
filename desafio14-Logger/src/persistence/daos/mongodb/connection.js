import { connect } from 'mongoose';
import config from '../../../../config.js';
import log from '../../../utils/logger.js';

export const initMongoDB = async () => {
    try {
        await connect(config.MONGO_ATLAS_URL)
        log.debug('Conectado a MongoDB!');
    } catch (error) {
        log.fatal(error.message)
    }
}