import db, {ProjectRow} from '../../db'

export default async function projects(): Promise<ProjectRow[]> {
  const projects: ProjectRow[] = await db.getAll(
    `
      SELECT *
      FROM projects
    `,
    []
  )
  return projects
}
