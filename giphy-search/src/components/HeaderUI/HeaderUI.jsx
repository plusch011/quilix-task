import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';


const limits = [10, 20, 50, 100, 400, 1000, Infinity];

const currencies = [
  {
    value: 'G',
  },
  {
    value: 'PG',
  },
  {
    value: 'PG-13',
  },
  {
    value: 'R',
  },
];

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  bar: {
    background: '#071739',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
  fullList: {
    width: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#b9d5fd',
  },
  textField: {
    margin: '8px',
    borderColor: 'white',
    width: '100px',
  },
}));

export default function HeaderUI({
  maxCount,
  handleMaxCountChange,
  ratingValue,
  handleRatingValueChange,
  handleQuerryChange,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({ top: false });


  const toggleDrawer = (open) => event => {
    event.persist();

    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;

    setState({ top: open });
  };


  const fullList = () => (
    <form className={classes.fullList} noValidate autoComplete="off">
    <TextField
        id="outlined-select-currency"
        select
        label="Download limit"
        className={classes.textField}
        value={maxCount}
        onChange={handleMaxCountChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
        variant="outlined"
      >
        {limits.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-currency"
        select
        label="Rating"
        className={classes.textField}
        value={ratingValue}
        onChange={handleRatingValueChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
        variant="outlined"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="top"
            open={state.top}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {fullList('top')}
          </SwipeableDrawer>
          <Typography className={classes.title} variant="h6" noWrap>
            QULIX GIPHY
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleQuerryChange}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
