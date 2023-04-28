
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Table, NestedModal, EditUserModal } from '../../components/Index';
import { GridColDef } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteUser } from '../../store/userSlice';
import React, { useState } from 'react';

export const User: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string): void => {
    dispatch(deleteUser(id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100  },
    { field: 'name', headerName: 'Сотрудник', width: 300 },
    { field: 'educationName', headerName: 'Образование', width: 300 },
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
  const users = useAppSelector((state) => state.users.list);

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'flex', alignItems: 'center', gap: 5 , marginBottom:'1rem'},
        }}
      >
        <NestedModal />
        <EditUserModal />
      </Box>
      <Table columns={columns} rows={users}></Table>
    </>
  );
};
