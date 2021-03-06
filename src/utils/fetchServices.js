import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

/* LISTINGS */
export function postListing(values) {
    return axios.post('/listings', values);
}

export function getListings() {
    return axios.get('/listings');
}


/* USERS */
export function postUser(uid, email, name) {
    return axios.post('/users', { uid, email, name });
}

export function getUser(uid) {
    return axios.get('/users/' + uid);
}