-- Deploy 588_videos:03_updating_tables to pg

BEGIN;

INSERT INTO "support" ("type","name")
VALUES
('DD','Disque dur externe KIKI'),
('DVD+RW','Boite DVD I'),
('DVD+RW','Boîte DVD II'),
('DVD','original');

COMMIT;
