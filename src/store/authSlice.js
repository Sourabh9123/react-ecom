import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access_token : "",
    refresh_token : "",
    first_name : "",
    last_name : "",
    email : "",
    current_time : "",
    is_login : false,
     

}

const  authSlice = createSlice({
    name : "authStatus",
    initialState,
    reducers : {
        login : (state, action) => {
           
            state.access_token = action.payload.access_token ;
            state.refresh_token = action.payload.refresh_token ;
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.is_login = true;

            // console.log(state.access_token, state.refresh_token)
           

        },
        logout : (state) => {
            state.access_token = "" ;
            state.refresh_token = "" ;
            state.email = "";
            state.first_name = "";
            state.last_name = "";
            state.is_login = false;
            
        }
    }
})

export const  {logout, login} = authSlice.actions; 

export default authSlice.reducer;


