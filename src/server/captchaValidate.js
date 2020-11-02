/* server side script that handles with the POST request made by the client/browser
regarding the Google reCapactha v2 https://developers.google.com/recaptcha/docs/display */

const request = require('request')
const debug = require('debug')('app:captchaValidate')

module.exports = function (req, res, serverData) {
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

  const secretKey = serverData.settings.googleCaptcha.secretKey

  // loads the Google info with corresponding response
  // @ forces the ignoring of warnings in case the info is not loaded
  const ApiUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' +
        secretKey + '&response=' + captchaResponse + '&remoteip=' + ip

  // HTTP Header request
  const options = {
    url: ApiUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const responseKeys = JSON.parse(body)
      if (Number(responseKeys.success) !== 1) {
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
