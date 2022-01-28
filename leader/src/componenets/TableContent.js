import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHeader from './TableHeader/TableHeader';
import TableSortLabel from '@mui/material/TableSortLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { TablePagination } from '@mui/material/TablePagination';
import { TableContainer,TableHead } from '@mui/material';



export default function TableContent (){
    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(1)

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc') 
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')
    }
    return (
        <>
        <TableContainer>
            <Table>
                <TableHeader
                    valueToOrderBy={valueToOrderBy}
                    orderDirection={orderDirection}
                    handleRequestSort={handleRequestSort}
                >

                </TableHeader>
            </Table>
        </TableContainer>
        
        </>
    )
}



