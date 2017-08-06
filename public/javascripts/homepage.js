/**
 * Used for the desktop to show the portfolio carousel
 * @return {undefined}
 */
function clickEnable() { // eslint-disable-line
	portfolio.portfolioItemEnable(this);
}

/**
 * Used for the desktop to hide the portfolio carousel
 * @return {undefined}
 */
function clickDisable() { // eslint-disable-line
	portfolio.portfolioItemDisable(this);
}

/**
 * This object contains functions relating to the
 * portfolio carousel buttons on desktop.
 * @type {Object}
 */
var portfolio = {
	portfolioItemEnable: function (item) {
		$(item).addClass('selected');
		var $overNotSel = $('.over:not(.selected)'),
			$selected = $('.over.selected'),
			$over = $('.over');

		$overNotSel.addClass('movement');
		$selected.addClass('full growing');

		$over.off('click');

		$overNotSel.animate({
			top: ('-' + ($overNotSel.outerHeight()) + 'px'),
			opacity: '0'
		}, 2000).promise().done(function () {
			$overNotSel.css('display', 'none');
			$overNotSel.removeClass('movement');
			$selected.on('click', function () {
				portfolio.portfolioItemDisable(this);
			});
		});
	},
	portfolioItemDisable: function () {
		var $overNotSel = $('.over:not(.selected)'),
			$selected = $('.over.selected'),
			$over = $('.over');

		$selected.removeClass('full');
		$over.off('click');

		$overNotSel.addClass('movement');
		$overNotSel.css('display', '');

		$overNotSel.animate({
			top: '0',
			opacity: '1'
		}, 2000).promise().done(function () {
			$overNotSel.removeClass('movement');
			$selected.removeClass('selected growing');
			$over.on('click', function () {
				portfolio.portfolioItemEnable(this);
			});
		});
	}
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

	//Slick code
	//The reason the internal slider is first is to get all of
	//the correct "innerhtml" setup before creating the outer slider
	//This is the internal slider for pages
	var arrowHtml = function(cls, ico) {
		return '<div class="' + cls + '-project-slide-btn"><i class="material-icons">' + ico + '</i></div>';
	};
	$('.slick-project-slide .project-slides').slick({
		adaptiveHeight: true,
		prevArrow: arrowHtml('prev','&#xE314'),
		nextArrow: arrowHtml('next','&#xE315')
	});


	//TODO: Should I add image lazy loading?
	//This is the overall project slider
	$('.portfolio-carousel-row').slick({
		adaptiveHeight: true, //Potentially
		arrows: false,
		draggable: false
	});
});

$(document).ready(function () {
	//Assign events here
	$('.over').on('click', function () {
		portfolio.portfolioItemEnable(this);
	});

	$('#contactMeSection textarea').each(function () {
		this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
	}).on('input', function () {
		var $document = $(document),
			initialScrollTop = $document.scrollTop();

		this.style.height = '1px';
		this.style.height = parseFloat(this.scrollHeight) + 5 + 'px';

		$document.scrollTop(initialScrollTop);
	});
});
