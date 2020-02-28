const { post, chai } = require('../../index');

const fs = require('fs');

const  baseUrl = require('../conf')
const lerxml = require('../xmls/lerxml.js')

describe('Teste de Login', () => {
  
  let xmlLogon = lerxml('logon')
  let xmlDadosProcesso = lerxml('dadosProcesso')
  const url = `${baseUrl}/services/ServicoMP`;
  let headers = {
    'Content-Type': 'text/xml;charset=UTF-8'
  };

  it('Login com sucesso', () => {
    xmlLogon = xmlLogon.replace('USUARIO', 'MPSC')
    post({ url, headers,  xml: xmlLogon }).then((data)=> {
      // const bodyJson = data.response.body.json
      // chai.expect(bodyJson).to.include('"type":"text","text":"true"')
      // let a = JSON.parse(data.response.body.json)
      // a = a.elements
      let a = data["response"]["body"]
      fs.writeFileSync('jsonResponse.json', a)
      console.log(a)
    });
  });

  it.only(`Obter dados de processo sem restrição`, () => {

    xmlLogon = xmlLogon.replace('USUARIO', 'MPSC')
    return post({ url, headers,  xml: xmlLogon }).then((data) => {
      
      // let replace = {
      //   'DATA_SEM_FORMATACAO': '20180921',
      //   'CPF': '01242586709',
      //   'CLIENTE': 'TJSC',
      //   'DATA_FORMATADA': '2018-09-21',
      //   'PROCESSO': '00000139020188240012' 
      // }

      xmlDadosProcesso = xmlDadosProcesso.replace('DATA_SEM_FORMATACAO', '20180921')
      xmlDadosProcesso = xmlDadosProcesso.replace('CPF', '01242586709')
      xmlDadosProcesso = xmlDadosProcesso.replace('CLIENTE', 'TJSC')
      xmlDadosProcesso = xmlDadosProcesso.replace('DATA_FORMATADA', '2018-09-21')
      xmlDadosProcesso = xmlDadosProcesso.replace('PROCESSO', '00000139020188240012')
      
      headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'cookie': data["response"]["headers"]["set-cookie"][0]
      }
      
      return post({ url, headers,  xml: xmlDadosProcesso }).then((data) => {
        const bodyXml = data["response"]["body"]["xml"]
        fs.writeFileSync('xml.xml', bodyXml)
        
        chai.expect(data["response"]["body"]["xml"]).to.include('Mensagem processada com sucesso')
      })
      
    })

  }); 

});
