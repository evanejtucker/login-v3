$(document).ready(()=> {
    
// Global Variables
// ----------------------------------------------------------------------------------------------------
    $('.modal').modal();


// Functions
// ----------------------------------------------------------------------------------------------------

    // create new user
    const createUser = ()=> {

    }

    // login
    const userLogin = ()=> {
        let username = $('#username').val();
        let password = $('#password').val();
        console.log('username: ' + username + "\npassword: " + password);
    }



// Main Process
// ----------------------------------------------------------------------------------------------------

$('#submitUser').on('click', userLogin);

});