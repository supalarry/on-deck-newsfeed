import ButtonsList from '../../components/ButtonsList';
import Layout from 'components/Layout';
import NewsfeedContainer from 'features/newsfeed/containers/newsfeed.container';
import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import { FellowshipName } from '../../shared/types';

export default function NewsfeedPage() {
  const [fellowships, setFellowships] = useState<Fellowship[]>();
  const [chosenFellowship, setChosenFellowship] = useState<FellowshipName>();

  const {data, error, loading} = useQuery<QueryData>(
    FELLOWSHIPS_QUERY
  )

  useEffect(() => {
    if (data?.fellowships && !loading && !error) {
      setFellowships(data.fellowships);
      setChosenFellowship(data.fellowships[0].name);
    }
  }, [data, loading, error])

  if (!fellowships || !chosenFellowship || loading || error) {
    return null
  }

  return (
    <Layout>
      <div>
        <Heading>Newsfeed for</Heading>
        <ButtonsList buttons={fellowships} handleButtonClick={setChosenFellowship}
          activeButtonName={chosenFellowship!}/>
      </div>
      <NewsfeedContainer fellowship={chosenFellowship!} />
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
