import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PersonalInfo from './PersonalInfo'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import { useSelector } from 'react-redux'
import logo from '../../assets/logoJim.svg'
import { Button } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="tabPanelPrifle"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export default function SideTabs() {
  const userData = useSelector((state) => {
    return state.authReducer.user
  })
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  let [isOpen, setOpen] = React.useState(false)
  const handleOpenProfileSIdebar = () => {
    setOpen(true)
  }
  const handleCLoseProfileSidebar = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        minHeight: 'calc(100vh - 90px)',
        // height:'fit-content',
        marginTop: '90px',
        position: 'relative',
        flexDirection: { xs: 'column', sm: 'row' },
        // top:'90px'
      }}
    >
      <div className="opnNavProfile">
        <Button
          onClick={handleOpenProfileSIdebar}
          variant="contained"
          color="error"
        >
          <MenuOpenIcon />
        </Button>
      </div>
      <div className="tabsContainerMain">
        {/* {isOpen? */}
        <div
          className={!isOpen ? 'closePrifleNav' : 'closePrifleNav animCloseNav'}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleCLoseProfileSidebar}
          >
            <HighlightOffIcon />
          </Button>
        </div>
        {/* //  : null } */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          // style={{ position: 'sticky', top: '90px' }}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={
            !isOpen ? 'tabsSideBar hideProfileNav' : 'tabsSideBar showProileNav'
          }
          sx={{
            border: 1,
            borderColor: 'divider',
            width: { sm: '280px' },
            padding: '30px 0px',
            textAlign: 'start',
            // height:'100%',
            minHeight: 'calc(100vh - 90px)',
            borderLeftColor: 'var(--red)',
            borderLeftWidth: '5px',
            flexDirection: { xs: 'row' },
            background: 'white',
            // position:{xs:'sticky',sm:'inherit'},
            // top:{xs:'90px'}
          }}
        >
          <Tab
            icon={<PermIdentityIcon className="prIfIcon" />}
            iconPosition="start"
            label="Personal Information"
            {...a11yProps(0)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'capitalize',
              fontWeight: '600',
            }}
            onClick={handleCLoseProfileSidebar}
          />
          {userData?.role === 'Seller' ? (
            <Tab
              icon={<AccountBalanceIcon className="prIfIcon" />}
              iconPosition="start"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'capitalize',
                fontWeight: '600',
              }}
              label="Bank Detail"
              {...a11yProps(1)}
              onClick={handleCLoseProfileSidebar}
            />
          ) : null}
          <Tab
            label="Setting"
            icon={<SettingsApplicationsIcon className="prIfIcon" />}
            iconPosition="start"
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'capitalize',
              fontWeight: '600',
            }}
            {...a11yProps(2)}
            onClick={handleCLoseProfileSidebar}
          />
          <div className="tabLogo">
            <img src={logo} alt="" />
          </div>
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <PersonalInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <img
          className="csImg"
          src="https://st4.depositphotos.com/1006832/20098/i/600/depositphotos_200986760-stock-photo-coming-soon-red-text-white.jpg"
          alt=""
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <img
          className="csImg"
          src="https://st4.depositphotos.com/1006832/20098/i/600/depositphotos_200986760-stock-photo-coming-soon-red-text-white.jpg"
          alt=""
        />
        {/* Item Three */}
      </TabPanel>
    </Box>
  )
}
