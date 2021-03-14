import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, Tasks, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  console.log(Tasks)
  // console.log('working')
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Start Page
                </TableCell>
                <TableCell>
                  End Page
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            {Object.keys(Tasks).map((taskId) => {
              return (
                <TableRow key={taskId}>

                  <TableCell>
                    <a href={Tasks[taskId]['url']} target="_blank">{Tasks[taskId]['name']}</a>
                  </TableCell>
                  <TableCell>
                    {Tasks[taskId]['start_page']}
                  </TableCell>
                  <TableCell>
                    {Tasks[taskId]['end_page']}
                  </TableCell>
                  <TableCell>
                    {Tasks[taskId]['exit'] ? <Link to={{
                      pathname: `/app/dashboard/${taskId}`,
                      task: Tasks[taskId]
                    }} >{"Completed"}</Link> : "In Progress..."}
                  </TableCell>
                </TableRow>
              )

            })}
            <TableBody>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Object.keys(Tasks).length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};


export default Results;
