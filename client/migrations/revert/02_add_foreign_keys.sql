-- Revert 588_videos:02_add_foreign_keys from pg

BEGIN;

ALTER TABLE "movie" DROP COLUMN "support_id";
ALTER TABLE "movie" DROP COLUMN "director_id";
ALTER TABLE "movie" DROP COLUMN "collection_id";

ALTER TABLE "session" DROP COLUMN "user_id";
ALTER TABLE "session" DROP COLUMN "movie_id";

ALTER TABLE "review" DROP COLUMN "user_id";
ALTER TABLE "review" DROP COLUMN "movie_id";
ALTER TABLE "review" DROP COLUMN "session_id";

ALTER TABLE "favorite" DROP COLUMN "user_id";
ALTER TABLE "favorite" DROP COLUMN "movie_id";

ALTER TABLE "see" DROP COLUMN "user_id";
ALTER TABLE "see" DROP COLUMN "movie_id";

ALTER TABLE "play" DROP COLUMN "actor_id";
ALTER TABLE "play" DROP COLUMN "movie_id";

ALTER TABLE "production" DROP COLUMN "production_company_id";
ALTER TABLE "production" DROP COLUMN "movie_id";

ALTER TABLE "type" DROP COLUMN "genre_id" ;
ALTER TABLE "type" DROP COLUMN "movie_id" ;

ALTER TABLE "origin" DROP COLUMN "production_country_id";
ALTER TABLE "origin" DROP COLUMN "movie_id";

COMMIT;
