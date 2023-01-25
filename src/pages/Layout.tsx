import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { themeColor } from '../stores/theme'
import { Classes, Colors } from '@blueprintjs/core'
import { useStore } from '@nanostores/react'
import Loading from '../components/Loading'
import AppNavBar from '../components/AppNavBar'
const Layout = () => {
  const darkMode = useStore(themeColor)

  let themeConfig = {
    backgroundColor: darkMode === 'dark' ? Colors.BLACK : Colors.WHITE,
    width: '100%',
    height: '100vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className={darkMode === 'dark' ? Classes.DARK : ''} style={themeConfig}>
      <SessionAuth>
        <AppNavBar />
        <Loading />
      </SessionAuth>
    </div>
  )
}

export default Layout
