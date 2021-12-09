import db, { AnnouncementRow } from 'graphql/db';
import { DB_QUERY_BATCH_SIZE } from 'shared/constants';

type Args = {
  fellowship: string;
  offset: number;
}

export default async function announcements(parent: unknown, {fellowship, offset}: Args): Promise<AnnouncementRow[]> {
  const announcements: AnnouncementRow[] = await db.getAll(
    `
      SELECT *
      FROM announcements
      WHERE fellowship = ? OR fellowship = ?
      ORDER BY created_ts DESC LIMIT ? OFFSET ?
    `,
    [fellowship, 'all', DB_QUERY_BATCH_SIZE, offset]
  )
  return announcements;
}
