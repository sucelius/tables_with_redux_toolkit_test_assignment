import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
  <Button sx={{ color: 'success' }} key='one'>
    Редактировать запись
  </Button>,
  <Button key='two'>Добавиит запись</Button>,
  <Button key='three'>Удалить запись</Button>,
];

export const ButtonsList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size='large' aria-label='large button group'>
        {buttons}
      </ButtonGroup>
    </Box>
  );
};
