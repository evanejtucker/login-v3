$(document).ready(()=> {
    
// Global Variables
// ----------------------------------------------------------------------------------------------------
    $('.modal').modal();


// Functions
// ----------------------------------------------------------------------------------------------------

    // create new user
    // const createUser = ()=> {

    //     let inputNewPassword = $('#newPassword').val().trim();
    //     let inputConfirmPassword = $('#confirmNewPassword').val().trim();
    //     let inputNewUsername = $('#newUsername').val().trim();

    //     if(inputNewPassword === inputConfirmPassword  || !inputNewUsername) {
    //         let newUserInfo = {
    //             newUsername: inputNewUsername,
    //             newPassword: inputConfirmPassword
    //         }
    
    //         $.ajax({
    //             type: 'post',
    //             url: '/newUser',
    //             data: newUserInfo
    //         }).done((response)=>{
    //             console.log(response);
    //         });
    //     } else {
    //         console.log('passswords dont match');
    //     }
     
    // }

    const disableButton = (button)=> {
        // $(button).attr('disabled','disabled');
        // document.getElementById("createBtn").disabled = true;
        $(button).addClass("disabled");
    };

    const enableButton = (button)=> {
        // $(button).removeAttr("disabled");
        // document.getElementById("createBtn").disabled = true;
        $(button).removeClass("disabled");
    }

    const confirmPassword = ()=> {
        disableButton('#createBtn');
        let password = $("#pswrd");
        let confirmPassword = $("#confirmPswrd");

        (confirmPassword).on("keyup", function() {
            if (confirmPassword.val() === password.val()) {
                enableButton("#createBtn");
                console.log("passowrds match!");
            }
        });


    }

// Main Process
// ----------------------------------------------------------------------------------------------------

confirmPassword();

});
