import { GridColDef } from '@mui/x-data-grid';
import { Table, AddEducationModal } from '../../components/Index';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEducation } from '../../store/educationSlice';
import { tableData } from '../../store/tableSlice';

export const EducationPortal = ({}) => {
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    {
      field: 'actions',
      headerName: 'Удалить',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label='delete'
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id: string): void => {
    dispatch(deleteEducation(id));
    dispatch(tableData(''));
  };
  const educations = useAppSelector((state) => state.educations.list);

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'flex',
            md: 'flex',
            alignItems: 'center',
            gap: 5,
            marginBottom: '1rem',
          },
        }}
      >
        <AddEducationModal />
      </Box>
      <Table columns={columns} rows={educations}></Table>
    </>
  );
};
