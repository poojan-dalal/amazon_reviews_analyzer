import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    axios.get(`https://hackbash-c75bb-default-rtdb.firebaseio.com/hackbash-c75bb-default-rtdb.json`)
    .then(res => {
      const Tasks = res.data.Data;
      console.log(Tasks)
     setTasks(Tasks);
    })
  },[])

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results Tasks={tasks} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
