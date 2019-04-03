import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

function InfoWindow(props) {
  const { classes, marker, data } = props;
  const infoWindowData = data.filter((house)=>{
    return data.id !== marker.id;
  })

  console.log(infoWindowData,"info data")

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`./images/houses/${marker.id}/main.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {data[0].price}
          </Typography>
          <Typography component="p">
            Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.

          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            View Listing
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default withStyles(styles)(InfoWindow);
