import $ from 'jquery';
const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_HyYaUwpGQ";
const kinveyAppSecret = "32e36938825c4268bc9f73cf8629c29b";

// Creates the authentication header
function makeAuth(type) {
    return type === 'basic'
        ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        :  'Kinvey ' + sessionStorage.getItem('authtoken');
}

// Creates request object to kinvey
function makeRequest(method, module, endpoint, auth) {
    return {
        method,
        url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
        headers: {
            'Authorization': makeAuth(auth)
        }
    };
}

// creates request to upload photo
function uploadImageToKinvey(contentType) {
    let req = {
        method: 'POST',
        url: kinveyBaseUrl + 'blob/' + kinveyAppKey,
        headers: {
            'Content-Type': 'application/json',
            'X-Kinvey-API-Version': 3,
            'Authorization': makeAuth('Kinvey'),
            'X-Kinvey-Content-Type': contentType
        }
    };

    return $.ajax(req);
}

// Creates a request to upload an image to Google Cloud Storage from Kinvey
function uploadImageToGoogle(uploadUrl, requiredHeaders, file) {
    let req = {
        method: 'PUT',
        url: uploadUrl,
        crossDomain: true,
        headers: requiredHeaders,
        processData: false
    };

    req.data = {file};
    return $.ajax(req);
}

// Function to return GET promise
function get (module, endpoint, auth) {
    return $.ajax(makeRequest('GET', module, endpoint, auth));
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
    let req = makeRequest('POST', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
    let req = makeRequest('PUT', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
    get,
    uploadImageToGoogle,
    post,
    update,
    remove,
    uploadImageToKinvey
}