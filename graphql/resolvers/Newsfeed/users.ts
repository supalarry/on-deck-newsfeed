import db, {UserRow} from '../../db'
import {DB_QUERY_BATCH_SIZE} from '../../../shared/constants';

type Args = {
  fellowships: string[];
  offset: number;
}

export default async function users(parent: unknown, {fellowships, offset}: Args): Promise<UserRow[]> {
  const WHERE_STATEMENT = createWhereOrStatement('fellowship', fellowships.length);
  const users: UserRow[] = await db.getAll(
    `
      SELECT *
      FROM users
      ${WHERE_STATEMENT}
      ORDER BY created_ts DESC LIMIT ? OFFSET ?
    `,
    [...fellowships, DB_QUERY_BATCH_SIZE, offset]
  )
  return users
}

function createWhereOrStatement(column: string, possibleValuesCount: number): string {
  let statement = `WHERE ${column} = ?`;

  while (possibleValuesCount > 1) {
    statement = `${statement} OR ${column} = ?`
    possibleValuesCount -= 1;
  }
  return statement;
}