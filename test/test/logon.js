const { post, chai } = require('../../index');

const fs = require('fs');

const  baseUrl = require('../conf')
const lerxml = require('../xmls/lerxml.js')

describe('Teste de Login', () => {
  
  let xml = lerxml('logon')
  const url = `${baseUrl}/services/ServicoMP`;
  const headers = {
    // 'User-Agent': 'soaptest',
    'Content-Type': 'text/xml;charset=UTF-8'
  };

  it.only('Login com sucesso', () => {
    xml = xml.replace('USUARIO', 'MPSC')
    post({ url, headers,  xml }).then((data)=> {
      // const bodyJson = data.response.body.json
      // chai.expect(bodyJson).to.include('"type":"text","text":"true"')
      // let a = JSON.parse(data.response.body.json)
      // a = a.elements
      // let a = data.response.body
      fs.writeFileSync('jsonResponse.json', data.response.data)
      console.log(data.request)
    });
    
    // const {  body, statusCode } = response;
    // expect(corpoDaRespostaJson).to.include("true")
    // expect(statusCode).to.be.equal(200);
  });


});
