import Newsfeed from 'features/newsfeed/components/newsfeed.component';
import { useQuery, DocumentNode, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FellowshipName, Post, NewsfeedResponse} from 'shared/types';
import { DB_QUERY_BATCH_SIZE } from 'shared/constants';
import { isUser, isProject, isAnnouncement } from 'features/newsfeed/helpers/identifyPostType';

type Props = {
  fellowship: FellowshipName;
}

type QueryData = {
  newsfeed: NewsfeedResponse;
}

type QueryVars = {
  usersOffset: number;
  projectsOffset: number;
  announcementsOffset: number;
}

export default function NewsfeedContainer({fellowship} : Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usersOffset, setUsersOffset] = useState(0);
  const [projectsOffset, setProjectsOffset] = useState(0);
  const [announcementsOffset, setAnnouncementsOffset] = useState(0);

  const {data, error, loading, fetchMore} = useQuery<QueryData, QueryVars>(
    getNewsfeedQuery(fellowship),
    {
      variables: {
        usersOffset: 0,
        projectsOffset: 0,
        announcementsOffset: 0
      }
    }
  )

  useEffect(() => {
    setPosts([]);
    setUsersOffset(0);
    setProjectsOffset(0);
    setAnnouncementsOffset(0);
  }, [fellowship])

  useEffect(() => {
    if (data?.newsfeed && !loading && !error) {
      const newPosts = getNextPostsBatch(data.newsfeed);
      setPosts([...posts, ...newPosts]);

      const increase = getPostIncreasesByCategory(newPosts);
      setUsersOffset(usersOffset + increase.users);
      setProjectsOffset(projectsOffset + increase.projects);
      setAnnouncementsOffset(announcementsOffset + increase.announcements);
    }
  }, [data, loading, error])

  function fetchMorePosts() {
    fetchMore({
      variables: {
        usersOffset,
        projectsOffset,
        announcementsOffset
      },
      updateQuery: (latestResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return latestResult;
        }
        return {
          __typename: "Newsfeed",
          newsfeed: {
            ...fetchMoreResult.newsfeed,
          }
        }
      }
    })
  }

  if (!posts || loading || error) {
    return null
  }

  return (
    <Newsfeed posts={posts} handleScrolledToBottom={fetchMorePosts}/>
  )
}

function getNextPostsBatch(newsfeed: NewsfeedResponse): Post[] {
  let posts = getNewsfeedPosts(newsfeed);
  posts = sortByNewest(posts);
  posts = selectLatestPosts(posts, DB_QUERY_BATCH_SIZE);

  return posts;
}

function getNewsfeedPosts(newsfeed: NewsfeedResponse): Post[] {
  let posts: Post[] = [];
  
  const postsByCategories = Object.values(newsfeed);
  postsByCategories.forEach(category => {
    // Ignore Apollo server __typename string in response
    if (typeof category === 'object') {
      posts = [...posts, ...category];
    }
  })
  
  return posts;
}

function sortByNewest(posts: Post[]): Post[] {
  const postsCopy = [...posts];
  postsCopy.sort((a, b) => {
    const aSinceEpoch = new Date(a.created_ts).valueOf();
    const bSinceEpoch = new Date(b.created_ts).valueOf();
    return bSinceEpoch - aSinceEpoch
  });
  return postsCopy;
}

function selectLatestPosts(posts: Post[], count: number) {
  return posts.slice(0, count);
}

type PostIncrease = {
  users: number;
  projects: number;
  announcements: number;
}

function getPostIncreasesByCategory(posts: Post[]): PostIncrease {
  let users = 0;
  let projects = 0;
  let announcements = 0;

  posts.forEach(post => {
    if (isUser(post)) {
      users += 1;
    } else if (isProject(post)) {
      projects += 1;
    } else if (isAnnouncement(post)) {
      announcements += 1;
    }
  })

  return {
    users,
    projects,
    announcements
  }
}

function getNewsfeedQuery(fellowship: FellowshipName): DocumentNode {
  const newsfeedQueries = {
    founders: gql`
      query newsfeed($usersOffset: Int!, $projectsOffset: Int!, $announcementsOffset: Int!) {
        newsfeed {
          users(fellowships: ["founders", "angels"], offset: $usersOffset) {
            id
            name
            bio
            fellowship
            avatar_url
            projects {
              id
              name
              description
              icon_url
            }
            created_ts
          }
          projects(offset: $projectsOffset) {
            id
            name
            description
            icon_url
            users {
              id
              name
              bio
              fellowship
              avatar_url
            }
            created_ts
          }
          announcements(fellowship: "founders", offset: $announcementsOffset) {
            id
            fellowship
            title
            body
            created_ts
          }
        }
      }
      `,
    angels: gql`
      query newsfeed($usersOffset: Int!, $projectsOffset: Int!, $announcementsOffset: Int!) {
        newsfeed {
          users(fellowships: ["founders", "angels"], offset: $usersOffset) {
            id
            name
            bio
            fellowship
            avatar_url
            projects {
              id
              name
              description
              icon_url
            }
            created_ts
          }
          projects(offset: $projectsOffset) {
            id
            name
            description
            icon_url
            users {
              id
              name
              bio
              fellowship
              avatar_url
            }
            created_ts
          }
          announcements(fellowship: "angels", offset: $announcementsOffset) {
            id
            fellowship
            title
            body
            created_ts
          }
        }
      }
    `,
    writers: gql`
      query newsfeed($usersOffset: Int!, $announcementsOffset: Int!) {
        newsfeed {
          users(fellowships: ["writers"], offset: $usersOffset) {
            id
            name
            bio
            fellowship
            avatar_url
            created_ts
          }
          announcements(fellowship: "writers", offset: $announcementsOffset) {
            id
            fellowship
            title
            body
            created_ts
          }
        }
      }
    `,
  }
  return newsfeedQueries[fellowship];
}
