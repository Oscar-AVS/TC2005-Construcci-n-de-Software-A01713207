

**Alexander Vilchis - A01713207 - Lab 21**

**Consulta 1**
SELECT SUM(cantidad) AS 'Total de Unidades', SUM(cantidad * (precio + impuesto)) AS 'Importe Total' FROM materiales AS M INNER JOIN entregan AS E ON M.Clave = E.Clave WHERE fecha BETWEEN '1997-01-01' AND '1997-12-31';

**Consulta 2**
SELECT clave, descripcion FROM materiales WHERE clave NOT IN(SELECT clave FROM entregan);

**Consulta 3**
SELECT M.clave, M.descripcion, SUM(E.cantidad) AS 'Cantidad Total', MIN(E.cantidad) AS 'Cantidad Minima', MAX(E.cantidad) AS 'Cantidad Maxima', SUM(E.cantidad * M.precio * (1 + M.porcentajeImpuesto / 100)) AS 'Importe Total' FROM Entregan E INNER JOIN Materiales M ON E.clave = M.clave GROUP BY M.clave, M.descripcion HAVING AVG(E.cantidad) > 400;

**Consulta 4**
SELECT P.RazonSocial, M.Clave, M.Descripcion, AVG(E.Cantidad) AS 'Promedio Entregado' FROM Entregan E INNER JOIN Proveedores P ON E.RFC = P.RFC INNER JOIN Materiales M ON E.Clave = M.Clave GROUP BY P.RFC, P.RazonSocial, M.Clave, M.Descripcion HAVING AVG(E.Cantidad) >= 500;

**Consulta 5**
select p.razonsocial, m.clave, m.descripcion, avg(e.cantidad) as 'promedio entregado' from entregan e inner join proveedores p on e.rfc = p.rfc inner join materiales m on e.clave = m.clave group by p.rfc, p.razonsocial, m.clave, m.descripcion having avg(e.cantidad) < 370 or avg(e.cantidad) > 450;

**Consulta 6**
select clave, descripcion from materiales where clave not in (select clave from entregan);

**Consulta 7**
select p.razonsocial from proveedores p where p.rfc in (select e.rfc from entregan e inner join proyectos pr on e.numero = pr.numero where pr.denominacion = 'Vamos México') and p.rfc in (select e.rfc from entregan e inner join proyectos pr on e.numero = pr.numero where pr.denominacion = 'Querétaro Limpio');

**Consulta 8**
select descripcion from materiales where clave not in (select e.clave from entregan e inner join proyectos pr on e.numero = pr.numero where pr.denominacion = 'CIT Yucatán');

**Consulta 9**
select p.razonsocial, avg(e.cantidad) as 'promedio entregado' from entregan e inner join proveedores p on e.rfc = p.rfc group by p.rfc, p.razonsocial having avg(e.cantidad) > (select avg(cantidad) from entregan where rfc = 'VAGO780901');

**Consulta 10**
select p.razonsocial, m.clave, m.descripcion, avg(e.cantidad) as 'promedio entregado' from proveedores p, entregan e, materiales m where p.rfc = e.rfc and e.clave = m.clave group by p.rfc, p.razonsocial, m.clave, m.descripcion having avg(e.cantidad) < 370 or avg(e.cantidad) > 450;
