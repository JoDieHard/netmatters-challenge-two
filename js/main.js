
const submitBtn = $( '#submit' );
const email = $('#email-input');
const logContainer = $('#logContainer');
const logItem = $('.logItem');

const inputValue = $('#email-input').val();
let currentImg = $('.randomImg img').attr('src');
let emailList = [];
let duplicateItem;



// ——— FOUNDATION FUNCTIONS ———

    // Gets a Random Number between 0 and 'max'
    function getRandom( max ) {
        let result;
        
        result = (Math.random() * max).toFixed(0);
        console.log(result);
        return result;
    };

    // Uses the Random Number function to generate a random image
    function getImage () {
        $('.randomImg img').attr('src', 'https://picsum.photos/id/' + getRandom(400) + '/300');
    }

    // Validates the Text Input's Email
    function isValid () {
        const rgx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let hasError = false;
        
        // Check that the Input Field isn't Empty 
        if ( email.val().trim() == '' ) {
            hasError = true;
            // console.log('You have not entered anything.');

        // Check that the Email is Valid 
        } else if ( !rgx.test( email.val() ) ) {
            hasError = true;   
            // console.log('This is not an email');
        }

        // Return false if Email Validation has an Error
        if ( hasError == true ) { return false; 
        } else if ( hasError == false ) { return true; };
    };

    // Checks the Email Doesn't Exist 
    function logCheck () {
        return emailList.includes( email.val() );

        };


        // Create a logItem function 

        function createItem () {
            logContainer.append('<div class="logItem">' + '<img class="thumb" src="' + $('.randomImg img').attr('src') + '">' + '<p class="email">' + $('#email-input').val() + '</p>' + '</div>');
            emailList.push( email.val() );
            // console.log(emailList);
        };

        // Add an Image to an existing logItem function
        function addImg () {
            $('.randomImg img').clone().addClass('thumb').prependTo( $('.logItem')[ duplicateItem ] );
        };

// ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———


// ——— TOP LEVEL FUNCTIONS ———

    // Loads an image when the page is loaded
    $( window ).on('load', getImage() );
    //———————————————————————————————————————


    // Submit an email to the image 
    $( '#submit' ).on('click', function() {
        if ( isValid() == false )  {
            console.log('Something went wrong! Please check your email is correct.');
        } else if ( isValid() == true ) {

            // IF the Email exists, add the image to it
            if ( logCheck() == true ) {
                duplicateItem =  emailList.indexOf( email.val() );
                addImg();  // Adds the image to the existing Email 
                console.log('This Email already exists.');


            } else if ( logCheck() == false ) {  // ELSE IF the Email DOES NOT already Exist
                // Adds the image and email to the logs below. 
                // console.log('This is a new Email.');
                console.log('Success! Image has been added below.');

                createItem(); // Creates a new Log Item
                getImage(); // Gets a new image 
                
            }
        }
    });
    //———————————————————————————————————————








// OLD CODE


// $( window ).on('load', function () {
//     getImage();
// });

// $('#submit').on('click', function () {

//     //Check the email doesn't already exist 
//     if ( $('.itemOutput .email').html() == $('#email-input').val() ) {

//         console.log('Email already exists');
//         console.log( $(this).attr('src') );

//         // Prepend the image to the existing email
//         $('.itemOutput').prepend('<img class="thumb" src="' + $('.randomImg img').attr('src') + '" >' );
    
//         // Reset Image
//         getImage();
        
//     } else {

//         console.log( $(this).attr('src') );

//         // Add the image and email to the log 
//         $('#logContainer').append('<div class="itemOutput">' + '<img class="thumb" src="' +  + '">' + '<p class="email">' + $('#email-input').val() + '</p>' + '</div>');
//         console.log('This is a new email');

//         // Reset Image
//         getImage();
//     }
// });