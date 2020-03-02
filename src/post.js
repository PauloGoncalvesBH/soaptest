
const axios = require('axios').default

const { requiredParam, timeout } = require('./constants_and_utils/utils')
const { error, successful } = require('./response')

const { timeoutInMilliseconds } = timeout

module.exports = async function post ({
  url,
  xml,
  headers = {},
  timeout = timeoutInMilliseconds,
  proxy = {},
  maxContentLength = Infinity,
  extraOpts = {}
}) {
  if (typeof url === 'undefined') { requiredParam(post, url, 'url') }
  if (typeof xml === 'undefined') { requiredParam(post, xml, 'xml', 'string or plain object') }

  axios.defaults.headers['User-Agent'] = 'SoapTest'
  axios.defaults.headers['Content-Type'] = 'text/xml'

  try {
    const response = await axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
      proxy,
      maxContentLength,
      ...extraOpts
    })
    return successful(response)
  } catch (response) {
    return error(response)
  }
}
