import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    ALTER TABLE "contact_page" ADD COLUMN "emergency_eyebrow" varchar;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "contact_page" ADD COLUMN "emergency_title" varchar;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "contact_page" ADD COLUMN "emergency_intro" jsonb;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "contact_page_rels" ADD COLUMN "emergency_referrals_id" integer;
   EXCEPTION
    WHEN duplicate_column THEN null;
   END $$;

   DO $$ BEGIN
    ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_emergency_referrals_fk" FOREIGN KEY ("emergency_referrals_id") REFERENCES "public"."emergency_referrals"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;

   CREATE INDEX IF NOT EXISTS "contact_page_rels_emergency_referrals_id_idx" ON "contact_page_rels" USING btree ("emergency_referrals_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_page_rels" DROP CONSTRAINT IF EXISTS "contact_page_rels_emergency_referrals_fk";
   DROP INDEX IF EXISTS "contact_page_rels_emergency_referrals_id_idx";
   ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "emergency_eyebrow";
   ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "emergency_title";
   ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "emergency_intro";
   ALTER TABLE "contact_page_rels" DROP COLUMN IF EXISTS "emergency_referrals_id";
  `)
}
