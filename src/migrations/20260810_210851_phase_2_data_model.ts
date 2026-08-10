import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"short_description" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_body" jsonb,
  	"version_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"bio" jsonb,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_role" varchar,
  	"version_photo_id" integer,
  	"version_bio" jsonb,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"location" varchar,
  	"avatar_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "emergency_referrals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"address" varchar,
  	"notes" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_site_name" varchar DEFAULT 'Indy Veterinary Care' NOT NULL,
  	"brand_tagline" varchar,
  	"contact_phone" varchar,
  	"contact_text_phone" varchar,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"social_facebook" varchar,
  	"social_instagram" varchar,
  	"booking_label" varchar DEFAULT 'Book Now',
  	"booking_url" varchar,
  	"booking_embed_script_url" varchar,
  	"pharmacy_label" varchar DEFAULT 'Order Online',
  	"pharmacy_url" varchar,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"default_seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_link_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_hero_marquee_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "home_page_about_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_bottom_cta_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar NOT NULL,
  	"hero_description" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_primary_cta_url" varchar,
  	"hero_secondary_cta_label" varchar,
  	"hero_secondary_cta_url" varchar,
  	"services_eyebrow" varchar,
  	"services_title" varchar,
  	"process_eyebrow" varchar,
  	"process_title" varchar,
  	"process_promo_title" varchar,
  	"process_promo_description" varchar,
  	"process_promo_cta_label" varchar,
  	"process_promo_cta_url" varchar,
  	"featured_posts_eyebrow" varchar,
  	"featured_posts_title" varchar,
  	"featured_posts_view_all_label" varchar,
  	"featured_posts_view_all_url" varchar,
  	"about_eyebrow" varchar,
  	"about_title" varchar,
  	"about_body" jsonb,
  	"about_cta_label" varchar,
  	"about_cta_url" varchar,
  	"team_eyebrow" varchar,
  	"team_title" varchar,
  	"team_cta_label" varchar,
  	"team_cta_url" varchar,
  	"testimonials_eyebrow" varchar,
  	"testimonials_title" varchar,
  	"bottom_cta_headline" varchar,
  	"bottom_cta_cta_label" varchar,
  	"bottom_cta_cta_url" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"posts_id" integer,
  	"team_members_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"mission_eyebrow" varchar,
  	"mission_title" varchar,
  	"mission_body" jsonb,
  	"namesake_title" varchar,
  	"namesake_body" jsonb,
  	"team_eyebrow" varchar,
  	"team_title" varchar,
  	"testimonials_eyebrow" varchar,
  	"testimonials_title" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_members_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"intro" jsonb,
  	"form_name_label" varchar DEFAULT 'Name',
  	"form_email_label" varchar DEFAULT 'Email',
  	"form_phone_label" varchar DEFAULT 'Phone',
  	"form_message_label" varchar DEFAULT 'Message',
  	"form_submit_label" varchar DEFAULT 'Send message',
  	"form_success_message" varchar DEFAULT 'Thanks — we will be in touch soon.',
  	"map_embed_url" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "emergency_page" (
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
  
  CREATE TABLE "emergency_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"emergency_referrals_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "emergency_referrals_id" integer;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_contact_hours" ADD CONSTRAINT "site_settings_contact_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_og_image_id_media_id_fk" FOREIGN KEY ("default_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_link_groups_links" ADD CONSTRAINT "footer_link_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_groups" ADD CONSTRAINT "footer_link_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_images" ADD CONSTRAINT "home_page_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_hero_images" ADD CONSTRAINT "home_page_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_marquee_tags" ADD CONSTRAINT "home_page_hero_marquee_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_steps" ADD CONSTRAINT "home_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_tags" ADD CONSTRAINT "home_page_about_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_bottom_cta_images" ADD CONSTRAINT "home_page_bottom_cta_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_bottom_cta_images" ADD CONSTRAINT "home_page_bottom_cta_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_page" ADD CONSTRAINT "emergency_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "emergency_page_rels" ADD CONSTRAINT "emergency_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."emergency_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "emergency_page_rels" ADD CONSTRAINT "emergency_page_rels_emergency_referrals_fk" FOREIGN KEY ("emergency_referrals_id") REFERENCES "public"."emergency_referrals"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "team_members_slug_idx" ON "team_members" USING btree ("slug");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "team_members" USING btree ("_status");
  CREATE INDEX "_team_members_v_parent_idx" ON "_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_slug_idx" ON "_team_members_v" USING btree ("version_slug");
  CREATE INDEX "_team_members_v_version_version_photo_idx" ON "_team_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_latest_idx" ON "_team_members_v" USING btree ("latest");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "emergency_referrals_updated_at_idx" ON "emergency_referrals" USING btree ("updated_at");
  CREATE INDEX "emergency_referrals_created_at_idx" ON "emergency_referrals" USING btree ("created_at");
  CREATE INDEX "site_settings_contact_hours_order_idx" ON "site_settings_contact_hours" USING btree ("_order");
  CREATE INDEX "site_settings_contact_hours_parent_id_idx" ON "site_settings_contact_hours" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_seo_default_seo_og_image_idx" ON "site_settings" USING btree ("default_seo_og_image_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_link_groups_links_order_idx" ON "footer_link_groups_links" USING btree ("_order");
  CREATE INDEX "footer_link_groups_links_parent_id_idx" ON "footer_link_groups_links" USING btree ("_parent_id");
  CREATE INDEX "footer_link_groups_order_idx" ON "footer_link_groups" USING btree ("_order");
  CREATE INDEX "footer_link_groups_parent_id_idx" ON "footer_link_groups" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "home_page_hero_images_order_idx" ON "home_page_hero_images" USING btree ("_order");
  CREATE INDEX "home_page_hero_images_parent_id_idx" ON "home_page_hero_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_images_image_idx" ON "home_page_hero_images" USING btree ("image_id");
  CREATE INDEX "home_page_hero_marquee_tags_order_idx" ON "home_page_hero_marquee_tags" USING btree ("_order");
  CREATE INDEX "home_page_hero_marquee_tags_parent_id_idx" ON "home_page_hero_marquee_tags" USING btree ("_parent_id");
  CREATE INDEX "home_page_process_steps_order_idx" ON "home_page_process_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_steps_parent_id_idx" ON "home_page_process_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_tags_order_idx" ON "home_page_about_tags" USING btree ("_order");
  CREATE INDEX "home_page_about_tags_parent_id_idx" ON "home_page_about_tags" USING btree ("_parent_id");
  CREATE INDEX "home_page_bottom_cta_images_order_idx" ON "home_page_bottom_cta_images" USING btree ("_order");
  CREATE INDEX "home_page_bottom_cta_images_parent_id_idx" ON "home_page_bottom_cta_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_bottom_cta_images_image_idx" ON "home_page_bottom_cta_images" USING btree ("image_id");
  CREATE INDEX "home_page_seo_seo_og_image_idx" ON "home_page" USING btree ("seo_og_image_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");
  CREATE INDEX "home_page_rels_posts_id_idx" ON "home_page_rels" USING btree ("posts_id");
  CREATE INDEX "home_page_rels_team_members_id_idx" ON "home_page_rels" USING btree ("team_members_id");
  CREATE INDEX "home_page_rels_testimonials_id_idx" ON "home_page_rels" USING btree ("testimonials_id");
  CREATE INDEX "about_page_seo_seo_og_image_idx" ON "about_page" USING btree ("seo_og_image_id");
  CREATE INDEX "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
  CREATE INDEX "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
  CREATE INDEX "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
  CREATE INDEX "about_page_rels_team_members_id_idx" ON "about_page_rels" USING btree ("team_members_id");
  CREATE INDEX "about_page_rels_testimonials_id_idx" ON "about_page_rels" USING btree ("testimonials_id");
  CREATE INDEX "contact_page_seo_seo_og_image_idx" ON "contact_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contact_page_rels_order_idx" ON "contact_page_rels" USING btree ("order");
  CREATE INDEX "contact_page_rels_parent_idx" ON "contact_page_rels" USING btree ("parent_id");
  CREATE INDEX "contact_page_rels_path_idx" ON "contact_page_rels" USING btree ("path");
  CREATE INDEX "contact_page_rels_faqs_id_idx" ON "contact_page_rels" USING btree ("faqs_id");
  CREATE INDEX "emergency_page_seo_seo_og_image_idx" ON "emergency_page" USING btree ("seo_og_image_id");
  CREATE INDEX "emergency_page_rels_order_idx" ON "emergency_page_rels" USING btree ("order");
  CREATE INDEX "emergency_page_rels_parent_idx" ON "emergency_page_rels" USING btree ("parent_id");
  CREATE INDEX "emergency_page_rels_path_idx" ON "emergency_page_rels" USING btree ("path");
  CREATE INDEX "emergency_page_rels_emergency_referrals_id_idx" ON "emergency_page_rels" USING btree ("emergency_referrals_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_emergency_referrals_fk" FOREIGN KEY ("emergency_referrals_id") REFERENCES "public"."emergency_referrals"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_emergency_referrals_id_idx" ON "payload_locked_documents_rels" USING btree ("emergency_referrals_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_team_members_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_referrals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_contact_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_link_groups_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_link_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_hero_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_hero_marquee_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_about_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_bottom_cta_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emergency_page_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "_team_members_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "emergency_referrals" CASCADE;
  DROP TABLE "site_settings_contact_hours" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_link_groups_links" CASCADE;
  DROP TABLE "footer_link_groups" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home_page_hero_images" CASCADE;
  DROP TABLE "home_page_hero_marquee_tags" CASCADE;
  DROP TABLE "home_page_process_steps" CASCADE;
  DROP TABLE "home_page_about_tags" CASCADE;
  DROP TABLE "home_page_bottom_cta_images" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_rels" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_rels" CASCADE;
  DROP TABLE "emergency_page" CASCADE;
  DROP TABLE "emergency_page_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_emergency_referrals_fk";
  
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_emergency_referrals_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "emergency_referrals_id";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_team_members_status";
  DROP TYPE "public"."enum__team_members_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";`)
}
