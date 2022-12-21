import {createSlice} from '@reduxjs/toolkit';

export const mainInterfaceSlice = createSlice({
    name : 'mainInterfaceActiveTab',
    initialState : {
        value : '0'
    },
    reducers : {
        setActiveMenu : (state, action) => void (state.value = action.payload)
    }

}); 

export const {setActiveMenu} = mainInterfaceSlice.actions;

export default mainInterfaceSlice.reducer;