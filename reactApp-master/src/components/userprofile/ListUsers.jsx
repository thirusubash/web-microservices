import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

function ListUsers() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile No</TableCell>
            <TableCell>Country Code</TableCell>
            <TableCell>PAN</TableCell> {/* Additional user detail */}
            <TableCell>Aadhaar</TableCell> {/* Additional user detail */}
            <TableCell>GSTIN</TableCell> {/* Additional user detail */}
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobileNo}</TableCell>
              <TableCell>{user.countrycode}</TableCell>
              <TableCell>{user.PAN}</TableCell> {/* Additional user detail */}
              <TableCell>{user.adhaar}</TableCell> {/* Additional user detail */}
              <TableCell>{user.gstin}</TableCell> {/* Additional user detail */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ListUsers;
