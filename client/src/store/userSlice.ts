import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

type User = {
  id?: string;
  name: string;
  educationName: string;
};

type UserState = {
  list: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>(
  'users/fetchUsers',

  async function (_, { rejectWithValue }) {
    const response = await fetch('http://localhost:4000/users/data');

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();
    return data;
  }
);

export const addNewUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/addNewUser',
  async function (data, { rejectWithValue }) {
    const user = {
      name: data.name,
      educationName: data.educationName,
    };

    const response = await fetch('http://localhost:4000/users/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      return rejectWithValue(
        'Не могу добавить пользователя. Все поля должны быть заполнены.'
      );
    }

    return (await response.json()) as User;
  }
);

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/deleteUser', async function (id, { rejectWithValue }) {
  const response = await fetch('http://localhost:4000/users/data', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: id,
  });

  if (!response.ok) {
    return rejectWithValue('Не могу удалить пользователя. Server error.');
  }

  return id;
});

export const changeUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/changeUser',
  async function (data, { rejectWithValue }) {
    const user = {
      id: data.id,
      name: data.name,
      educationName: data.educationName,
    };

    const response = await fetch('http://localhost:4000/users/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      return rejectWithValue('Все поля должны быть заполнены.');
    }

    return (await response.json()) as User;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewUser.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user.id !== action.payload);
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user.id !== action.payload.id);
        state.list.push(action.payload);
      });

    // .addMatcher(isError, (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // });
  },
});

export default userSlice.reducer;
