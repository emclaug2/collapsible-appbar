import React from 'react'

// Material-UI components

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { listItems } from './list';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  banner: {
    background: 
    'linear-gradient(rgba(0, 123, 193, 1), rgba(0, 75, 158, 1)),url(https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzODg2NTc0MDky/abraham-lincoln-9382540-2-402.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundBlendMode: 'soft-light',
    minHeight: theme.spacing.unit * 34,
    color: '#fff',
    padding: '15px 0'
  },
  bannerMain: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: theme.spacing.unit * 8,
  },
  h5: {
    margin: '15px 0'
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  header: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    transform: 'translateY(-100%)',
    transition: 'all 0.5s ease-in-out'
  },
  top: {
    transform: 'translateY(0%)'
  },
  noPadLeft: {
    paddingLeft : '0px'
  }
})


class App extends React.Component {
  state = {
    list: listItems,
    activeClass: '',
    opacity: 1
  }

  componentDidMount() {
    window.addEventListener('scroll', (event) => {
      this.setState({ opacity: window.scrollY });
      if (window.scrollY > 70) {
        this.setState({
          activeClass: 'top'
        });
      } else {
        this.setState({
          activeClass: ''
        });
      }
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <AppBar className={classes.header + [ this.state.activeClass ?  classes.top : '']}>
          <Toolbar>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div style={{ flex: 1 }}>
              <Typography variant="h6" color="inherit">
                President
              </Typography>
              <Typography className="sub-text" variant="body1" color="inherit">
                Leader of the Free World
              </Typography>
            </div>
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
        <div className={classes.banner}>
          <Toolbar className={classes.bannerMain}>
            <div className={classes.flexCenter}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit">
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className={classes.content} style={{ opacity: 1 - this.state.opacity / 200 }}>
              <Typography variant="h4" color="inherit">
                President
              </Typography>
              <Typography variant="h5" className={classes.h5} color="inherit">
                Commander in Chief
              </Typography>
              <Typography variant="h6" color="inherit">
                Leader of the Free World
              </Typography>
            </div>

          </Toolbar>
        </div>
        <List component="nav">
          {
            this.state.list.map(function (item, i) {
              return (<ListItem key={`item-${i}`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <div>
                  <ListItemText primary={item.president}/>
                  <ListItemText  secondary={item.party} />
                  <ListItemText className={classes.noPadLeft} secondary={item.took_office} />
                </div>
              </ListItem>)
            })
          }
        </List>
      </div>
    )
  }
}
export default (withStyles(styles)(App));