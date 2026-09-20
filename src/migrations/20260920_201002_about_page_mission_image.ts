import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "mission_image_id" integer;

   DO $$ BEGIN
    ALTER TABLE "about_page" ADD CONSTRAINT "about_page_mission_image_id_media_id_fk" FOREIGN KEY ("mission_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   CREATE INDEX IF NOT EXISTS "about_page_mission_mission_image_idx" ON "about_page" USING btree ("mission_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_page" DROP CONSTRAINT IF EXISTS "about_page_mission_image_id_media_id_fk";
   DROP INDEX IF EXISTS "about_page_mission_mission_image_idx";
   ALTER TABLE "about_page" DROP COLUMN IF EXISTS "mission_image_id";
  `)
}
