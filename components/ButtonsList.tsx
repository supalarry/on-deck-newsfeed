import { Button, Stack } from '@chakra-ui/react'

interface Button {
  name: string;
}

export default function ButtonsList({buttons, handleButtonClick, activeButtonName} : {buttons: Button[], handleButtonClick: (name: any) => void, activeButtonName: string}) {
  return (
    <Stack direction='row' spacing={4} align='center'>
        {
          buttons && buttons.map((button, index) => {
            return (
              <Button
                isActive={button.name === activeButtonName}
                onClick={() => handleButtonClick(button.name)}
                key={`${index}_${button.name}`}
                textTransform="capitalize"
                _active={{
                  fontWeight: 'bold',
                  opacity: '0.9',
                }}
                _hover={{
                  fontWeight: 'bold',
                  opacity: '1',
                  color:'#fafafa',
                  bgGradient:'linear(to-r, #305cea, #773de2)'
                }}
                color='#fafafa'
                bgGradient='linear(to-r, #305cea, #773de2)'
                opacity="0.5"
                variant='solid'>
                  {button.name}
              </Button>
            )
          })
        }
      </Stack>
  )
}