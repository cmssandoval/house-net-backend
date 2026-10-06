CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    imagen_url VARCHAR(255) NOT NULL,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    ubicacion VARCHAR(20) NOT NULL,
    stock INT NOT NULL DEFAULT 0 CONSTRAINT check_stock_positivo CHECK (stock >= 0)
);

INSERT INTO inventario (imagen_url, nombre, categoria, ubicacion) values ('abc', 'Orégano', 'Comida', 'Cocina');
INSERT INTO inventario (imagen_url, nombre, categoria, ubicacion) values ('abc', 'Garbanzos', 'Comida', 'Despensa');
INSERT INTO inventario (imagen_url, nombre, categoria, ubicacion) values ('abc', 'Jabón', 'Aseo', 'Baño');
INSERT INTO inventario (imagen_url, nombre, categoria, ubicacion) values ('abc', 'Detergente de ropa', 'Aseo', 'Cocina');
INSERT INTO inventario (imagen_url, nombre, categoria, ubicacion) values ('abc', 'Detergente de loza', 'Aseo', 'Cocina');

SELECT * FROM inventario;