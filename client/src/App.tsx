import { useEffect } from 'react'
import {  useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from './hooks'
import {NavigationBar} from './components/Index'
import { Route, Routes } from 'react-router-dom'
import { Education } from './screens/Education/Education'
import { User } from './screens/User/User'
import { fetchUsers } from './store/userSlice'
import { cleanError, fetchEducations } from './store/educationSlice'
import { RootState } from './store';
import { Box } from '@mui/material';



function App() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const error = useAppSelector((state: RootState) => state.educations.error);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(cleanError(''))
    }
  }, [error, enqueueSnackbar]);
  
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchEducations());
  }, [dispatch])

  return (
   <>
      <NavigationBar/>
    <Box sx={{  marginTop: '1rem' }}>
      <Routes>
        <Route path="*" element={<User/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/education' element={<Education/>}/>
      </Routes>
    </Box>
    </>
    
  )
}

export default App
