import Newsfeed from '../components/newsfeed.component';
import {useQuery, DocumentNode, gql} from '@apollo/client'
import {useEffect, useState} from 'react'
import {FellowshipName, User, Project, Announcement, NewsfeedResponse} from '../../../shared/types'

type Props = {
  fellowship: FellowshipName;
}

type QueryData = {
  newsfeed: NewsfeedResponse;
}

type Post = User | Project | Announcement

export default function NewsfeedContainer({fellowship} : Props) {
  const query = getNewsfeedQuery(fellowship);
  const {data, error, loading} = useQuery<QueryData>(
    query
  )

  const [posts, setPosts] = useState<Post[] | undefined>();

  
  useEffect(() => {
    if (data?.newsfeed && !loading && !error) {
      const posts = getNewsfeedPosts(data.newsfeed);
      setPosts(posts);
    }
  }, [data, loading, error])

  if (!posts || loading || error) {
    return null
  }

  return (
    <Newsfeed posts={posts}/>
  )
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
      query Query {
        newsfeed {
          founders {
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
          }
          angels {
            id
            name
            bio
            fellowship
            avatar_url
          }
          projects {
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
          }
          announcements(fellowship: "founders") {
            id
            fellowship
            title
            body
          }
        }
      }
      `,
    angels: gql`
      query Query {
        newsfeed {
          founders {
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
          }
          angels {
            id
            name
            bio
            fellowship
            avatar_url
          }
          projects {
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
          }
          announcements(fellowship: "angels") {
            id
            fellowship
            title
            body
          }
        }
      }
    `,
    writers: gql`
      query Query {
        newsfeed {
          writers {
            id
            name
            bio
            fellowship
            avatar_url
          }
          announcements(fellowship: "writers") {
            id
            fellowship
            title
            body
          }
        }
      }
    `,
  }
  return newsfeedQueries[fellowship];
}