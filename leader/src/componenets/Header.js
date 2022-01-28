import React from "react";

function Header() {
  return (
    <div>
      <div>
        <h1>Leaderboard</h1>
        <button>Add player</button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <div className="table">
            <Box>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Units</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Points</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" className="name">
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        className="location"
                        font-weight="bold"
                      >
                        {row.location}{" "}
                      </TableCell>

                      <TableCell align="right" className="date">
                        {row.date}
                      </TableCell>

                      <TableCell align="right">{row.units}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </div>
        </TableContainer>
      </div>
    </div>
  );
}

export default Header;
