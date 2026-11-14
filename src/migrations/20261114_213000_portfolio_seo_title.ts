import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolio_projects" ADD COLUMN "seo_title" varchar;
   ALTER TABLE "_portfolio_projects_v" ADD COLUMN "version_seo_title" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolio_projects" DROP COLUMN "seo_title";
   ALTER TABLE "_portfolio_projects_v" DROP COLUMN "version_seo_title";`)
}
