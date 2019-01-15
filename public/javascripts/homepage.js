toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

/**
 * Hero sizing sets the height of the hero image based upon how much room it is allowed
 * in terms of screen real estate.
 * @method heroSizing
 * @return {undefined}
 */
function heroSizing() {
    var /*$headerHeight = $('#header').height(),*/
        $aboutHeight = $('#section-about-col').height(),
        $windowHeight = $(window).height(),
        $windowWidth = $(window).width(),
        $profileImage = $('#section-profileImage'),
        $heroImage = $(".img-responsive.hero"),
        newHeight = $windowHeight - ( /*$headerHeight + */ $aboutHeight);

    $profileImage.height(newHeight);

    $heroImage.removeAttr("style");

    //Used to override css if the height of the image isn't enough.
    if ($heroImage.outerHeight() < newHeight) {
        $heroImage.css("max-width", "none");
        $heroImage.css("min-width", 0);
        $heroImage.css("height", newHeight);
    } else if($heroImage.outerWidth() < $windowWidth) {
        $heroImage.css('width', Math.min($windowWidth, 1920));
    }
}

$(window).resize(function() {
    heroSizing();
});

$(window).on('load', function() {
    $('#loader-container').fadeOut('slow');
    $('body').css('overflow', 'auto');

    heroSizing();
});

$(function() {
    emailjs.init('user_9oPetXteepojqp5jJWT33');

    $('#contactMeSection textarea').each(function() {
        this.setAttribute('style', 'height:' + (this.scrollHeight * 2 + 5) + 'px;overflow-y:hidden;');
    }).on('input', function() {
        var $document = $(document),
            initialScrollTop = $document.scrollTop();

        var currentHeight = parseInt(this.style.height);

        this.style.height = '1px';
        this.style.height = parseFloat(this.scrollHeight) + 5 + 'px';

        if (parseInt(this.style.height) < currentHeight) {
            this.style.height = currentHeight + 'px';
        }

        $document.scrollTop(initialScrollTop);
    });

    $('.submit-button').on('click', function() {
        var $form = $(this).closest('form'),
            data = validateForm($form);

        if (data) {
            emailjs
                .send('gmail', 'template_nTztvt19')
                .then(
                    function() {
                       Swal("Success!", "Your message has been sent.", "success");
                    }, function(error) {
                        Swal("Error...", 'An error occurred while sending an email.', "error");

                        console.log(error);
                    }
                );
        }
    });

    $('form.has-validation').find(':input').on('change', function() {
        removeInvalidMark($(this));
    });
});

function validateForm($form) {
    var $inputs = $form.find(':input'),
        errors = false,
        recaptcha = true,
        formData = {};


    $.each($inputs, function(i, input) {
        var $input = $(input);

        if ($input.attr('required') && !$input.val().trim()) {
            //Throw error on input for being empty and required.
            errors = true;
            markInputInvalid($input, "This field is required");
        } else if ($input.val().trim() && $input.attr('type') === 'email') {
            if (!$input.val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                //Throw error on input for being an invalid email
                errors = true;
                markInputInvalid($input, "Please enter a valid email address.");
            }
        } else if ($input.attr('name') === 'g-recaptcha-response' && !$input.val()) {
            //Recaptcha is required notif window.
            recaptcha = false;
        }

        formData[$input.attr('name')] = $input.val();
    });

    if (errors) {
        toastr["error"]("Please correct the fields in red.", "Error!");
        return false;
    } else if (!recaptcha) {
        toastr["error"]("Please validate the reCAPTCHA.", "Error!");
        return false;
    }

    return formData;
}

function markInputInvalid($input, error) {
    if ($input.hasClass('invalid-input')) return false;

    $input.addClass('invalid-input');
    $input.after($('<div></div>', {
        "text": error,
        "class": "invalid-input-error"
    }));
}

function removeInvalidMark($input) {
    if (!$input.hasClass('invalid-input')) return false;

    $input.removeClass('invalid-input');

    $input.next('.invalid-input-error').remove();
}
