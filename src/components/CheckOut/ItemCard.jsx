import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { BACKEND_URL } from '../../config/config.mjs';


const useStyles = makeStyles(() => ({
  root: {
    // minHeight: '100vh',
    // minWidth: '',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // background: '#F5F5F5',
  },

  price: {
    textAlign: 'center',
    color: 'red'
  }
}));

export default function ItemCard({ itemInfo }) {
  const classes = useStyles();
  const [imageId, setImageId] = useState();

  useEffect(() => {
    if (itemInfo.itemId <= 9) {
      setImageId(() => `00${itemInfo.itemId}`);
    } else {
      setImageId(() => `0${itemInfo.itemId}`);
    }
  }, [itemInfo.itemId]);

  return (
    <Card>
      <CardContent className={classes.root}>
        <Grid container direction="row" spacing={4}>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              height="100"
              image={`${BACKEND_URL}/api/items/image/${imageId}`}
              alt="drink"
            />
          </Grid>

          <Grid item xs={8}>
            <Typography variant="subtitle1">
              {itemInfo.itemName}
            </Typography>
            <Typography variant="body2" gutterBottom color="textSecondary">
              {`${itemInfo.sizeChoice} . ${itemInfo.tempChoice}`}
            </Typography>
            <Typography variant="body2" gutterBottom color="textSecondary">
              {`qty: ${itemInfo.quantity}`}
            </Typography>
          </Grid>

          <Grid item xs={2} className={classes.price}>
            <Typography variant="subtitle1">{`S$${itemInfo.itemTotal}`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
