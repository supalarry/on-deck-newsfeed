import {useQuery, gql} from '@apollo/client'
import { Heading, Button, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import Layout from 'components/Layout'

export default function NewsfeedsPage() {
  const {data, error, loading} = useQuery<QueryData>(
    FELLOWSHIPS_QUERY
  )
  const [newsfeedId, setNewsfeedId] = useState<number>(0);
  const [fellowships, setFellowships] = useState<Fellowship[]>([]);

  useEffect(() => {
    if (data?.fellowships && !loading && !error) {
      setFellowships(data.fellowships);
      setNewsfeedId(data.fellowships[0].id);
    }
  }, [data, loading, error])
  
  function showNewsfeedFor(fellowshipId: number) {
    setNewsfeedId(fellowshipId);
  }

  if (!fellowships || loading || error) {
    return null
  }

  return (
    <Layout>
      <Heading>Newsfeeds for</Heading>
      <Stack direction='row' spacing={4} align='center'>
        {
          fellowships && fellowships.map(fellowship => {
            return (
              <Button
                onClick={() => showNewsfeedFor(fellowship.id)}
                key={fellowship.id}
                colorScheme='blue'
                variant='outline'>
                  {fellowship.name}
              </Button>
            )
          })
        }
      </Stack>
    </Layout>
  )
}

const FELLOWSHIPS_QUERY = gql`
  query fellowships {
    fellowships {
      id
      name
    }
  }
`

type QueryData = {
  fellowships: [Fellowship];
}

type Fellowship = {
  id: number;
  name: string;
}
