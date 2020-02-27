const fs = require('fs');
const { join } = require('path')

const lerxml = nomexml => {
    const diretorio = join(__dirname, `./xml/${nomexml}.xml`)
    xmlajustado = fs.readFileSync(diretorio, 'utf-8')


    const xmlbase = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="ServicoMP">
    <soapenv:Header/>
    <soapenv:Body>
        SUBSTITUIR
    </soapenv:Body>
</soapenv:Envelope>`

    return xmlbase.replace('SUBSTITUIR', xmlajustado)
}

module.exports = lerxml