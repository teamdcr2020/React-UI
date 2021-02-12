import axios from 'axios';
import React from 'react';
export function PostData(type, userData, baseURL){
    
/*
   return new Promise((resolve, reject) => {
        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'content-type' :'application/json',
                'operation' : 'login',
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then((response) => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });

    */

  
    var headers = {
    'content-type' :'application/json',
    'operation' : '',
    'Access-Control-Allow-Origin': '*'}
    headers.operation = type;
    console.log("sending operation header as +"+headers.operation);

  return axios.post(baseURL, JSON.stringify(userData),{ headers})
   .then(response =>{ 
       //console.log("response returned from backend: "+JSON.stringify(response)); 
        return response;})
   .catch(error => {
       //this.setState({ errorMessage: error.message });
       console.error('There was an error!', error);
       return error;
   });
   
    
}