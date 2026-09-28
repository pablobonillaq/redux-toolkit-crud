import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Peter Doe",
        email: "peter.doe@gmail.com",
        github: "peter.doe",
    },
    {
        id: "2",
        name: "Lena Whitehouse",
        email: "lena@gmail.com",
        github: "lena",
    },
    {
        id: "3",
        name: "Phil Less",
        email: "phil@gmail.com",
        github: "phil",
    },
    {
        id: "4",
        name: "John Camper",
        email: "john@gmail.com",
        github: "midudev",
    },
]

export type UserId = string

export interface User {
    name: string,
    email: string,
    github: string
}

export interface UserWithId extends User {
    id: UserId
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__")
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, {id, ...action.payload}]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id)
        }
    }
})

export default usersSlice.reducer
export const { addNewUser, deleteUserById} = usersSlice.actions