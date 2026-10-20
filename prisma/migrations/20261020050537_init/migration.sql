-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'user', 'guest');

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "image_url" TEXT,
    "category_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "min_stock" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'unidad',
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "email" CITEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified_at" TIMESTAMPTZ(6),
    "last_login_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_name_key" ON "location"("name");

-- CreateIndex
CREATE INDEX "inventory_category_idx" ON "inventory"("category_id");

-- CreateIndex
CREATE INDEX "inventory_location_idx" ON "inventory"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddConstraint
ALTER TABLE inventory ADD CONSTRAINT inventory_product_name_check CHECK (length(trim(product_name)) > 0);

-- AddConstraint
ALTER TABLE inventory ADD CONSTRAINT inventory_stock_check CHECK (stock >= 0);

-- AddConstraint
ALTER TABLE inventory ADD CONSTRAINT inventory_min_stock_check CHECK (min_stock >= 0);

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_full_name_length CHECK (char_length(btrim(full_name)) BETWEEN 1 AND 50);

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_full_name_trimmed CHECK (full_name = btrim(full_name));

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_full_name_chars CHECK (full_name !~ '[[:cntrl:]]');

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_display_name_length CHECK (char_length(btrim(display_name)) BETWEEN 1 AND 50);

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_display_name_trimmed CHECK (display_name = btrim(display_name));

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_display_name_chars CHECK (display_name !~ '[[:cntrl:]]');

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_email_length CHECK (char_length(email) BETWEEN 6 AND 254);

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_email_format CHECK (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- AddConstraint
ALTER TABLE users ADD CONSTRAINT users_pwhash_length CHECK (char_length(password_hash) BETWEEN 20 AND 255);

-- AddIndex
CREATE UNIQUE INDEX inventory_name_loc_uq ON inventory (lower(product_name), location_id);

-- AddFunction
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- AddTrigger
CREATE OR REPLACE TRIGGER inventory_set_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

--AddTrigger
CREATE OR REPLACE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();