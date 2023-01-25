import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import {
  Navbar,
  NavbarGroup,
  Alignment,
  NavbarHeading,
  NavbarDivider,
  ButtonGroup,
  Button,
  Classes
} from '@blueprintjs/core'
import { useStore } from '@nanostores/react'
import { currentPage } from '../../stores/navigation'
import { themeColor } from '../../stores/theme'
import Cookies from 'js-cookie'

const AppNavBar = () => {
  async function onLogout() {
    await signOut()
    Cookies.remove('sFrontToken')
    Cookies.remove('sIRTFrontend')
    navigate('/login')
  }

  const currentPageName = useStore(currentPage)

  const navigate = useNavigate()
  const location = useLocation()
  const darkMode = useStore(themeColor)

  const setThemeColor = (e: any) => {
    e.stopPropagation()
    if (darkMode === 'dark') {
      themeColor.set('light')
    } else {
      themeColor.set('dark')
    }
  }

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading style={{ width: '6em' }}>
          <div style={{ textAlign: 'center' }}>{currentPageName}</div>
        </NavbarHeading>
        <NavbarDivider style={{ marginLeft: '0' }} />
        <ButtonGroup className={Classes.MINIMAL} large={true}>
          <Button text={'Dashboard'} icon={'grouped-bar-chart'} onClick={() => navigate('/')} />
          <Button text={'Docs'} icon={'document'} onClick={() => navigate('/docs')} />
          <Button text={'Bookmarks'} icon={'bookmark'} onClick={() => navigate('/bookmarks')} />
        </ButtonGroup>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button
          className={Classes.MINIMAL}
          icon={darkMode === 'dark' ? 'flash' : 'moon'}
          large={true}
          onClick={(e) => setThemeColor(e)}
        />
        <Button className={Classes.MINIMAL} large={false} onClick={onLogout}>
          Sign Out
        </Button>
      </NavbarGroup>
    </Navbar>
  )
}

export default AppNavBar
