import Router from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

const withAuth = (WrappedComponent) => (props) => {
  const { isLogged, isAuthLoading } = useAuth()

  useEffect(() => {
    if (!isLogged && !isAuthLoading) {
      // if (ctx && ctx.req) {
      //   ctx.res.writeHead(302, { Location: '/login' })
      //   ctx.res.end()
      //   return;
      // }

      Router.push('/login')
    }

  }, [isLogged, isAuthLoading])

  return (
    <>
      {isAuthLoading && <div>Loading...</div>}
      {!isAuthLoading && <WrappedComponent {...props} />}
    </>
  )

}

export default withAuth