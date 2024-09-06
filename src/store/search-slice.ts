import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchResult } from "../types/user";

interface SearchState {
    query: string
    results: SearchResult[]
}

const initialState : SearchState = {
    query: "",
    results: [
        {
            name: "rach",
            username: "@fortherAch",
            bio: "All for Jesus and the A #GoBraves",
            avatar: "/src/styles/profile.png"
        },
        {
            name: "rach",
            username: "@Rache243",
            bio: "catch me @ a concert or behind a bar",
            avatar: "/src/styles/profile.png"
        },
        {
            name: "rach",
            username: "@racheltjhia",
            bio: "𓆩︎☠︎𓆪",
            avatar: "/src/styles/profile.png"
        },
        {
            name: "Rachel Lindsay",
            username: "@TheRachLindsay",
            bio: "✨Media Personality ⚖️Attorney 🎙 @Higher_Learning  🎬 @ExtraTV  🎬 @mtvghosted",
            avatar: "/src/styles/profile.png"
        },
        {
            name: "Rachel Bright",
            username: "@Rach_Bright",
            bio: "",
            avatar: "/src/styles/profile.png"
        },
        {
            name: "Alvin Dwi",
            username: "@alvindvvi",
            bio: "fortis fortuna adivuat",
            avatar: "/src/styles/cewe.png"
        }
    ]
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        resetSearch: () => initialState,
    }
})

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;