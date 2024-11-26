import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: "",
}


export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload;
        }
    }
})
export const getTab = (state) => state.dashboard.tab;
export const { setTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;