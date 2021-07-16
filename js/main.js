
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
        $('.randomImg img').attr('src', 'https://picsum.photos/id/' + getRandom(1000) + '/1200');
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


        // If there is an error loading an image, load another one! 
        $('.randomImg img').on('error', function() {
            console.log('ERROR: Loading the image failed, Trying again...');
            getImage();
        });

// ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———   ———


// ——— TOP LEVEL FUNCTIONS ———

    // Loads an image when the page is loaded
    $( window ).on('load', getImage() );
    //———————————————————————————————————————


    // Submit an email to the image 
    $( '#submit' ).on('click', function(event) {
        event.preventDefault();

        if ( isValid() == false )  {
            console.log('Something went wrong! Please check your email is correct.');
        } else if ( isValid() == true ) {

            // IF the Email exists, add the image to it
            if ( logCheck() == true ) {
                duplicateItem =  emailList.indexOf( email.val() );

                console.log('This Email already exists.');
                addImg();  // Adds the image to the existing Email 
                getImage(); // Gets a new image 


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

    // Open image if clicked 
    $('img').on('click', function(e) {
        console.log( 'This is the source: ' + (e.target.attr('src')) );
        // $('.modal img').attr('src', e.target.attr('src'));
    });