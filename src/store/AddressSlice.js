import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const initialState = {
    is_loading :false,
    is_error : false,
    error_message :null,
    data : []
}

export const deleteAddress = createAsyncThunk( "deleteAddress", async (address_id, {getState}) => {
    const state = getState()

    const url = `http://localhost:8000/api/cart/address/${address_id}/`;
    console.log(url)
    const token = state.authentication.access_token
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    const response = await axios.delete(url, {headers})
    return  response.data

})

export const createAddress = createAsyncThunk( "createAddress", async (data, { getState}) => {
    const state = getState();
    const url = "http://localhost:8000/api/cart/address/";
    
    const token = state.authentication.access_token
    
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(url,data, {headers})
      return response.data
    
} )


export const featchAddress = createAsyncThunk("featchAddress", async (_, { getState }) => {
    
    const state = getState();
    const token = state.authentication.access_token;

    const url = "http://localhost:8000/api/cart/address/";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

    const response = await axios.get(url , {headers})
    return response.data
} )



const AddressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
           builder.addCase(featchAddress.fulfilled, (state, action) =>{
            state.is_error = false
            state.is_loading =false
            state.data = action.payload
           });
           builder.addCase( featchAddress.rejected, (state, action) => {
                state.is_error = true
                state.is_loading = false
                state.error_message = action.error.message;
             
                console.error("Failed to fetch address:", action.error.message);
           } );
           builder.addCase(featchAddress.pending , (state)=> {
            state.is_error = false
            state.is_loading = true
           })
            // Handel post



           builder.addCase(createAddress.pending ,(state, action)=>{
            state.is_error = false,
            state.is_loading = true
                
           } )
           builder.addCase(createAddress.fulfilled, (state, action)=> {
            state.is_error = false,
            state.is_loading = false
            state.data.push(action.payload);
           })
           builder.addCase(createAddress.rejected, (state, action) => {
            state.is_error = true;
            state.is_loading = false;
            state.error_message = action.error.message;
            console.error("Failed to post address:", action.error.message);
           })

           // Delete Request

           
           builder.addCase(deleteAddress.pending ,(state, action)=>{
            state.is_error = false,
            state.is_loading = true
                
           } )
           builder.addCase(deleteAddress.fulfilled, (state, action)=> {
            state.is_error = false,
            state.is_loading = false
            state.data.push(action.payload);
           })
           builder.addCase(deleteAddress.rejected, (state, action) => {
            state.is_error = true;
            state.is_loading = false;
            state.error_message = action.error.message;
            console.error("Failed to post address:", action.error.message);
           })


    }       




})

export default AddressSlice.reducer;
 

// export const selectAddress = (state) => state.address; // Selector to access the address state

// export default AddressSlice.reducer;

// const addressState = useSelector(selectAddress);
// const { is_loading, is_error, error_message, data } = addressState;