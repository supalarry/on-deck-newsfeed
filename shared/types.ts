export type FellowshipName = 'founders' | 'angels' | 'writers'
export type Post = User | Project | Announcement

export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
  created_ts: string;
  __typename: string;
}

export type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "founders" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
  created_ts: string;
  __typename: string;
}

export type Announcement = {
  id: number;
  fellowship: string;
  title: string;
  body: string;
  created_ts: string;
  __typename: string;
}

export type NewsfeedResponse = {
  founders?: User[];
  angels?: User[];
  writers?: User[];
  projects?: Project[];
  announcements: Announcement[]
  created_ts: string;
}