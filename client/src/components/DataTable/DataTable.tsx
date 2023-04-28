
import { DataGrid, DataGridProps,  GridEventListener } from '@mui/x-data-grid';
import {  useAppDispatch } from '../../hooks';
import { tableData } from '../../store/tableSlice';
import { Box } from '@mui/material';



export const DataTable: React.FC<DataGridProps> = ({ rows, columns }) => {
  const dispatch = useAppDispatch();

  const handleColumnHeaderClick :GridEventListener<'rowClick'> = (params) => {
    const id = params.id.toString()
    dispatch(tableData(id))
  };

  
  return (
    <Box  sx={{ display: { xs: 'flex', md: 'flex' ,alignItems: 'center', gap: 5}, height: 400, width: 900}}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleColumnHeaderClick} 
        
      />
    </Box>
  );
};
