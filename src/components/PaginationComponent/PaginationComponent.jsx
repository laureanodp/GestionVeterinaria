import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({ count, page, onChange }) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
    <Pagination 
      count={count} 
      page={page} 
      onChange={onChange} 
      color="primary" 
      siblingCount={1} 
      boundaryCount={1} 
    />
  </Box>
);

export default PaginationComponent;