import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './GifModalWindow.scss';


export default function GifModalWindow({ open, onClose, modalInfo }) {
  const useStyles = makeStyles({
    card: {
      maxWidth: 500,
      outline: 'none',
      border: '3px solid #F9F0DA',
      background: '#F9F0DA',
    },
    media: {
      height: 200,
    },
  });

  const classes = useStyles();

  return (
    <div className="modal-container">
      <Modal
        className='modal'
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={modalInfo.images.fixed_width_still.url}
              title="gif"
              onClick={() => {window.open(modalInfo.source)}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {modalInfo.title}
              </Typography>
              <Typography variant="body1" color="textPrimary" component="span">
                Rating: {modalInfo.rating}
                <br />
                Import date: {modalInfo.import_datetime}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Modal>
    </div>
  );
}
