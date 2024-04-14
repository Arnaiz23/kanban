import type { APIRoute } from "astro"
import { db, Project } from "astro:db"

export const POST: APIRoute = async ({ request }) => {
  const { name }: { name: string } = await request.json()

  if (!name) {
    return new Response("Name is missing", { status: 404 })
  }

  const slug = name.trim().toLowerCase().replaceAll(" ", "-")

  try {
    await db.insert(Project).values({ name, slug })
    // TODO: create columns???
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
