'use strict'
const { xml2json } = require('xml-js')

// const header = require('./constants').DEFAULT_HEADER
const timeoutInMilliseconds = require('./constants').DEFAULT_TIMEOUT_IN_MS

// const header = { header }
const timeout = { timeoutInMilliseconds }

function replaceXML (data) {
  return data
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&apos;/g, "'")
}

function formatXML (xml, decodeXml = true) {
  try {
    return decodeXml ? replaceXML(xml) : xml
  } catch (error) {
    return xml
  }
}

function convertXmlToJson (xml) {
  try {
    const json = xml2json(xml, { spaces: 2, compact: true })
    return JSON.parse(json)
  } catch (error) {
    return xml
  }
}

function requiredParam (functionWithoutParam, requiredParameter, requiredParameterName, desirableType = 'string') {
  const requiredParamError = new Error(
    `Parameter '${requiredParameterName}' is missing at function '${
      functionWithoutParam.name
    }(..)'.
      Must be type ${desirableType}. Received ${requiredParameter}.
      Fill the required parameter.`
  )
  Error.captureStackTrace(requiredParamError, functionWithoutParam)
  throw requiredParamError
}

module.exports = {
  // header,
  convertXmlToJson,
  formatXML,
  requiredParam,
  timeout
}
