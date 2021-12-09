import db, { ProjectRow } from 'graphql/db';

type Args = {
  id: string;
}

export default async function project(parent: unknown, {id}: Args): Promise<ProjectRow> {
  const project: ProjectRow | undefined = await db.getOne(
    'SELECT * FROM projects WHERE id = ?',
    [id]
  )
  if (!project) {
    throw new Error(`Project ${id} not found`)
  }
  return project
}
