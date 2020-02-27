# SoapTest

Test SOAP request using JS

Lib JS de testes para request SOAP, permitindo manipular, realizar asserção e extrair dado da resposta

## Implementações pendentes e mapeadas

- Pode sofrer alteração conforme o desenvolvimento
- Não está em ordem de prioridade

### Necessárias para a liberação da v1.0.0

1. [ ] Ajustar retorno quando request inválida é realizada `catch(error)`
1. [ ] Criar método para `baseUrl`
2. [ ] Criar método para configurar o `xml-formatter`
3. [ ] Criar método para configurar o `xml-js`
4. [ ] Configurar default para `Content-type`
6. [ ] Configurar `setup` para o arquivo
7. [ ] Configurar `globalSetup`
8. [ ] Criar os seguintes métodos inspirados no `frisbyjs` para debug:
    1. inspectResponse
    2. inspectResponseHeaders
    3. inspectResponseBody
    4. inspectResponseStatus
    2. inspectRequest
    3. inspectRequestHeaders
    4. inspectRequestBody
    4. inspectRequestStatus
9. [ ] Documentação de uso da biblioteca em EN-US
10. [ ] Pensar em nome melhor que `SoapTest`, pois lembra `SuperTest`

### Não impeditivas para a v1.0.0
1. [ ] Criar teste (o atual é dependente de serviço de terceiro, será apagado)
1. [ ] Ajustar estrutura dos testes
10. [ ] Cobrir com teste pelo menos 50% do código 
11. [ ] Configurar integração contínua
12. [ ] Criar CONTRIBUTING.md
13. [ ] Criar template de abertura de issues `feature, bug, dúvida`
14. [ ] Criar template de pull request
1. [ ] Documentação em PT-BR
1. [ ] Artigo divulgando a lib em PT-BR e EN-US

## Credits

> Falta tudo mas não falta crédito nesse projeto :kkkkrying:

The Soaptest library was created by [Paulo Gonçalves](https://www.linkedin.com/in/paulo-goncalves/)

---
[MIT License](./LICENSE)