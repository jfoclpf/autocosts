/* server side script that handles with the POST request made by the client/browser
regarding the Google reCapactha v2 https://developers.google.com/recaptcha/docs/display */

/* jslint node: true */

'use strict'

const apiRequestUrl = 'https://www.google.com/recaptcha/api/siteverify'

const request = require('request')
const debug = require('debug')('app:captchaValidate')

module.exports = function (req, res, serverData) {
  debug('starting captchaValidate...')

  // to measure time of response
  const startTime = process.hrtime()

  const captchaResponse = req.body['g-recaptcha-response']
  if (!captchaResponse) {
    res.send('not-ok-1')
    return
  }

  // get IP from user
  const ip = req.headers['x-forwarded-for'].split(',').pop() ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress
  debug('ip is ' + ip)

  const secretKey = serverData.settings.googleCaptcha.secretKey

  // loads the Google info with corresponding response
  // @ forces the ignoring of warnings in case the info is not loaded
  const apiRequestCompleteUrl =
    `${apiRequestUrl}?secret=${secretKey}&response=${captchaResponse}&remoteip=${ip}`
  debug('full url for the request: ' + apiRequestCompleteUrl)

  // HTTP Header request
  const options = {
    url: apiRequestCompleteUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  request(options, function (error, response, body) {
    const endTime = process.hrtime(startTime)
    debug(`Time to response: ${endTime[0]}s`)

    if (!error && response.statusCode === 200) {
      const responseKeys = JSON.parse(body)
      if (Number(responseKeys.success) !== 1) {
        debug('Google captcha NOT ok')
        res.send('not-ok-2')
      } else {
        debug('Google captcha response ok')
        res.send('ok')
      }
    } else {
      debug('error making the Recaptach request to Google: ', error)
      res.send('not-ok-3')
    }
  })
}
