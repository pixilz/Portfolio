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
		$profileImage = $('#section-profileImage'),
		$heroImage = $(".img-responsive.hero"),
		newHeight = $windowHeight - (/*$headerHeight + */$aboutHeight);

	$profileImage.height(newHeight);

	$heroImage.removeProp("style");

	//Used to override css if the height of the image isn't enough.
	if($heroImage.outerHeight() < newHeight) {
		$heroImage.css("max-width", "none");
		$heroImage.css("min-width", 0);
		$heroImage.css("height", newHeight);
	}
}

$(window).resize(function () {
	heroSizing();
});


$(window).load(function() {
	$('#loader-container').fadeOut('slow');
	$('body').css('overflow','auto');

	heroSizing();
});

$(function () {
	$('#contactMeSection textarea').each(function () {
		this.setAttribute('style', 'height:' + (this.scrollHeight * 2 + 5) + 'px;overflow-y:hidden;');
	}).on('input', function () {
		var $document = $(document),
			initialScrollTop = $document.scrollTop();

		var currentHeight = parseInt(this.style.height);

		this.style.height = '1px';
		this.style.height = parseFloat(this.scrollHeight) + 5 + 'px';

		if(parseInt(this.style.height) < currentHeight) {
			this.style.height = currentHeight + 'px';
		}

		$document.scrollTop(initialScrollTop);
	});

	$('.submitBtn').on('click', function() {
		var $form = $(this).closest('form'),
				data = validateForm($form);

			if(data) {
				console.log(data);
				//Call API to submit form
			}
	});

	$('form.has-validation').find(':input').on('change', function() {
		removeInvalidMark($(this));
	});
});

function validateForm($form) {
	var $inputs = $form.find(':input'),
		errors = false,
		formData = {};

	$.each($inputs, function(i, input) {
		var $input = $(input);

		if($input.attr('required') && !$input.val().trim()) {
			//Throw error on input for being empty and required.
			errors = true;
			markInputInvalid($input, "This field is required");
		} else if($input.val().trim() && $input.attr('type') == 'email') {
			if(!$input.val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				//Throw error on input for being an invalid email
				errors = true;
				markInputInvalid($input, "Please enter a valid email address.");
			}
		} else if($input.attr('name') == 'g-recaptcha-response' && !$input.val()){
			//Recaptcha is required notif window.
			errors = true;
		}

		formData[$input.attr('name')] = $input.val();
	});

	if(errors) return false;

	return formData;
}

function markInputInvalid($input, error) {
	if($input.hasClass('invalid-input')) return false;

	$input.addClass('invalid-input');
	$input.after($('<div></div>', {
		"text": error,
		"class": "invalid-input-error"
	}));

	//Create notif window
	//Please fill out the fields in red.
}

function removeInvalidMark($input) {
	if(!$input.hasClass('invalid-input')) return false;

	$input.removeClass('invalid-input');

	$input.next('.invalid-input-error').remove();
}

function getFormData($form) {
	var data = $form.serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});
}
