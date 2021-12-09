import Newsfeed from 'features/newsfeed/components/newsfeed.component';
import {useQuery, DocumentNode, gql } from '@apollo/client';
import {useEffect, useState} from 'react';
import {FellowshipName, Post, NewsfeedResponse} from 'shared/types';
import {DB_QUERY_BATCH_SIZE} from 'shared/constants';
import {isUser, isProject, isAnnouncement} from 'features/newsfeed/helpers/identifyPostType';

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
  
  function fetchMorePosts() {
    fetchMore({
      variables: queryOffsets,
      updateQuery: (pv, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return pv;
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
      let newPosts = getNewsfeedPosts(data.newsfeed);
      newPosts = sortByNewest(newPosts);
      newPosts = newPosts.slice(0, DB_QUERY_BATCH_SIZE);
      updateOffsets(newPosts, queryOffsets);
      setPosts([...posts, ...newPosts]);
    }
  }, [data, loading, error])

  if (!posts || loading || error) {
    return null
  }

  return (
    <Newsfeed posts={posts} handleScrolledToBottom={fetchMorePosts}/>
  )
}

function updateOffsets(posts: Post[], offsets: QueryVars) {
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

function sortByNewest(posts: Post[]): Post[] {
  const postsCopy = [...posts];
  postsCopy.sort((a, b) => {
    const aSinceEpoch = new Date(a.created_ts).valueOf();
    const bSinceEpoch = new Date(b.created_ts).valueOf();
    return bSinceEpoch - aSinceEpoch
  });
  return postsCopy;
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
