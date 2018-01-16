$(document).ready(()=> {
    
// Global Variables
// ----------------------------------------------------------------------------------------------------
    $('.modal').modal();


// Functions
// ----------------------------------------------------------------------------------------------------

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
