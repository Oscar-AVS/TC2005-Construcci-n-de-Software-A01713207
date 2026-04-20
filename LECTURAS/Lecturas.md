# Apartado para las Lecturas de la clase de construcción de Software y Toma de decisiones 

Para Lectura: Consultas en SQL usando roles y Sub-consultas 
Era solamente un ejemplo del que se pudo hacer el siguiente resumen: 

En SQL, a veces es necesario usar la misma tabla más de una vez dentro de una consulta, en especial cuando se necesita comparar datos de la misma tabla o cuando esa tabla cumple distintos “roles”. EL ejemplo de la lectura existe una tabla de viajes, la tabla de ciudades se usa como origen y como destino, lo que podría generar confusión si no se distingue bien.

Para resolver esto se usan alias para las tablas. Así se puede llamar a la misma tabla de diferentes formas dentro de la misma consulta y evitar ambigüedad. También existen los sinónimos, que son nombres alternativos permanentes creados con CREATE SYNONYM. La diferencia es que los alias solo sirven dentro de la consulta, mientras que los sinónimos ya quedan definidos.

Esto también se aplica cuando una tabla se relaciona consigo misma, como en el segundo ejemplo de empleados y jefes. Aquí se usan alias para distinguir entre el empleado y su jefe, aunque ambos estén en la misma tabla.

Por otro lado, están las subconsultas, que básicamente son consultas dentro de otras consultas. Sirven para usar el resultado de una consulta como condición. Por ejemplo, encontrar productos que no se han vendido o calcular totales antes de filtrar resultados.

Las subconsultas pueden usar operadores como IN, NOT IN, EXISTS o comparaciones. En general, estas herramientas permiten hacer consultas más completas y claras cuando trabajas con datos más complejos.



Para la Lectura SQL y álgebra Relacional
Puesto que eran más que nada más eran conceptos aplicados a ejemplos se tiene el siguiente resumen: 


SQL es el lenguaje que usan las bases de datos para hacer consultas y trabajar con la información, tiene una estrecha relación algebra relacional ya que todo lo que se puede hacer con álgebra también se puede hacer en SQL . Una consulta básica siempre tiene SELECT, FROM y WHERE, donde eliges qué columnas quieres ver, de qué tablas vienen y bajo qué condiciones. Estas partes corresponden a ideas del álgebra como la selección (filtrar datos) y la proyección (elegir columnas). También se pueden combinar tablas usando joins, o hacer operaciones como unión, intersección o diferencia, aunque algunas como INTERSECT o MINUS dependen del sistema que estés usando . Otro concepto importante es el producto cartesiano, que mezcla todas las filas de dos tablas. Además, muchas veces no interesa ver todos los datos, sino un resumen, y ahí entran las funciones agregadas como SUM, AVG, MIN, MAX y COUNT, que permiten sacar totales, promedios o conteos . Para organizar estos resultados se usa GROUP BY, que agrupa datos por ciertas columnas, por ejemplo ventas por producto o por fecha, y si quieres filtrar esos resultados ya agrupados se usa HAVING en lugar de WHERE

