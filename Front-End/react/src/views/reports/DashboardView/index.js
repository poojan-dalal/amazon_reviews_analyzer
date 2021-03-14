import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { withRouter } from "react-router";
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [task, setTask] = useState({});
  // let task = {}

  useEffect(() => {
    const link = window.location.href;
    const id = link.split('/')
    const id1 = id[id.length - 1]
    axios.get(`https://hackbash-c75bb-default-rtdb.firebaseio.com/hackbash-c75bb-default-rtdb.json`)
      .then(res => {
        setTask(res.data.Data[id1])
      
        console.log(task)
        //  setTasks(Tasks);
      })
  }, [task])

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget avgrating={task['avg']} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers comments={task['no_of_comm']} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales task={task.goodreviews} type={"Good Reviews"} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice task={task.goodreviews} type={"Good Reviews"} color={"green"} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales task={task.badreviews} type={"Bad Reviews"} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice task={task.badreviews} type={"Bad Reviews"} color={"red"} />
          </Grid>
        </Grid>
      </Container>
    </Page>
    // <div>Working</div>
  );
};

export default Dashboard;
