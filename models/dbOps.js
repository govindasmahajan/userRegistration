const dbOps = {};
const userModel = require('./user')
dbOps.findOne = async (params, model) => {
    try {
        let resp = await model.findOne({ email: params.email });
        return Promise.resolve(resp);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

module.exports = { dbOps }