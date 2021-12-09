import db, { ProjectRow } from 'graphql/db';
import { DB_QUERY_BATCH_SIZE } from 'shared/constants';

type Args = {
  offset: number;
}

export default async function projects(parent: unknown, {offset}: Args): Promise<ProjectRow[]> {
  const projects: ProjectRow[] = await db.getAll(
    `
      SELECT *
      FROM projects
      ORDER BY created_ts DESC LIMIT ? OFFSET ?
    `,
    [DB_QUERY_BATCH_SIZE, offset]
  )
  return projects;
}
