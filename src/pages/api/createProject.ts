import type { APIRoute } from "astro"
import { Column, db, Project } from "astro:db"

export const POST: APIRoute = async ({ request }) => {
  const { name }: { name: string } = await request.json()

  if (!name) {
    return new Response("Name is missing", { status: 404 })
  }

  const slug = name.trim().toLowerCase().replaceAll(" ", "-")

  try {
    const { lastInsertRowid } = await db.insert(Project).values({ name, slug })
    // TODO: Delete if I want to create custom columns
    await db.insert(Column).values([
      { name: "ToDo", project_id: Number(lastInsertRowid) },
      { name: "Doing", project_id: Number(lastInsertRowid) },
      { name: "Done", project_id: Number(lastInsertRowid) },
    ])
    return new Response(null, { status: 201 })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Error creating the project",
        data: null,
      }),
      { status: 404 },
    )
  }
}
