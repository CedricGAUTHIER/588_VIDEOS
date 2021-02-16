-- Deploy 588_videos:01_create_tables to pg

BEGIN;

DROP TABLE IF EXISTS "support";
CREATE TABLE "support" (
    "id" SERIAL PRIMARY KEY,
    "type" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "genre";
CREATE TABLE "genre" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "collection";
CREATE TABLE "collection" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "production_company";
CREATE TABLE "production_company" (
    "id" SERIAL PRIMARY KEY,
    "logo" TEXT,
    "iso_3166" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "production_country";
CREATE TABLE "production_country" (
    "id" SERIAL PRIMARY KEY,
    "iso_3166" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "actor";
CREATE TABLE "actor" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "director";
CREATE TABLE "director" (
    "id" SERIAL PRIMARY KEY,
    "photo" TEXT,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "favorite";
CREATE TABLE "favorite" (
    "id" SERIAL PRIMARY KEY,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "see";
CREATE TABLE "see" (
    "id" SERIAL PRIMARY KEY,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "play";
CREATE TABLE "play" (
    "id" SERIAL PRIMARY KEY,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "type";
CREATE TABLE "type" (
    "id" SERIAL PRIMARY KEY,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "production";
CREATE TABLE "production" (
    "id" SERIAL PRIMARY KEY,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS "origin";
CREATE TABLE "origin" (
    "id" SERIAL PRIMARY KEY,
    "updated_at" TIMESTAMPTZ ,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);



COMMIT;
