import React, { useState, useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { AuthService } from '../index';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserCurd = () => {
  const authService = useMemo(() => new AuthService(), []); // Use useMemo to initialize authService once

  const [userinfo, setUserInfo] = useState([]);
  const url = "https://117.247.104.242:8080/users";

  useEffect(() => {
    // Fetch data using Axios
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`, // Assuming you need an authorization token
      },
    })
      .then((response) => {
        setUserInfo(response.data); // Update the state with the retrieved data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [authService]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">PAN</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userinfo.map((x) => (
            <StyledTableRow key={x.id}>
              <StyledTableCell component="th" scope="row">
                {x.username}
              </StyledTableCell>
              <StyledTableCell align="right">{x.pan}</StyledTableCell>
              <StyledTableCell align="right">{x.adhaar}</StyledTableCell>
              <StyledTableCell align="right">{x.id}</StyledTableCell>
              <StyledTableCell align="right">{x.id}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserCurd;
