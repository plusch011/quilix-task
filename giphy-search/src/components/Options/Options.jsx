import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import './options.scss';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderColor: 'white',
    width: '100px',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));


export default function Options({ 
  handleMaxCountChange,
  ratingValue, 
  handleGifWidthChange,
  handleRatingValueChange,
}) {


  const classes = useStyles();


  return (
    <form className='options' noValidate autoComplete="off">
      <TextField
        id="outlined-search"
        label="Gif width"
        type="text"
        className={classes.textField}
        onChange={handleGifWidthChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-search"
        label="Max count"
        type="text"
        onChange={handleMaxCountChange}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
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
}