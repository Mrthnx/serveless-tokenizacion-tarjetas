# Serverless-challenge
## Instalaciones necesarias 
`sudo apt install aws-sdk`  
`sudo apt install serverless`   
`npm install serverless-offline -g`

---
## Configurar variables de entorno para AWS
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

---
## Configurar variables de entorno para la BD
`export REDIS_HOST=127.0.0.1 `    
`export REDIS_PORT=6379  `  
`export PRIVATE_KEY=my_private_key  `  

---
## Levantar proyecto offline 
`npm run invoke:offline`

---
## Test 
`npm run test`

---
## Deployar 
`npm run deploy`

---
## API 
*todo peticion debe tener el header x-private-key con el valor asignado anteriormente*
### URL Obtener data de token
`GET token/{tokenId}`
*Response*
```json
{
	"email": "my_email@gmail.com",
	"card_number": 111111111111111,
	"expiration_month": "6",
	"expiration_year": "2023"
}
```
### URL Crear data de token
`POST /token  `  
*todos los campos son requeridos*
#### Parámetros de solicitud
```json
{
	"email": "my_email@gmail.com",
	"card_number": 111111111111111,
	"cvv": 123,
	"expiration_month": "6",
	"expiration_year": "2023"
}
```
