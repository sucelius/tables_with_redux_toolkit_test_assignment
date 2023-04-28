import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addNewUser, fetchUsers } from '../../store/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { EducationPortal } from '../EducationPortal/EducationPortal';
import { tableData } from '../../store/tableSlice';
import { Education } from '../../screens/Education/Education';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 5,
  pb: 3,
};

interface MyComponentProps {
  setEducationName: React.Dispatch<React.SetStateAction<any>>;
}

type Education = {
  id?: string;
  name?: string;
};

const ChildModal = ({ setEducationName }: MyComponentProps) => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const educations = useAppSelector((state) => state.educations.list);
  const [currentEducationst, setCurrentEducationst] = useState<Education>({
    id: '',
    name: '',
  });
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    dispatch(tableData(''));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEducationName({
      id: '',
      name: '',
    })
  };

  const rowId = useAppSelector((state) => state.tableData.id);
  useEffect(() => {
    const data = educations.find((edu) => edu.id == rowId)!;
    setCurrentEducationst(data);
  }, [rowId]);

  const handleSubmit = async () => {
    setEducationName(currentEducationst.name);
    setOpen(false);
    setInputText('');
  };

  const isFormValid = rowId !== '';

  return (
    <>
      <Box>
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Box>
          <Dialog open={open} onClose={handleClose}  maxWidth={false}>
            <DialogTitle>Добавить образование</DialogTitle>
            <DialogContent>
              <EducationPortal />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Отмена</Button>
              <Button
                variant='contained'
                color='success'
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Выбрать
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export const NestedModal = () => {
  const [educationName, setEducationName] = useState('');
  const educations = useAppSelector((state) => state.educations.list);

  const [inputText, setInputText] = useState('');
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state);

  const handleChange = (event: SelectChangeEvent) => {
    setEducationName(event.target.value as string);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    fetchUsers();
    setOpen(false);
    setEducationName('');
  };

  const handleSubmit = async () => {
    const dataForServer = { name: inputText, educationName: educationName };
    dispatch(addNewUser(dataForServer));
    fetchUsers();
    setOpen(false);
    setEducationName('');
    setInputText('');
  };

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Button
        size='medium'
        variant='contained'
        color='success'
        onClick={handleOpen}
      >
        Добавить сотрудника
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography variant='h6'>
            {' '}
            Введите имя сотрудника и его уровень образования.
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Имя сотрудника'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleTextChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id='demo-multiple-name-label'>
                Выбрать образование
              </InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                input={<OutlinedInput label='Выбрать образование' />}
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
            <ChildModal setEducationName={setEducationName} />
          </Box>
          <DialogActions>
            <Button type='submit' onClick={handleSubmit}>
              Добавить
            </Button>
            <Button onClick={handleClose}>Закрыть</Button>
          </DialogActions>
        </Box>
      </Modal>
    </Box>
  );
};
