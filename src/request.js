
const axios = require('axios').default
const { xml2json } = require('xml-js')

const utils = require('./constants_and_utils/utils')

module.exports = function request (opts = {
  url: '',
  xml: '',
  timeout: utils.timeout.timeoutInMilliseconds,
  proxy: {},
  maxContentLength: Infinity,
  extraOpts: {}
}) {
  const {
    url,
    xml,
    timeout,
    proxy,
    maxContentLength,
    extraOpts
  } = opts
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers: '',
      data: xml,
      timeout,
      proxy,
      maxContentLength,
      ...extraOpts
    }).then((response) => {
      resolve({
        response: {
          body: response.data,
          headers: response.headers,
          statusCode: response.status,
          json: {
            body: xml2json(response.data),
            headers: xml2json(response.headers)
          }
        },
        request: {
          config: response.config,
          request: response.request
        }
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      // reject(error)
    })
  })
}
