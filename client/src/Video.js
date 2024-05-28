import React from 'react'

const Video = (courseUrl) => {
  
  return (
    <div>
      <video
      src={courseUrl}
      width="100%"
      height="auto"
      />
    </div>
  )
}

export default Video