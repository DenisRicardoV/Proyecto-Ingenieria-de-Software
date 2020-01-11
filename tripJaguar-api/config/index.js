'use strict'

const debug = require('debug')('platziverse:api:db')
module.exports = {
  auth: {
    secret: process.env.SECRET || 'TripJaguar2019IngenieriaDeSoftware'
  }
}
