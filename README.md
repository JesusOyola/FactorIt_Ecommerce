# EcommerceFactorIt

Este proyecto esta generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.
Nodejs v18.15.0

## Instalaciones necesarias
- Angular version 16.2.0.
- Nodejs v18.15.0

- Una vez clonado el repositorio ejecutar un npm install para instalar todas las dependecias necesarias para el correcto funcionamiento del proyecto.
- Una vez instaladas las dependecncias ejecutar el comando npm start, el proyecto se levantarà en localhost:4200

## Descripciòn del proyecto
El proyecto consiste en el modelado de un pequeño ecommerce. La idea es ingresar con un email y una contraseña. Los datos del ususario seràn almacenados en el local storage con demas datos relevantes para poder utilizarlos mas adelante.
Una vez registrados, la aplicacion los dirige a la lista de productos disponibles. La lista de productos son obtenidad de una API externa que utilice para otro proyecto y decidì utilizar dicha información para mostrar en mi proyecto. Cada productos se refleja en una tarjeta la cual contiene información sobre el producto (nombre, precio, imagen) y un botón para añadir el producto a un carrito.
A medida que vamos agregando productos el contador del carrito va aumentando. una vez seleccionados nuestros productos nos podemos dirigir el carrito haciendo click en el ícono del carrito, el mismo nos mostrará una pantalla con los productos agregardos. En este punto podemos agergar mas productos, eliminar productos y eliminar el carrito por completo. En el pie de la pantalla nos muestra el monto total que pagariamos por los productos. En caso de aplicarse algún descuento será informado al momento de ralizar la compra mediante on pop-up.
Ademas cuando estamos en la sección del carrito, en el navbar nos apararece un calendario para seleccionar fechas.
Hay 2 fechas especiales a tener en cuenta, el '25/12/2024' y el 7(julio) de cualquier año. En estas fechas se aplicaran descuentos especiales.
En el navbar tenermos el nombre de la tienda, el cual nos dirige hacia la lista de productos, el boton de logOut el cual no dirige nuevamente a registrarnos y el botón shopings el cual nos muestra todas las compras que hemos realizado.

## Datos a Tener en Cuenta

- La persistencia está garantizada por el local storage, es decir podemos comprar, ir a la sección de productos y comprar nuevamente, e ir a la sección de las compras realizadas. Pero se pierde la persistencia si se recarga la pagina.
- La elección de si un carrito es VIP o COMUN esta determinado por el usuario, es decir el usuario tiene la propiedad de comun o vip.
- Agregué un punto extra que me pareció interesante, todos los usuarios cuando se loguean por primera vez son comunes, es decir que van a tener los descuentos de un carrito comun, ademas se aplican los beneficios y descuentos como indicaron en el challenge. Lo que agregué extra es que un usuario comun puede para a ser VIP si al comprar menos de 4 productos gasta 1000000 pesos.
- Si se recarga la pagina se pierden algunos datos, por este motivo es recomendable que en el caso que suceda se desloguearse y volver a ingresar.


