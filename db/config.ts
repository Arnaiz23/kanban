import { defineDb, defineTable, column } from "astro:db"

const Project = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    slug: column.text(),
  },
})

const Column = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    project_id: column.number({ references: () => Project.columns.id }),
  },
})

const Task = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    column_id: column.number({
      references: () => Column.columns.id,
    }),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: { Project, Column, Task },
})
