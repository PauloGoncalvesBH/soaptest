
const axios = require('axios').default

const { requiredParam, timeout } = require('./constants_and_utils/utils')
const { error, successful } = require('./response')

const { timeoutInMilliseconds } = timeout

module.exports = async function post ({
  url = requiredParam(post, 'url'),
  xml = requiredParam(post, 'xml'),
  headers = '',
  timeout = timeoutInMilliseconds,
  proxy = {},
  maxContentLength = Infinity,
  extraOpts = {}
}) {
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
