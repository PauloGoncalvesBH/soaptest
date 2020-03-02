const fs = require('fs')
const { describe, it } = require('mocha')

const post = require('../index')
const { expect } = require('../index').chai

const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php'
const urlFail = 'https://graphical.weather.gov:80/xml/SOAP_server/ndfdXMLserver.php'
const headers = {
  'user-agent': 'easy-soap-request-test',
  'Content-Type': 'text/xml;charset=UTF-8',
  SOAPAction: 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode'
}
const xml = fs.readFileSync('test/zip-code-envelope.xml', 'utf-8')
const xmlFail = fs.readFileSync('test/zip-code-envelope-fail.xml', 'utf-8')

describe('Test Longitude/Latitude SOAP Request', () => {
  const coordinates = '32.9612,-96.8372'

  it.only(`Zip Code 75001 should return ${coordinates}`, async () => {
    const response = await post({ url, headers, xml })
    console.log(response)

    // expect(response["statusCode"]).to.be.equal(200)
    // expect(response["body"]["xml"]).to.include(coordinates)
  })

  it('Should catch Promise Rejection', async () => {
    const { response } = await post({ url, headers, xml: xmlFail })
    const { statusCode } = response
    expect(statusCode).to.be.equal(500)
    expect(statusCode).to.not.be.equal(200)
  })

  it('Should catch connection error Promise Rejection', async () => {
    const { response } = await post({
      url: urlFail,
      headers,
      xml: xmlFail,
      timeout: 1000
    })
    // console.log(response)

    // const { statusCode } = response
    expect(response).to.be(undefined)
    // expect(statusCode).to.not.equal(200)
  })
})
