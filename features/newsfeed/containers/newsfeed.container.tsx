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

let queryOffsets = {
  usersOffset: 0,
  projectsOffset: 0,
  announcementsOffset: 0
}

export default function NewsfeedContainer({fellowship} : Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  const {data, error, loading, fetchMore} = useQuery<QueryData, QueryVars>(
    getNewsfeedQuery(fellowship),
    {
      variables: queryOffsets
    }
  )

  useEffect(() => {
    setPosts([]);
    queryOffsets = {
      usersOffset: 0,
      projectsOffset: 0,
      announcementsOffset: 0
    }
  }, [fellowship])

  useEffect(() => {
    if (data?.newsfeed && !loading && !error) {
      const newPosts = getNextPostsBatch(data.newsfeed);
      setPosts([...posts, ...newPosts]);

      updateQueryOffsets(queryOffsets, newPosts);
    }
  }, [data, loading, error])

  function fetchMorePosts() {
    fetchMore({
      variables: queryOffsets,
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

function updateQueryOffsets(offsets: QueryVars, posts: Post[]) {
  posts.forEach(post => {
    if (isUser(post)) {
      offsets.usersOffset += 1;
    } else if (isProject(post)) {
      offsets.projectsOffset += 1;
    } else if (isAnnouncement(post)) {
      offsets.announcementsOffset += 1;
    }
  })
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
