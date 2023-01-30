import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

export const getStaticProps = async() => {
    let res: any = await axios.get('http://localhost:5000/user')

   return {  
    props: {
        columns: ['ID', 'Username', 'Name'],    
        userData : res.data.data
    },
    revalidate: 40,
   }
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function Admin({userData,columns} : any) {
    
   console.log(userData);
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(userData.length);
 
   const handleChangePage = (event: unknown, newPage: number) => {
     setPage(newPage);
   };
 
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
   };
   const isLoggedIn = true;
    if (!isLoggedIn) {
        // Router.push('/login');
        return null;
      }
      // Render the page for logged in users
      return (
      <div> 
        {<TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    {columns.map((column: string) => {
                        return <StyledTableCell key={column}>{column}</StyledTableCell>
                    })}
                </TableRow>
                </TableHead>
                <TableBody>
                {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                    <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                        {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                        {row.username}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[1,userData.length]}
                component="div"
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    
    }

      </div>)
      ;
}

export default Admin;