import { Column, db, Project, Task } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Project).values({
    name: "Kanban",
    slug: "kanban",
  })

  await db.insert(Column).values([
    {
      name: "ToDo",
      project_id: 1,
    },
    {
      name: "Doing",
      project_id: 1,
    },
    {
      name: "Done",
      project_id: 1,
    },
  ])

  await db.insert(Task).values([
    {
      name: "TEst",
      column_id: 1,
    },
    {
      name: "Testing2",
      column_id: 3,
    },
  ])
}
