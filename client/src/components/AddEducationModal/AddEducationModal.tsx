import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { addNewEducation } from '../../store/educationSlice';
import { useState } from 'react';

export const AddEducationModal = () => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const educations = useAppSelector((state) => state.educations.list);
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const rowId = useAppSelector((state) => state.tableData.id);
  const handleSubmit = async () => {
    const dataForServer = { name: inputText };
    dispatch(addNewEducation(dataForServer));
    setOpen(false);
    setInputText('');
  };

  const isFormValid = inputText.trim() !== '';

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Button
        size='medium'
        variant='contained'
        color='success'
        onClick={handleClickOpen}
      >
        Добавить уровень образования
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить образование</DialogTitle>
        <DialogContent sx={{ width: 500, height: 100 }}>
          <DialogContentText>Введите уровень образования</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Уровень образования'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
