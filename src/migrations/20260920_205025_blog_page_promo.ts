import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "promo_title" varchar;
   ALTER TABLE "blog_page" ADD COLUMN IF NOT EXISTS "promo_description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "promo_title";
   ALTER TABLE "blog_page" DROP COLUMN IF EXISTS "promo_description";
  `)
}
