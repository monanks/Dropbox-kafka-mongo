//const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001' || 'http://10.0.0.184:3001'
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://10.0.0.184:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/signin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).catch(error => {
            console.log("This is error");
            return error;
});

export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    console.log(payload);
    return res.json();
}).catch(error => {
        console.log("This is error");
        return error;
});

export const doSignout = () =>
fetch(`${api}/signout`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json',
    },
    credentials:'include'
}).then(res => {
    return res.json();
}).catch(error => {
        console.log("This is error");
        return error;
});

export const uploadFile = (payload) =>
    fetch(`${api}/doupload`, {
        method: 'POST',
        credentials:'include',
        body: payload
    }).then(res => {
        return res.json();
    }).catch(error => {
            console.log("This is error");
            return error;
    }
);

export const getFiles = (payload) =>
fetch(`${api}/getFiles`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res.json();
}).catch(error => {
        console.log("This is error");
        return error;
});

export const dlFile = (payload) =>
fetch(`${api}/dlFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res.json();
}).catch(error => {
        console.log(error);
        return error;
});

export const deleteFile = (payload) =>
fetch(`${api}/deleteFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res.json();
}).catch(error => {
        console.log(error);
        return error;
});

export const createFolder = (payload) =>
fetch(`${api}/createFolder`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res.json();
}).catch(error => {
        console.log(error);
        return error;
});

export const getDirParent = (payload) =>
fetch(`${api}/getDirParent`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res.json();
}).catch(error => {
        console.log(error);
        return error;
});

export const checkSession = () =>
fetch(`${api}/checkSession`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include'
}).then(res => {
    console.log(res);
    return res.json();
}).catch(error => {
        console.log(error);
        return error;
});

