## 1 Creando nuestro Cognito User Pool

```
Serverless.yml:
```

- Declaramos bajo el atributo custom el nombre que van a tener nuestro pool de usuarios y nuestra aplicacion de cognito (notar que usamos el nombre del servicio y el ambiente en el cual se esta desarrollando nuestra aplicacion)

- Declaramos bajo Resources nuestro pool de usuarios en cognito, donde vamos a utilizar el email como nombre de usuario.
- Delcoaramos bajo de Resources nuestra aplicación de cognito, vinculada a nuestro pool de usuarios.

- Declaramos como variables de entorno para toda nuestra aplicacion el ID de nuestro pool de cognito, el ID de nuestra aplicación de Cognito y la region donde esta deployada nuestra aplicación (debajo de provider.environment).

> Comprobación de la creación del pool ingresando a Cognito/Manage User Pools.

> > Observar en General Settings aparece ID del pool y desde App Integration/App client settiings el ID de nuestra app de cognito.

---

## 2 Obtener informacion de Cognito a traves de una lambda

- ### Lambda cuyo trigger es un HTTP Get Request que responda la info que declaramos como variables de entorno.

```
src/services/http.js:
```

- Funcion que nos permite devolver respuestas en nuestras lambdas con mayor facilidad (json).

```
src/handlers/getInfo/index.js:
```

- fn que responde la info que declaramos como variables de entorno.

```
serverless.yml:
```

- Solamente agregamos la declaración de la nueva fn src/handlers/getInfo/index.js

> Deployar
>
> > Comprobación del enpoint GET en postman para verificación que los datos de userPoolId, userPoolClient y región sean los que observamos desde Cognito.

---

## 3 Crear flujo de SignUp

### Crear lamdas para regiistro de un usuario, con siguiente flujo:

- El usuario ingresa su nombre, email y contraseña en un endpoint que crearemos
- Dichos datos son enviados a Cognito y se crea el usuario con un estado de Unconfirmed
- Cognito le va a enviar un mail a nuestro usuario con un codigo de verificacion
- El usuario ingresara en un nuevo endpoint su email y el codigo de verificacion
- Cognito cambia el estado de nuestro usuario a Confirmed y ya esta listo para pedir tokens

#### Instalamos libreria para poder trabajar con Cognito y node-fetch para los llamados a Cognito:

```
npm install amazon-cognito-identity-js
npm install node-fetch@2
```

## 4 Loguear usuarios y segurizar endpoints

- Crear un nuevo endpoint en donde nuestro usuario pueda pedir sus tokens, brindando su email y contraseña.
- Segurizar nuestro endpoint getInfo para que solo usuarios autenticados puedan acceder a la respuesta.

#### Instalación de nuevas librerias

##### **_jwk-to-pem:_** Nos va a ayudar a convertir la info que nos da cognito sobre como estan encriptados nuestros token en el formato pem necesario para decodificar el token.

##### **_jsonwebtoken_** para decodificar nuestro token.

##### **_request_**: Para realizar un Get HTTP a Cognito, y pedirle informacion sobre el tipo de encriptacion que tienen nuestros tokens

```
npm install jwk-to-pem jsonwebtoken request

```
