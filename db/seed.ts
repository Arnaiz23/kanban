import { db, Project } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Project).values({
    name: "Kanban", slug: "Kanban"
  })
}
