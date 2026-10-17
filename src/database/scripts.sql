--! ==================================================================== --
--! TOTAL CLEANUP
--! ==================================================================== --
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS location;
--! ==================================================================== --
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_role;
--! ==================================================================== --
--! TOTAL CLEANUP
--! ==================================================================== --

--* ==================================================================== --
--* CATEGORY AND LOCATION TABLE CREATION
--* ==================================================================== --
CREATE TABLE category (
    id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE location (
    id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

--* ==================================================================== --
--* INVENTORY TABLE CREATION
--* ==================================================================== --
CREATE TABLE inventory (
    id           INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name TEXT NOT NULL CHECK (length(trim(product_name)) > 0),
    image_url    TEXT,
    category_id  INT NOT NULL REFERENCES category(id)  ON DELETE RESTRICT,
    location_id  INT NOT NULL REFERENCES location(id)  ON DELETE RESTRICT,
    stock        INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    min_stock    INT NOT NULL DEFAULT 0 CHECK (min_stock >= 0),
    unit         TEXT NOT NULL DEFAULT 'unidad',
    notes        TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

--* ==================================================================== --
--* INDEX CREATION
--* ==================================================================== --
CREATE UNIQUE INDEX inventory_name_loc_uq
    ON inventory (lower(product_name), location_id);
CREATE INDEX inventory_category_idx ON inventory (category_id);
CREATE INDEX inventory_location_idx ON inventory (location_id);

--* ==================================================================== --
--* TRIGGER CREATION FOR AUTOMATIC UPDATE
--* ==================================================================== --
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventory_set_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
--* ==================================================================== --


--? ==================================================================== --
--? CATEGORY DATA INSERTION
--? ==================================================================== --
INSERT INTO category ( name ) VALUES ('Aseo');
INSERT INTO category ( name ) VALUES ('Comida');

--? ==================================================================== --
--? LOCATION DATA INSERTION
--? ==================================================================== --
INSERT INTO location ( name ) VALUES ('Cocina');
INSERT INTO location ( name ) VALUES ('Despensa');
INSERT INTO location ( name ) VALUES ('Baño');


--? ==================================================================== --
--? INVENTORY DATA INSERTION
--? ==================================================================== --
INSERT INTO inventory ( product_name, category_id, location_id, stock, unit ) VALUES
    ('Pasta de dientes', 1, 2, 1, 'Caja');
INSERT INTO inventory ( product_name, category_id, location_id, stock, unit ) VALUES
    ('Azúcar', 2, 1, 2, 'Bolsa');
INSERT INTO inventory ( product_name, category_id, location_id, stock, unit ) VALUES
    ('Té negro', 2, 1, 1, 'Caja');
--? ==================================================================== --


--* ==================================================================== --
--* CITEXT EXTENSION CREATION
--* ==================================================================== --
CREATE EXTENSION IF NOT EXISTS citext;

--* ==================================================================== --
--* USER ROLE TYPE ENUM CREATION
--* ==================================================================== --
CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');

--* ==================================================================== --
--* USERS TABLE CREATION
--* ==================================================================== --
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL
        CONSTRAINT users_full_name_length CHECK (char_length(btrim(full_name)) BETWEEN 1 AND 50)
        CONSTRAINT users_full_name_trimmed CHECK (full_name = btrim(full_name))
        CONSTRAINT users_full_name_chars CHECK (full_name !~ '[[:cntrl:]]'),

    display_name TEXT NOT NULL
        CONSTRAINT users_display_name_length CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 50)
        CONSTRAINT users_display_name_trimmed CHECK (display_name = btrim(display_name))
        CONSTRAINT users_display_name_chars CHECK (display_name !~ '[[:cntrl:]]'),

    email CITEXT NOT NULL UNIQUE
        CONSTRAINT users_email_length CHECK (char_length(email) BETWEEN 6 AND 254)
        CONSTRAINT users_email_format CHECK (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),

    password_hash TEXT NOT NULL
        CONSTRAINT users_pwhash_length CHECK (char_length(password_hash) BETWEEN 20 AND 255),

    role user_role NOT NULL DEFAULT 'user',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

--* ==================================================================== --
--* TRIGGER FUNCTION CREATION FOR AUTOMATIC UPDATE
--* ==================================================================== --
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--? ==================================================================== --
--? USER DATA INSERTION
--? ==================================================================== --
INSERT INTO users ( full_name, display_name, email, password_hash, role ) VALUES
    ('Usuario Apellido 1', 'nickname-usuario-1', 'usuario1@usuario.random', 'hashsupersecreto12461298741298491', 'admin');
INSERT INTO users ( full_name, display_name, email, password_hash, role ) VALUES
    ('Usuario Apellido 2', 'nickname-usuario-2', 'usuario2@usuario.random', 'hashsupersecreto83257839275982353', 'user');
INSERT INTO users ( full_name, display_name, email, password_hash, role ) VALUES
    ('Usuario Apellido 3', 'nickname-usuario-3', 'usuario3@usuario.random', 'hashsupersecreto9832y592736532432', 'guest');
--? ==================================================================== --