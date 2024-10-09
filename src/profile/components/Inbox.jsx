import { useUser } from '@clerk/clerk-react';
import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useEffect, useState } from 'react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList'
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel'

function Inbox() {
  const { user } = useUser()
  const [userId, setUserId] = useState()
  const [channelUrl, setChannelUrl] = useState()

  useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress.emailAddress).split('@')[0]
      setUserId(id)
    }
  }, [user])

  return (
    // The chat interface can expand up to the dimensions of your parent component.
    // To achieve a full-screen mode, apply the following CSS rules to the parent element.
    <div style={{ width: '100%', height: '750px' }}>
      <SendBirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID} userId={userId} nickname={user.fullName} profileUrl={user.imageUrl} allowProfileEdit={true}>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 h-full'>
          {/* Channel List */}
          <div className='p-5 border shadow-lg'>
            <GroupChannelList onChannelSelect={(channel)=>{
              setChannelUrl(channel?.url)
            }} channelListQueryParams={
              {
                includeEmpty: true
              }
            } />
          </div>

          {/* Channel / Message Area */}
          <div className='col-span-2 shadow-lg'>
            <GroupChannel channelUrl={channelUrl}/>
          </div>
        </div>

      </SendBirdProvider>

    </div>
  )
}

export default Inbox;