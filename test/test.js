const fs = require('fs')
const { describe, it } = require('mocha')

const post = require('../index')
const { expect } = require('../index').chai

const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php'
const urlFail = 'https://graphical.weather.gov:80/xml/SOAP_server/ndfdXMLserver.php'
const xml = fs.readFileSync('test/zip-code-envelope.xml', 'utf-8')
const xmlFail = fs.readFileSync('test/zip-code-envelope-fail.xml', 'utf-8')

describe('Testes', () => {
  const coordinates = '32.9612,-96.8372'

  it('holiday web service', async () => {
    const xml = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hs="http://www.holidaywebservice.com/HolidayService_v2/">
    <soapenv:Body>
        <hs:GetHolidaysForMonth>
           <hs:year>2018</hs:year>
           <hs:countryCode>UnitedStates</hs:countryCode>
           <hs:month>11</hs:month>
        </hs:GetHolidaysForMonth>
    </soapenv:Body>
   </soapenv:Envelope>`

    const url = 'www.holidaywebservice.com/HolidayService_v2/HolidayService2.asmx'
    await post({ url, xml })
    // console.log(result)

    // expect(response["statusCode"]).to.be.equal(200)
  })

  it.only(`Zip Code 75001 should return ${coordinates}`, async () => {
    const response = await post({ url, xml })
    console.log(response)

    // expect(response["statusCode"]).to.be.equal(200)
    // expect(response["body"]["xml"]).to.include(coordinates)
  })

  it('Should catch Promise Rejection', async () => {
    const { response } = await post({ url, xml: xmlFail })
    const { statusCode } = response
    expect(statusCode).to.be.equal(500)
    expect(statusCode).to.not.be.equal(200)
  })

  it('Should catch connection error Promise Rejection', async () => {
    const { response } = await post({
      url: urlFail,
      xml: xmlFail,
      timeout: 1000
    })
    // console.log(response)

    // const { statusCode } = response
    expect(response).to.be(undefined)
    // expect(statusCode).to.not.equal(200)
  })
})
