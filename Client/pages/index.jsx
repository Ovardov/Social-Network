import { useEffect } from 'react'

const HomePage = () => {  
  useEffect(() => {
    if(window.location.hash && window.location.hash === '#_=_') {
      // Remove hash from facebook login callback
      window.location.href = window.location.href.split('#')[0]
    }
  }, [])

  return (
    <div>
      Home Page
    </div>
  )
}

export default HomePage
