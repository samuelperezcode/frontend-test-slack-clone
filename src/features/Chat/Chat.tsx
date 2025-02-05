import { Delete } from '@mui/icons-material'
import { Box, Typography, Divider, IconButton, Badge, Chip } from '@mui/material'
import { useChannelStore } from '../../store/channels'
import InputChat from '../../components/InputChat/InputChat'
import { type UUID } from '../../store/types'
import { useNavigate } from 'react-router-dom'
import ListOfMessages from '../../components/ListOfMessages/ListOfMessages'

function Chat () {
  const currentChannel = useChannelStore(state => state.currentChannel)
  const removeChannel = useChannelStore(state => state.removeChannel)
  const navigate = useNavigate()
  const membersNumber = currentChannel?.members !== undefined ? currentChannel?.members.length + 1 : 1
  const handleRemoveCLick = () => {
    removeChannel(currentChannel?.id as UUID)
    navigate('/')
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ marginTop: '60px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h4'>#{currentChannel?.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
            <Badge color="secondary" badgeContent={membersNumber} max={999}>
              <Chip label="Members" />
            </Badge>
            <IconButton onClick={handleRemoveCLick}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        {/* List of Sms */}
        <ListOfMessages messages={currentChannel?.messages} />

        {/* Chat input */}
        <InputChat />
    </Box>
  )
}

export default Chat
