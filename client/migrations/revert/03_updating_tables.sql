-- Revert 588_videos:03_updating_tables from pg

BEGIN;

DELETE
FROM "support"
WHERE "name"= 'Disque dur externe KIKI';
DELETE
FROM "support"
WHERE "name"= 'Boite DVD I';
DELETE
FROM "support"
WHERE "name"= 'Boite DVD II';
DELETE
FROM "support"
WHERE "name"= 'original';

COMMIT;
