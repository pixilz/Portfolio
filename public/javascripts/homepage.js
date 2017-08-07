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
		this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
	}).on('input', function () {
		var $document = $(document),
			initialScrollTop = $document.scrollTop();

		this.style.height = '1px';
		this.style.height = parseFloat(this.scrollHeight) + 5 + 'px';

		$document.scrollTop(initialScrollTop);
	});
});
