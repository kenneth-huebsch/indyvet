import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "emergency_page_rels" CASCADE;
   DROP TABLE IF EXISTS "emergency_page" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "emergency_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"intro" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "emergency_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"emergency_referrals_id" integer
  );

  DO $$ BEGIN
   ALTER TABLE "emergency_page" ADD CONSTRAINT "emergency_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "emergency_page_rels" ADD CONSTRAINT "emergency_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."emergency_page"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "emergency_page_rels" ADD CONSTRAINT "emergency_page_rels_emergency_referrals_fk" FOREIGN KEY ("emergency_referrals_id") REFERENCES "public"."emergency_referrals"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "emergency_page_seo_seo_og_image_idx" ON "emergency_page" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "emergency_page_rels_order_idx" ON "emergency_page_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "emergency_page_rels_parent_idx" ON "emergency_page_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "emergency_page_rels_path_idx" ON "emergency_page_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "emergency_page_rels_emergency_referrals_id_idx" ON "emergency_page_rels" USING btree ("emergency_referrals_id");
  `)
}
