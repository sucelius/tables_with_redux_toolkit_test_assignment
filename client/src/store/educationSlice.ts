import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

type Education = {
  id?: string;
  name: string;
};

type EducationState = {
  list: Education[];
  loading: boolean;
  error: string | null;
};

const initialState: EducationState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchEducations = createAsyncThunk<
  Education[],
  undefined,
  { rejectValue: string }
>(
  'educations/fetchEducations',

  async function (_, { rejectWithValue }) {
    const response = await fetch('http://localhost:4000/educations/data');

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();
    return data;
  }
);

export const addNewEducation = createAsyncThunk<
  Education,
  Education,
  { rejectValue: string }
>('educations/addNewEducation', async function (data, { rejectWithValue }) {
  const education = {
    name: data.name,
  };

  const response = await fetch('http://localhost:4000/educations/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(education),
  });
  if (!response.ok) {
    return rejectWithValue('Неизвестна ошибка на сервере.');
  }

  return (await response.json()) as Education;
});

export const deleteEducation = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/deleteEducation', async function (id, { rejectWithValue }) {
  const response = await fetch('http://localhost:4000/educations/data', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: id,
  });

  if (!response.ok) {
    return rejectWithValue(`Удалить нельзя, поле используется.`);
  }

  return id;
});

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    cleanError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewEducation.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewEducation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (education) => education.id !== action.payload
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { cleanError } = educationSlice.actions;
export default educationSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
