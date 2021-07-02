<p align="center" style="background-color:#f0ddd8">
	<a href="http://68.183.106.112" target="_blank" rel="noopener noreferrer" >
	<img src="https://user-images.githubusercontent.com/58433889/124239825-7da67800-daf0-11eb-915d-18e56ee4c9cd.png" />
</a>
</p>
<br>
<br>
<br>


# Introducción:

## Descripción:

Este es un proyecto *desarrollado para una cliente de Medellín, Colombia*, la cual lleva un emprendimiento de joyería que comercializaba a través de sus redes sociales y se veía en necesidad de algo tener una herramienta que le permita tener más presencia en internet, que le facilite la gestión de pedidos y por sobre todo que le de un estatus profesional más alto y por tanto, mucha más seriedad. Viendo esta oportunidad, nuestro equipo que estaba en búsqueda de un proyecto de finalización para *Henry Bootcamp* se puso en contacto con esta emprendedora y luego de reuniones para pactar los requerimientos del cliente para que a su vez cumpla con los requerimientos mínimos del bootcamp, desarrollamos **Kmora e-comerce**.

<br>
<br>
<br>
<h1 align="center" style="color: #339cff">Desarrolladores</h1>
<br>

<p align="center">
	<a href="https://github.com/sbs001" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/50562395?v=4" alt="avatar"></a>
  <a href="https://github.com/jessicasaule" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/79380528?v=4" alt="avatar"></a>
  <a href="https://github.com/dfvallejosc" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/74154979?v=4" alt="avatar"></a>
	<a href="https://github.com/DimitriTriantafilo" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/77981692?v=4" alt="avatar"></a>
	<a href="https://github.com/scriptnoob12" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/58433889?v=4" alt="avatar"></a>
	<a href="https://github.com/RJurado16" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/68952790?v=4" alt="avatar"></a>
	<a href="https://github.com/jaimegalvis" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/23098246?v=4" alt="avatar"></a>
	<a href="https://github.com/gonza-fl" target="_blank" rel="noopener noreferrer" ><img width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/29445888?v=4" alt="avatar"></a>
	<a href="https://github.com/nohaynicksdisponibles" target="_blank" rel="noopener noreferrer" ><img 	width="100" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/60353353?v=4" 	alt="avatar"></a>
</p>

<br>
<br>
<br>


# Tecnologías

<h2 align="center" style="color: #339cff; font-size:30px">Front-end</h2>
<p align="center">

<img 	width="100" src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" 	alt="React Logo">
<img style="margin-left:25px; margin-right:25px"	width="100" src="https://cdn.worldvectorlogo.com/logos/redux.svg" 	alt="Redux Logo">
<img 	width="100" src="https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-512.png" 	alt="Firebase Logo">
</p>

<hr>

<h2 align="center" style="color: #52d325; font-size:30px">Back-end</h2>

<p align="center">
<img 	width="125" src="https://cdn4.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-256.png" 	alt="Node Logo">
<img style="margin-left:25px; margin-right:25px"	width="125" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-vertical.svg" 	alt="PostgreSQL Logo">
<img 	width="100" src="https://cdn.freebiesupply.com/logos/large/2x/sequelize-logo-png-transparent.png" 	alt="Sequelize Logo">
</p>

<br>
<br>
<br>
<hr>

## Instalación <span style="color: #52d325">API</span>:
Para instalar las dependencias ingrese a la carpeta **api**:
```
$ cd api
```
y ejecute el comando:
```
$ npm install
```
<br>

Deberá crear un archivo **.env** dentro de la carpeta **api**:
- bash:
```
$ touch .env
```
- powershell:
```
> ni .env
```
y dentro de este archivo definiremos nuestras variables de entorno:

```
DB_USER=<nombreUsuairoDB>
DB_NAME=<nombreDB>
DB_PORT=<puertoDB>
DB_PASSWORD=<constraseñaDB>
HOST=localhost
PORT=3001

//Como este proyecto utiliza cloudinary debe cunfigurar lo siguiente:
REACT_APP_CLOUDNAME=<suCloudname>
REACT_APP_APIKEY=<suApiKey>
REACT_APP_APISECRET=<suApiSecret>
```
<hr>

## Instalación <span style="color: #339cff"> Client </span>:
Ingresa a la carpeta **client**:
```
$ cd client
```
y ejecutar el comando:
```
$ npm install
```
<hr>

## Iniciar proyecto:

Para iniciar el servidor tanto de <span style="color: #52d325">api</span> como de <span style="color: #339cff">client</span> se ejecuta con el comando:

```
$ npm start
```

