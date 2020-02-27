
const axios = require('axios')
const { xml2json } = require('xml-js')
const indentXml = require('xml-formatter')

const utils = require('./constants_and_utils/utils')

module.exports = function request (opts = {
  url: '',
  xml: '',
  headers: {},
  timeout: utils.timeout.timeoutInMilliseconds,
  proxy: {},
  maxContentLength: Infinity,
  extraOpts: {}
}) {
  const {
    url,
    xml,
    headers,
    timeout,
    proxy,
    maxContentLength,
    extraOpts
  } = opts
  return new Promise((resolve, reject) => {
    axios.defaults.headers.post['Content-Type'] = 'text/xml;charset=UTF-8';
    axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
      proxy,
      maxContentLength,
      ...extraOpts
    }).then((response) => {
      resolve({
        request: response.config,
        response: {
          body: {
            xml: indentXml(response.data, {indentation: '  ', collapseContent: true}),
            json: xml2json(response.data, {spaces: 2, compact: true})
          },
          headers: response.headers,
          statusCode: response.status,
          statusText: response.statusText
        }
      })
    }).catch((error) => {
      // if (error.response) {
      //   console.log(error.response.data)
      //   console.log(error.response.status)
      //   console.log(error.response.headers)
      // } else if (error.request) {
      //   console.log(error.request)
      // } else {
        console.log('Error', error.message)
      // }
      resolve(error)
    })
  })
}
