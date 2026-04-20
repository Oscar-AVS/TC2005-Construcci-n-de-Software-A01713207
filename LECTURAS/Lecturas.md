Apartado para las Lecturas de la clase de construcción de Software y Toma de decisiones 

Para Lectura: Consultas en SQL usando roles y Sub-consultas 
Era solamente un ejemplo del que se pudo hacer el siguiente resumen: 

En SQL, a veces es necesario usar la misma tabla más de una vez dentro de una consulta, en especial cuando se necesita comparar datos de la misma tabla o cuando esa tabla cumple distintos “roles”. EL ejemplo de la lectura existe una tabla de viajes, la tabla de ciudades se usa como origen y como destino, lo que podría generar confusión si no se distingue bien.

Para resolver esto se usan alias para las tablas. Así se puede llamar a la misma tabla de diferentes formas dentro de la misma consulta y evitar ambigüedad. También existen los sinónimos, que son nombres alternativos permanentes creados con CREATE SYNONYM. La diferencia es que los alias solo sirven dentro de la consulta, mientras que los sinónimos ya quedan definidos.

Esto también se aplica cuando una tabla se relaciona consigo misma, como en el segundo ejemplo de empleados y jefes. Aquí se usan alias para distinguir entre el empleado y su jefe, aunque ambos estén en la misma tabla.

Por otro lado, están las subconsultas, que básicamente son consultas dentro de otras consultas. Sirven para usar el resultado de una consulta como condición. Por ejemplo, encontrar productos que no se han vendido o calcular totales antes de filtrar resultados.

Las subconsultas pueden usar operadores como IN, NOT IN, EXISTS o comparaciones. En general, estas herramientas permiten hacer consultas más completas y claras cuando trabajas con datos más complejos.

