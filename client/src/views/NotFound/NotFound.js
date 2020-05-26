/* React */
import React from 'react';

/* Materialize */
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

/* Components */
import { GridContainer, GridItem } from 'Components/Grid';

/* Materialize Style */
const useStyles = makeStyles((theme)=>({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

/* Component */
const NotFound = ( props )=>{
  const classes = useStyles();

  return (
    <div className={ classes.root }>
      <GridContainer
        justify="center"
        spacing={4}
      >
        <GridItem lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <img
              alt="Under development"
              className={ classes.image }
              src="/public/images/undraw_page_not_found_su7k.svg"
            />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default NotFound;