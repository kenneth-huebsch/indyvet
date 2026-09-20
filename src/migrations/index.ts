import * as migration_20260807_010156_initial from './20260807_010156_initial';
import * as migration_20260810_210851_phase_2_data_model from './20260810_210851_phase_2_data_model';
import * as migration_20260920_192954_services_page_global from './20260920_192954_services_page_global';
import * as migration_20260920_194419_services_page_promo from './20260920_194419_services_page_promo';
import * as migration_20260920_201002_about_page_mission_image from './20260920_201002_about_page_mission_image';
import * as migration_20260920_203457_blog_page_and_post_fields from './20260920_203457_blog_page_and_post_fields';
import * as migration_20260920_205025_blog_page_promo from './20260920_205025_blog_page_promo';
import * as migration_20260920_205138_about_page_promo from './20260920_205138_about_page_promo';
import * as migration_20260920_210108_testimonials_review_url from './20260920_210108_testimonials_review_url';
import * as migration_20260920_211715_contact_page_emergency from './20260920_211715_contact_page_emergency';
import * as migration_20260920_212108_drop_emergency_page from './20260920_212108_drop_emergency_page';

export const migrations = [
  {
    up: migration_20260807_010156_initial.up,
    down: migration_20260807_010156_initial.down,
    name: '20260807_010156_initial',
  },
  {
    up: migration_20260810_210851_phase_2_data_model.up,
    down: migration_20260810_210851_phase_2_data_model.down,
    name: '20260810_210851_phase_2_data_model',
  },
  {
    up: migration_20260920_192954_services_page_global.up,
    down: migration_20260920_192954_services_page_global.down,
    name: '20260920_192954_services_page_global',
  },
  {
    up: migration_20260920_194419_services_page_promo.up,
    down: migration_20260920_194419_services_page_promo.down,
    name: '20260920_194419_services_page_promo',
  },
  {
    up: migration_20260920_201002_about_page_mission_image.up,
    down: migration_20260920_201002_about_page_mission_image.down,
    name: '20260920_201002_about_page_mission_image',
  },
  {
    up: migration_20260920_203457_blog_page_and_post_fields.up,
    down: migration_20260920_203457_blog_page_and_post_fields.down,
    name: '20260920_203457_blog_page_and_post_fields',
  },
  {
    up: migration_20260920_205025_blog_page_promo.up,
    down: migration_20260920_205025_blog_page_promo.down,
    name: '20260920_205025_blog_page_promo',
  },
  {
    up: migration_20260920_205138_about_page_promo.up,
    down: migration_20260920_205138_about_page_promo.down,
    name: '20260920_205138_about_page_promo',
  },
  {
    up: migration_20260920_210108_testimonials_review_url.up,
    down: migration_20260920_210108_testimonials_review_url.down,
    name: '20260920_210108_testimonials_review_url',
  },
  {
    up: migration_20260920_211715_contact_page_emergency.up,
    down: migration_20260920_211715_contact_page_emergency.down,
    name: '20260920_211715_contact_page_emergency',
  },
  {
    up: migration_20260920_212108_drop_emergency_page.up,
    down: migration_20260920_212108_drop_emergency_page.down,
    name: '20260920_212108_drop_emergency_page'
  },
];
