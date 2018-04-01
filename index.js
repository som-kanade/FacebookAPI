// main document ready function to check if dom is loaded fully or not

let myFacebookToken;
$(document).ready(() => {
    myFacebookToken = prompt("Please enter your Facebook Token:", "");
    if (myFacebookToken == null || myFacebookToken == "") {
        alert("No usr Token found");
    } 
    else {
        getAllDetails();
    } 

}); 


let getAllDetails = () => {

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=name,quotes,cover,address,birthday,currency,picture.type(large)&access_token=' + myFacebookToken,
        success: (response) => {
            $('#dataSection').css('display', 'block');
            console.log(response);
            $('#userName').append(response.name);
            $('#favouritrQuote').append(response.quotes);
            $('#Birthday').append(response.birthday)
            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');
            $('#cover').css('background-image', 'url(' + response.cover.source + ')');

        },

        error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)
        },

        beforeSend :() => {
            alert("please wait your info is being loaded")
        },

        complete : () => {
            alert("your requested page has been loaded successfully.")
        }
    });
}