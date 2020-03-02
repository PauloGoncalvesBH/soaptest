'use strict'

const { convertXmlToJson, formatXML } = require('./constants_and_utils/utils')

function deleteUnnecessaryKeysFromObject (object) {
  delete object.isAxiosError
  delete object.toJSON
  return object
}

function successful (data) {
  try {
    return {
      response: {
        statusCode: data.status,
        statusText: data.statusText,
        headers: data.headers,
        body: {
          xml: formatXML(data.data),
          json: convertXmlToJson(data.data)
        }
      },
      request: data.config
    }
  } catch (er) {
    return deleteUnnecessaryKeysFromObject(data)
  }
}

function error (data) {
  try {
    return {
      response: {
        statusCode: data.response.status,
        statusText: data.response.statusText,
        headers: data.response.headers,
        body: {
          xml: formatXML(data.response.data),
          json: convertXmlToJson(data.response.data)
        }
      },
      request: data.config
    }
  } catch (er) {
    return deleteUnnecessaryKeysFromObject(data)
  }
}

module.exports = {
  error,
  successful
}
