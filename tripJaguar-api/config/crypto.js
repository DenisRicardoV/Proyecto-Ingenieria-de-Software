'use strict'

const CryptoJS = require('crypto-js')
const clave = 'TripJaguar2018IngenieriaWEB1'

const services = {
    encrypt,
    desencrypt
}

module.exports = services;


//functions
function encrypt (textToConvert) {
    return CryptoJS.AES.encrypt(textToConvert.trim(), clave.trim()).toString()
}

function desencrypt (textToConvert) {
    return CryptoJS.AES.decrypt(textToConvert.trim(), clave.trim()).toString(CryptoJS.enc.Utf8)
}