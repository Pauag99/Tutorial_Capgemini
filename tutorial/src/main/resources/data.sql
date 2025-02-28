
-- Categorías de juegos
INSERT INTO category(name) VALUES ('Eurogames');
INSERT INTO category(name) VALUES ('Ameritrash');
INSERT INTO category(name) VALUES ('Familiar');
INSERT INTO category(name) VALUES ('Abstracto');
INSERT INTO category(name) VALUES ('Temático');
INSERT INTO category(name) VALUES ('Party');

-- Autores
INSERT INTO author(name, nationality) VALUES ('Alan R. Moon', 'US');
INSERT INTO author(name, nationality) VALUES ('Vital Lacerda', 'PT');
INSERT INTO author(name, nationality) VALUES ('Simone Luciani', 'IT');
INSERT INTO author(name, nationality) VALUES ('Perepau Llistosella', 'ES');
INSERT INTO author(name, nationality) VALUES ('Michael Kiesling', 'DE');
INSERT INTO author(name, nationality) VALUES ('Phil Walker-Harding', 'US');
INSERT INTO author(name, nationality) VALUES ('Reiner Knizia', 'DE');
INSERT INTO author(name, nationality) VALUES ('Uwe Rosenberg', 'DE');
INSERT INTO author(name, nationality) VALUES ('Elizabeth Hargrave', 'US');

-- Juegos
INSERT INTO game(title, age, category_id, author_id) VALUES ('On Mars', '14', 1, 2);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Aventureros al tren', '8', 3, 1);
INSERT INTO game(title, age, category_id, author_id) VALUES ('1920: Wall Street', '12', 1, 4);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Barrage', '14', 1, 3);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Los viajes de Marco Polo', '12', 1, 3);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Azul', '8', 3, 5);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Terraforming Mars', '12', 1, 2);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Wingspan', '10', 3, 7);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Agricola', '12', 1, 6);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Azul: Pabellón de verano', '8', 3, 5);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Catan', '10', 2, 8);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Carcassonne', '8', 2, 8);

-- Clientes
INSERT INTO client(name) VALUES ('Pau Aguilar');
INSERT INTO client(name) VALUES ('Antonio Jose');
INSERT INTO client(name) VALUES ('Ximo Cabanes');
INSERT INTO client(name) VALUES ('Laura Martinez');
INSERT INTO client(name) VALUES ('Carlos Ruiz');
INSERT INTO client(name) VALUES ('Marta Lopez');

-- Prestamos
INSERT INTO prestamo(gamename, clientname, fechaprestamo, fechadevolucion) VALUES ('On Mars', 'Pau Aguilar', '2025-02-01', '2025-02-15');
INSERT INTO prestamo(gamename, clientname, fechaprestamo, fechadevolucion) VALUES ('Aventureros al tren', 'Antonio Jose', '2025-02-05', '2025-02-20');
INSERT INTO prestamo(gamename, clientname, fechaprestamo, fechadevolucion) VALUES ('Azul', 'Ximo Cabanes', '2025-02-10', '2025-02-25');
INSERT INTO prestamo(gamename, clientname, fechaprestamo, fechadevolucion) VALUES ('Terraforming Mars', 'Laura Martinez', '2025-02-12', '2025-02-26');
INSERT INTO prestamo(gamename, clientname, fechaprestamo, fechadevolucion) VALUES ('Wingspan', 'Carlos Ruiz', '2025-02-15', '2025-03-01');
INSERT INTO prestamo(gamename, clientname, fechaprestamo, fechadevolucion) VALUES ('Agricola', 'Marta Lopez', '2025-02-18', '2025-03-04');

