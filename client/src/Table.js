import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
  { id: 'player_name', label: 'Name', minWidth: 220 },
  { id: 'number_of_sprints', label: 'Num of Sprints', minWidth: 110,  align: 'center' },
  {
    id: 'minutes_played',
    label: 'Min Played',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'avg_speed',
    label: 'Avg. Speed (km/h)',
    minWidth: 130,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'max_speed',
    label: 'Max Speed (km/h)',
    minWidth: 130,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'distance',
    label: 'Distance(km)',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'HID_distance',
    label: 'HID Distance (>15km/h)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'distance_speed_range_below_15',
    label: '[0-15]',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'distance_speed_range_20-to_25',
    label: '[20-25]',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'distance_speed_range_25_to_30',
    label: '[25-30]',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'distance_speed_range_over_30',
    label: 'Over 30',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'max_acceleration',
    label: 'Max',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'number_of_accelerations_over_3',
    label: 'Over 3',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'number_of_accelerations_over_4',
    label: 'Over 4',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'number_of_descelerations_over_3',
    label: 'Over 3',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'number_of_descelertions_over_4',
    label: 'Over 4',
    minWidth: 100,
    align: 'center'
  }
];

export default function StickyHeadTable({rows}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
              <TableCell sx={{ fontWeight: 'bold', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }} size={'small'} align="center" colSpan={7}>
                --------
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }} size={'small'} align="center" colSpan={4}>
              Distance Speed Range (km/h)
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }} size={'small'} align="center" colSpan={3}>
              Acceleration (m/s²)
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }} size={'small'} align="center" colSpan={2}>
              Decelerations (m/s²)
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                sx={{ fontWeight: 'bold'}}
                size={'small'}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow  sx={{
                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white'
                  }}
                  hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell size={'small'} key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
