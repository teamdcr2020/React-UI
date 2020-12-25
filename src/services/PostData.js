export function PostData(type, userData){
    let BaseURL = 'https://psoyyte2sl.execute-api.us-east-1.amazonaws.com/dev/userlogin';

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
}