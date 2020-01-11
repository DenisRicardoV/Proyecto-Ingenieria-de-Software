'use strict'

const jwt = require('jsonwebtoken')

function sign (payload, secret) {
  payload.permissions = crearPermisos(payload);
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

function verify (token, secret, callback) {
  jwt.verify(token, secret, callback)
}

function crearPermisos(payload){
  var permissions=[];
  if(payload.roles.agency){
    permissions.push("agencia");
  }
  if(payload.roles.tourist){
    permissions.push("turista");
  }

  return permissions;
}

module.exports = {
  sign,
  verify
}
