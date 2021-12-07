import Head from 'next/head'
import Link from 'next/link'
import { Flex, Link as ChakraLink, Image, Text, Button } from '@chakra-ui/react'


export default function Home() {
  return (
    <>
      <Head>
        <title>Newsfeed worth scrolling</title>
      </Head>
      <Flex  w='100vw' direction="column" h='100vh' bg="#182135" display="flex" align="center" justify="center">
        <Flex  w='95vw' direction="column" h='90vh' bg="#1b263c" display="flex" align="center" justify="center" borderRadius="15" padding={4}>
          <ChakraLink href="https://www.beondeck.com/" isExternal position="absolute" top="0" boxShadow='dark-lg' borderBottomRadius="15">
              <Image src='/on-deck-logo-and-name.png' borderBottomRadius="15" width='150px'/>
          </ChakraLink>
          <Text
            bgGradient='linear(to-r, #305cea, #773de2, #e95370)'
            bgClip='text'
            fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
            fontWeight='extrabold'
            align="center"
          >
            Inspire and be inspired.
          </Text>
          <Text align="center" fontSize={{ base: 'xl', md: '2xl'}} color="#fafafa">
            Our newsfeed is a door to once in a lifetime opportunities and connections.<br></br>
            It's a newsfeed worth scrolling.
          </Text>
          <Link href="/newsfeeds">
            <Button mt={8} color='#fafafa' bg='#773de2' _hover={{ bg: '#e95370' }} size="lg">
              Read
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}
