-- Revert 588_videos:01_create_tables from pg

BEGIN;

DROP TABLE "support";
DROP TABLE "genre";
DROP TABLE "collection";
DROP TABLE "production_company";
DROP TABLE "production_country";
DROP TABLE "actor";
DROP TABLE "director";
DROP TABLE "favorite";
DROP TABLE "see";
DROP TABLE "play";
DROP TABLE "type";
DROP TABLE "production";
DROP TABLE "origin";

COMMIT;