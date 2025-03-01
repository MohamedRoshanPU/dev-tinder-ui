import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataType {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const initialState: UserDataType = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      (Object.keys(state) as (keyof UserDataType)[]).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
