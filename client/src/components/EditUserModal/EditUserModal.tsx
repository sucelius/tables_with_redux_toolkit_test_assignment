import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeUser } from '../../store/userSlice';
import { useState } from 'react';

export const EditUserModal = () => {
  const [open, setOpen] = useState(false);
  const [educationName, setEducationName] = useState('');
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

  const handleChange = (event: SelectChangeEvent) => {
    setEducationName(event.target.value as string);
  };

  const rowId = useAppSelector((state) => state.tableData.id);
  const handleSubmit = async () => {
    const dataForServer = {
      id: rowId,
      name: inputText,
      educationName: educationName,
    };
    dispatch(changeUser(dataForServer));
    setOpen(false);
    setEducationName('');
  };

  return (
    <div>
      <Button
        variant='contained'
        endIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        {' '}
        Изменить{' '}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Изменить данные пользователя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для изменения данных пользователя нужно ввести новое имя и выбрать
            образование.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Имя'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleTextChange}
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id='demo-multiple-name-label'>
              Выбрать образование
            </InputLabel>
            <Select
              labelId='demo-multiple-name-label'
              input={<OutlinedInput label='Выбрать образование' />}
              // multiple
              sx={{ width: 300 }}
              value={educationName}
              onChange={handleChange}
            >
              {educations.map((element: any) => {
                return (
                  <MenuItem key={element.id} value={element.name}>
                    {element.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Изменить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
