$(document).ready(()=> {
    
// Global Variables
// ----------------------------------------------------------------------------------------------------
    $('.modal').modal();


// Functions
// ----------------------------------------------------------------------------------------------------

    // create new user
    const createUser = ()=> {

        let inputNewPassword = $('#newPassword').val().trim();
        let inputConfirmPassword = $('#confirmNewPassword').val().trim();
        let inputNewUsername = $('#newUsername').val().trim();

        if(inputNewPassword === inputConfirmPassword  || !inputNewUsername) {
            let newUserInfo = {
                newUsername: inputNewUsername,
                newPassword: inputConfirmPassword
            }
    
            $.ajax({
                type: 'post',
                url: '/newUser',
                data: newUserInfo
            }).done((response)=>{
                console.log(response);
            });
        } else {
            console.log('passswords dont match');
        }
     
    }

    // login
    const userLogin = ()=> {
        let inputUsername = $('#username').val();
        let inputPassword = $('#password').val();
        
        if(!inputUsername || !inputPassword) {
            console.log("missing username or password");
        } else {
            let user = {
                username: inputUsername,
                password: inputPassword
            }
    
            $.ajax({
                type: 'post',
                url: '/submit',
                data: user
            }).done((response)=>{
                console.log(response);
            });
        }
    }



// Main Process
// ----------------------------------------------------------------------------------------------------

$('#submitUser').on('click', userLogin);
$('#submitNewUser').on('click', createUser);

});
