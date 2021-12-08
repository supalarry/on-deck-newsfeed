import {useQuery, gql} from '@apollo/client'
import { useState, useEffect } from 'react';
import { Heading } from '@chakra-ui/react'
import ButtonsList from '../../components/ButtonsList'
import Layout from 'components/Layout'
import NewsfeedContainer from 'features/newsfeed/containers/newsfeed.container';
import { FellowshipName } from '../../shared/types';

export default function NewsfeedsPage() {
  const {data, error, loading} = useQuery<QueryData>(
    FELLOWSHIPS_QUERY
  )
  const [newsfeedFellowship, setNewsfeedFellowship] = useState<FellowshipName | undefined>();
  const [fellowships, setFellowships] = useState<Fellowship[] | undefined>();

  useEffect(() => {
    if (data?.fellowships && !loading && !error) {
      setFellowships(data.fellowships);
      setNewsfeedFellowship(data.fellowships[0].name);
    }
  }, [data, loading, error])

  if (!fellowships || loading || error) {
    return null
  }

  return (
    <Layout>
      <Heading>Newsfeed for</Heading>
      <ButtonsList buttons={fellowships} handleButtonClick={setNewsfeedFellowship} activeButtonName={newsfeedFellowship!}/>
      <NewsfeedContainer fellowship={newsfeedFellowship!} />
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
  name: FellowshipName;
}
