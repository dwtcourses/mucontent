'use strict';
const db = require('../../db');
const ObjectId = require('mongodb').ObjectID;

module.exports = async (req, res, callback) => {
  try {
    const collection = db.get().collection(`contents${req.routeInformations.md5Host}`);
    let projection = {};
    // Get user role, if userId exists
    if (req.session && req.session.userId) {
      const users = db.get().collection(`users${req.routeInformations.md5Host}`);
      const user = await users.findOne({ _id: req.session.userId });
      if (user.role !== 'admin') {
        projection = req.routeInformations.projection;
      }
    }
    const o_id = new ObjectId(req.params.id);
    const docs = await collection.findOne({ _id: o_id }, {});
    callback(null, docs);
  } catch (e) {
    callback(e);
  }
};
