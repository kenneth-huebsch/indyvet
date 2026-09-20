import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "posts_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  DO $$ BEGIN
   ALTER TABLE "posts" ADD COLUMN "seo_title" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts" ADD COLUMN "seo_description" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts" ADD COLUMN "seo_og_image_id" integer;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD COLUMN "version_seo_title" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD COLUMN "version_seo_description" varchar;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD COLUMN "version_seo_og_image_id" integer;
  EXCEPTION
   WHEN duplicate_column THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_categories" ADD CONSTRAINT "_posts_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "posts_categories_order_idx" ON "posts_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_categories_parent_id_idx" ON "posts_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_categories_order_idx" ON "_posts_v_version_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_categories_parent_id_idx" ON "_posts_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_seo_seo_og_image_idx" ON "blog_page" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "posts_categories" CASCADE;
   DROP TABLE IF EXISTS "_posts_v_version_categories" CASCADE;
   DROP TABLE IF EXISTS "blog_page" CASCADE;

   ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_seo_og_image_id_media_id_fk";
   ALTER TABLE "_posts_v" DROP CONSTRAINT IF EXISTS "_posts_v_version_seo_og_image_id_media_id_fk";
   DROP INDEX IF EXISTS "posts_seo_seo_og_image_idx";
   DROP INDEX IF EXISTS "_posts_v_version_seo_version_seo_og_image_idx";
   ALTER TABLE "posts" DROP COLUMN IF EXISTS "seo_title";
   ALTER TABLE "posts" DROP COLUMN IF EXISTS "seo_description";
   ALTER TABLE "posts" DROP COLUMN IF EXISTS "seo_og_image_id";
   ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_seo_title";
   ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_seo_description";
   ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_seo_og_image_id";
  `)
}
