'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.status);
  if(err.message.toLowerCase().includes('validation failed')) {
    return res.sendStatus(400);
  }

  if(err.message.toLowerCase().includes('objectid failed')) {
    return res.sendStatus(404);
  }

  if(err.message.indexOf('duplicate key') > -1) {
    return res.sendStatus(409);
  }

  res.sendStatus(500);
};
