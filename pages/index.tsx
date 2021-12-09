import Head from 'next/head';
import Link from 'next/link';
import { Flex, Link as ChakraLink, Image, Text, Button } from '@chakra-ui/react';
import { IoMdExit } from '@react-icons/all-files/io/IoMdExit';

export default function Home() {
  const headElementTitle = 'Newsfeed worth scrolling';

  const heading = 'Inspire and be inspired.';
  const subHeadingOne = 'Our newsfeed is a door to once in a lifetime opportunities and connections.';
  const subHeadingTwo = 'It\'s a newsfeed worth scrolling.';
  const newsfeedPageButton = 'Newsfeed';

  return (
    <main>
      <Head>
        <title>{headElementTitle}</title>
      </Head>
      <Flex w='100vw' h='100vh' display="flex" align="center" justify="center"
        direction="column" bg="#182135">
        <Flex w='95vw' h='90vh' display="flex" align="center" justify="center"
          direction="column" padding={4} bg="#1b263c" borderRadius="15">
          <ChakraLink href="https://www.beondeck.com/" isExternal
            position="absolute" top="0" boxShadow='dark-lg' borderBottomRadius="15">
            <Image src='/on-deck-logo-and-name.png'
            borderBottomRadius="15" width='120px' opacity='0.9'/>
          </ChakraLink>
          <Text bgGradient='linear(to-r, #305cea, #773de2, #e95370)' bgClip='text'
            fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }} fontWeight='extrabold' align="center">
            {heading}
          </Text>
          <Text align="center" mt={{ base: 4, md: 0 }} fontSize={{ base: 'xl', md: '2xl'}} color="#fafafa">
            {subHeadingOne} <br/>
            {subHeadingTwo}
          </Text>
          <Link href="/newsfeeds">
            <Button color='#fafafa' bg='#773de2' _hover={{ bg: '#824ee4' }}
              mt={8}  size="lg" rightIcon={<IoMdExit />}>
              {newsfeedPageButton}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </main>
  )
}
