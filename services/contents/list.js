'use strict';
const db = require('../../db');

module.exports = async (req, res, callback) => {
  try {
    const collection = db.get().collection(`${req.routeInformations.md5Host}_contents`);
    const locals = {};
    const filters = {} || req.params;
    filters.host = req.headers.host;
    let projection = {};
    // Get user role, if userId exists
    if (req.session && req.session.userId) {
      const users = db.get().collection(`${req.routeInformations.md5Host}_users`);
      const user = await users.findOne({ _id: req.session.userId });
      locals.userRole = user.role;
      if (user.role !== 'admin') {
        projection = req.routeInformations.projection;
      }
    }
    const docs = await collection.find(filters, projection).toArray();
    locals.contents = docs;
    callback(null, locals);
  } catch (e) {
    callback(e);
  }
};