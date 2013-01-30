// ready? let's go!
$(document).ready(function() {
	// global variables
	var selectedOldNum = false,
		tumblrSearch = false,
		moduleType = false,
		selectedNewNum = '',
		selectedNew = '',
		postID = '',
		$nav = null; // cache some DOM elements for efficient reuse
	// check if a specific window is requested upon page load
	if (location.hash) {
		loadHashLogic();
	}
	// check if a specific post or post type is requested
	else if (location.search) {
		loadSearchLogic();
	}
	// if no window is specified, go to blog
	else {
		defaultLoad();
	}
	// load Hash logic
	function loadHashLogic() {
		selectedNew = location.hash.replace('#','');
		if ((selectedNew == 'blog') || (selectedNew == 'about') || (selectedNew == 'projects')) {
			//load Tumblr posts
			tumblrDo();
			// switch
			clickSwitch();
			//scroll module via ScrollTo.hash
			$.localScroll.hash({
				axis: 'x',
				target: '#moduleContainer',
				duration: 0,
				onBefore: function(e, anchor) {
					$(anchor).removeClass('minimized');
				},
				onAfter:function(anchor) {
					$('.contentArea').not(anchor).addClass('minimized');
					$('html, body').scrollTop(0);
				}
			});
			// if search parameters are specified, make them disappear
			if (location.search) location.search = '';
		}
		// if hash is not 'blog', 'about', or 'projects' but search is specified, erase hash and load Search logic
		else if ((location.hash) && (location.search)) {
			location.hash = '';
			loadSearchLogic();
		}
		// if an unknown hash is specified load blog instead
		else {
			// reset hash
			location.hash = '';
			defaultLoad();
		}
	}
	// load Search logic
	function loadSearchLogic() {
		switch (location.search.split('?')[1].split('=')[0]) {
			case 'id':
				postID = location.search.split('=')[1];
				// set new to permalink
				selectedNew = 'permalink';
				// switch
				clickSwitch();
				// end the switch
				$('html, body').scrollTop(0);
				// minimize non-selected windows
				$('.contentArea').not('#permalink').addClass('minimized');
				// load the post
				tumblrPermalinkDo();
				// delay reg blog load, to allow time to load permalink
				function initialTumblrLoadDelay() {
					// load Tumblr posts
					tumblrDo();
				}
				itld = setTimeout(initialTumblrLoadDelay, 5000);
			break;
			case 'post':
				moduleType = location.search.split('=')[1];
				// load specific type Tumblr posts
				tumblrDo();
				// make selected type "active"
				$('#blogNav .'+moduleType).parent().addClass('active');
				// show "show all" link
				$('#blogNav a.eye').parent().slideDown();
				// set new to blog
				selectedNew = 'blog';
				// switch
				clickSwitch();
				// scroll to blog
				$('#moduleContainer').scrollTo($('#blog'), 0, {offset: {top:-500, left:0} });
				// minimize non-selected windows
				$('.contentArea').not('#blog').addClass('minimized');
			break;
			case 'project':
				var projectType = location.search.split('=')[1];
				// load specific type projects
				projectDo(projectType);
				// make selected type "active"
				$('#projectNav .'+projectType).parent().addClass('active');
				// show "show all" link
				$('#projectNav a.eye').parent().slideDown();
				// set new to projects
				selectedNew = 'projects';
				// switch
				clickSwitch();
				// scroll to projects
				$('#moduleContainer').scrollTo($('#projects'), 0, {offset: {top:-500, left:0} });
				// minimize non-selected windows
				$('.contentArea').not('#projects').addClass('minimized');
				function initialTumblrLoadDelay() {
					// load Tumblr posts
					tumblrDo();
				}
				itld = setTimeout(initialTumblrLoadDelay, 5000);
			break;
			case 'search':
				tumblrSearch = location.search.split('=')[1];
				// load Tumblr search
				tumblrDo();
				// show "show all" link
				$('#blogNav a.eye').parent().slideDown();
				// set new to blog
				selectedNew = 'blog';
				// switch
				clickSwitch();
				// scroll to blog
				$('#moduleContainer').scrollTo($('#blog'), 0, {offset: {top:-500, left:0} });
				// minimize non-selected windows
				$('.contentArea').not('#blog').addClass('minimized');
			break;
			default:
				window.location = 'http://bradmallow.com/';
		}
	}
	// default load, aka go to blog
	function defaultLoad() {
		//load Tumblr posts
		tumblrDo();
		// set new to blog
		selectedNew = 'blog';
		// switch
		clickSwitch();
		// scroll to blog
		$('#moduleContainer').scrollTo($('#blog'), 0, {offset: {top:-500, left:0} });
		// minimize non-selected windows
		$('.contentArea').not('#blog').addClass('minimized');
	}
	//slide the modules using scrollTo
	$('nav').localScroll({
		axis: 'x',
		target: '#moduleContainer',
		duration: 300,
		hash: true,
		onBefore: function(e, anchor) {
			$(anchor).removeClass('minimized');
		},
		onAfter:function(anchor) {
			$('.contentArea').not(anchor).addClass('minimized');
			$('html, body').scrollTop(0);
		}
	});
	//if switched via mouse click
	function clickSwitch() {
		switch (selectedNew) {
			case 'permalink':
				selectedNewNum = 0;
			break;
			case 'blog':
				selectedNewNum = 1;
			break;
			case 'about':
				selectedNewNum = 2;
			break;
			case 'projects':
				selectedNewNum = 3;
			break;
		}
		doSwitch();
	}
	//if switched via keyboard arrow keys
	function keyboardSwitch() {
		switch (selectedNewNum) {
			case 1:
				selectedNew = 'blog';
			break;
			case 2:
				selectedNew = 'about';
			break;
			case 3:
				selectedNew = 'projects';
			break;
		}
		location.hash = '';
		$('#'+selectedNew).removeClass('minimized');
		$('#moduleContainer').scrollTo($('#'+selectedNew), 300, {offset: {top:-500, left:0} });
		$('.contentArea').not('#'+selectedNew).addClass('minimized');
		doSwitch();
	}

	function doSwitch() {
		if (selectedNewNum != selectedOldNum) {
			// highlight the selected nav button
			$('nav li').removeAttr('class');
			$('nav a.'+selectedNew).parent().addClass('this');
			setTimeout(floatToTopButton, 500);
		}
		endOfSwitch();
	}

	function endOfSwitch() {
		selectedOldNum = selectedNewNum;
		selectedNew = '';
	}
	// tumblr loadr and parsr - generic
	function tumblrDo() {
		var postStart = $('#blog .post').not('.loadMsg, .error').length;
		if (moduleType) {
			var tumblrAddress = 'http://briznad.tumblr.com/api/read/json?num=5&type='+moduleType+'&start='+postStart;
		}
		else if (tumblrSearch) {
			var tumblrAddress = 'http://briznad.tumblr.com/api/read/json?num=50&search='+tumblrSearch+'&start='+postStart;
		}
		else {
			var tumblrAddress = 'http://briznad.tumblr.com/api/read/json?num=5&start='+postStart;
		}
		$.getScript(tumblrAddress, function() {

			if ((tumblrSearch) && (tumblr_api_read.posts == '')) {

				// hide any possible load error msgs
				$('#blog .post.error').remove();
				// hide loading msg
				$('#infiniteScrollLoadMsg').hide();
				$('#postsArea').html('<div class="post error round module"><div class="moduleHead"><div class="moduleType round"><i class="error"></i><span class="visually-hidden">Error</span></div><h4>Oh Noes!</h4></div><div class="moduleBody"><div class="caption"><p>There aren\'t any posts that match your search term. Would you rather <a title="Show all posts" href="http://bradmallow.com/">view all posts</a> instead?</p></div></div></div>');

			} else {

				var postsChunk = '';

				$.each(tumblr_api_read.posts, function (i,item) {

					postsChunk += '<div id="' + item.id + '" class="post ' + item.type + ' round module"><div class="moduleHead"><a href="?type=' + item.type + '" title="Show all ' + item.type + ' posts" class="moduleType round"><i class="' + item.type + '"></i><span class="visually-hidden">' + item.type + '</span></a><div class="date"><h5><a title="Permalink" href="?id=' + item.id + '">' + item.date.replace(/\s\d{2}:\d{2}:\d{2}$/,'') + ' <i class="permalink"></i></a></h5></div></div><div class="moduleBody';

					switch (item.type) {
						case 'photo':
							postsChunk += ' center">';
							if (item.photos.length != 0) {
								postsChunk += '<div class="slideshow"><div class="imageContainer"><ul style="width:' + item.photos.length * 425 + 'px;"></ul></div><div class="slideControls"><ul><li><a><i class="slideshow prev"></i><span class="visually-hidden">Previous Image</span></a></li><li><a><i class="slideshow autoPlay pause"></i><span class="visually-hidden">Play or Pause Slideshow</span></a></li><li><a><i class="slideshow next"></i><span class="visually-hidden">Next Image</span></a></li></ul></div></div>';
								var slideshowChunk = '';
								$.each(item.photos, function(sI,sItem){
									slideshowChunk += '<li><a href="?id=' + item.id + '"><img src="' + sItem['photo-url-400'] + '" /></a>';
									if (sItem.caption != '') slideshowChunk += '<div class="imageCaption">' + sItem.caption + '</div>';
									slideshowChunk += '</li>';
								});
								function slideshowLoadDelay() {
									makeSlideshow(slideshowChunk,item.id);
								}
								sld = setTimeout(slideshowLoadDelay, 1000);
							}
							else if (item['photo-url-1280'].match('gif')) {
								postsChunk += '<a href="?id=' + item.id + '"><img alt="' + item.slug + '" src="' + item['photo-url-1280'] + '"></a>';
							}
							else {
								postsChunk += '<a href="?id=' + item.id + '"><img alt="' + item.slug + '" src="' + item['photo-url-400'] + '"></a>';
							}
							postsChunk += '<div class="caption">' + item['photo-caption'] + '</div></div></div>';
						break;
						case 'link':
							postsChunk += '"><a href="' + item['feed-item'] + '"><h4>' + item['link-text'] + '</h4></a><div class="caption">' + item['link-description'] + '</div></div></div>';
						break;
						case 'quote':
							postsChunk += '"><p><span class="openDoubleQuotes">&ldquo;</span><span class="quotation">' + item['quote-text'] + '</span></p><div class="caption">&mdash; ' + item['quote-source'] + '</div></div></div>';
						break;
						case 'video':
							postsChunk += ' center">' + item['video-player'] + '<div class="caption">' + item['video-caption'] + '</div></div></div>';
						break;
						case 'audio':
							postsChunk += '">' + item['audio-player'] + '<div class="caption">' + item['audio-caption'] + '</div></div></div>';
						break;
						case 'regular':
							postsChunk += '">';
							if ((item['regular-title'] != '') && (item['regular-title'] != null) && (item['regular-title'] != 'null')) postsChunk += '<h4>'+item['regular-title']+'</h4>';
							postsChunk += '<div class="caption">';
							var tempBodySplit = item['regular-body'].split('</p>');
							if (tempBodySplit.length > 3) {
								postsChunk += tempBodySplit[0] + '</p>' + tempBodySplit[1] + '</p><div class="readMore"><a href="?id=' + item.id + '">Read More&hellip;</a></div>';
							}
							else {
								postsChunk += item['regular-body'];
							}
							postsChunk += '</div></div></div>';
						break;
					}
					if (tumblr_api_read.posts.length == i+1) {
						if (postsChunk != '') {
							// hide any possible load error msgs
							$('#blog .post.error').remove();
							// hide loading msg
							$('#infiniteScrollLoadMsg').hide();
							// add postChunk to the page
							$('#postsArea').append(postsChunk);
							// in case I added any images in a 'text' post, center them
							$('#blog .post.text .caption p:has(img)').addClass('center');
							// load infinite scroll
							doInfiniteScroll();
							// if all possible posts are shown, unbind infinite scroll
							if (($('#blog .post').not('.loadMsg, .error').length == tumblr_api_read['posts-total']) || (tumblrSearch)) {
								$(window).unbind('scroll.infiniteScroll');
							}
						}
						else {
							// oops, no posts
						}
					}
				});
			}
		});
		dtl = setTimeout(didTumblrLoad, 3500);
	}
	// specific project loadr
	function projectDo(projectType) {
		$('#projects .project').not('.' + projectType).remove();
		if($('#projects .activeProjects').nextUntil('.pastProjects', '.project').length === 0) $('#projects .activeProjects').remove();
		if($('#projects .pastProjects').nextAll('.project').length === 0) $('#projects .pastProjects').remove();
	}
	// slideshow builder
	function makeSlideshow(slideshowChunk, itemID) {

		$('#'+itemID+' .slideshow .imageContainer ul').html(slideshowChunk);
		$('#'+itemID+' .slideshow').serialScroll({
			target: '.imageContainer',
			items: 'li',
			//prev: 'a.prev',
			//next: 'a.next',
			axis: 'x',
			interval: 4500,
			stop: true,
			constant: false,
			duration: 1250,
			force: true
		});
		// explicitly set click events for prev/next buttons, to avoid webkit bug
		$('#'+itemID+' a .prev').click(function () {
			$('#'+itemID+' .imageContainer').trigger( 'prev' );
		});
		$('#'+itemID+' a .next').click(function () {
			$('#'+itemID+' .imageContainer').trigger( 'next' );
		});
		// toggle for play/pause button
		$('#' + itemID + ' a .autoPlay').toggle(function() {
			$(this).removeClass('pause').addClass('play');
			$('#' + itemID + ' .imageContainer').trigger( 'stop' );
		}, function() {
			$(this).removeClass('play').addClass('pause');
			$('#' + itemID + ' .imageContainer').trigger( 'start' );
		});
		// hover over picture toggles pause/play
		$('#' + itemID + ' .imageContainer').hover(function(){
			$('#' + itemID + ' a .autoPlay').removeClass('pause').addClass('play');
			$('#' + itemID + ' .imageContainer').trigger( 'stop' );
		}, function() {
			$('#' + itemID + ' a .autoPlay').removeClass('play').addClass('pause');
			$('#' + itemID + ' .imageContainer').trigger( 'start' );
		});

	}

	// check the tumblrLoad flag, add error message if tag is false
	function didTumblrLoad() {

		if (typeof(tumblr_api_read) == 'undefined') {

			// hide loading msg
			$('#infiniteScrollLoadMsg').hide();
			// insert error msg
			$('#postsArea').append('<div class="post error round module"><div class="moduleHead"><div class="moduleType round"><i class="error"></i><span class="visually-hidden">Error</span></div><h4>Oh Noes!</h4></div><div class="moduleBody"><div class="caption"><p>There aren\'t any posts to show right now. You, or I, or both of us might be experiencing an issue with the internets. Please try back in a bit.</p></div></div></div>');

		}

	}
	// tumblr loadr and parsr - permalink
	function tumblrPermalinkDo() {

		$.getScript('http://briznad.tumblr.com/api/read/json?id='+postID, function() {

			var permalinkChunk = '';

			$.each(tumblr_api_read.posts, function(i,item){

				permalinkChunk += '<div id="' + item.id + '" class="post ' + item.type + ' round module"><div class="moduleHead"><div class="moduleType round"><i class="' + item.type + '"></i><span class="visually-hidden">' + item.type + '</span></div><div class="date"><h5>' + item.date.replace(/\s\d{2}:\d{2}:\d{2}$/,'') + '</h5></div></div><div class="moduleBody';

				switch (item.type) {

					case 'photo':

						permalinkChunk += ' center">';

						if (item.photos.length != 0) {

							permalinkChunk += '<div class="slideshow"><div class="imageContainer"><ul style="width:' + item.photos.length * 620 + 'px;"></ul></div><div class="slideControls"><ul><li><a><i class="slideshow prev"></i><span class="visually-hidden">Previous Image</span></a></li><li><a><i class="slideshow autoPlay pause"></i><span class="visually-hidden">Play or Pause Slideshow</span></a></li><li><a><i class="slideshow next"></i><span class="visually-hidden">Next Image</span></a></li></ul></div></div>';

							var slideshowChunk = '';

							$.each(item.photos, function(sI,sItem){

								slideshowChunk += '<li><a href="'+sItem['photo-url-1280']+'"><img src="'+sItem['photo-url-1280']+'" /></a>';
								if (sItem.caption != '') slideshowChunk += '<div class="imageCaption">'+sItem.caption+'</div>';
								slideshowChunk += '</li>';

							});

							function slideshowLoadDelay() {
								makeSlideshow(slideshowChunk,item.id);
							}

							sld = setTimeout(slideshowLoadDelay, 500);

						}

						else {

							permalinkChunk += '<a href="'+item['photo-url-1280']+'"><img alt="'+item.slug+'" src="'+item['photo-url-1280']+'"></a>';

						}

						permalinkChunk += '<div class="caption">'+item['photo-caption']+'</div></div></div>';

					break;

					case 'link':

						permalinkChunk += '"><a href="'+item['feed-item']+'"><h4>'+item['link-text']+'</h4></a><div class="caption">'+item['link-description']+'</div></div></div>';

					break;

					case 'quote':

						permalinkChunk += '"><p><span class="openDoubleQuotes">&ldquo;</span><span class="quotation">'+item['quote-text']+'</span></p><div class="caption">&mdash; '+item['quote-source']+'</div></div></div>';

					break;

					case 'video':

						permalinkChunk += ' center">'+item['video-source']+'<div class="caption">'+item['video-caption']+'</div></div></div>';

					break;

					case 'audio':

						permalinkChunk += '">'+item['audio-player']+'<div class="caption">'+item['audio-caption']+'</div></div></div>';

					break;

					case 'regular':

						permalinkChunk += '">';
						if ((item['regular-title'] != '') && (item['regular-title'] != null) && (item['regular-title'] != 'null')) permalinkChunk += '<h4>'+item['regular-title']+'</h4>';
						permalinkChunk += '<div class="caption">'+item['regular-body']+'</div></div></div>';

					break;

				}

				if ((tumblr_api_read.posts.length == i+1) && (permalinkChunk != '')) {
					$('#singlePostArea').html(permalinkChunk);
					$('#permalink .post.text .caption p:has(img)').addClass('center');
				}

			});

		});

		dtl = setTimeout(didTumblrLoad, 3500);

	}
	//keyboard shortcuts
	function keyboardShortcuts() {
		var keyboardShortcutClear = true,
			keyboardBrad = '',
			runKeyboardShortcutClear = function () {
				keyboardShortcutClear = true;
			};
		$(document).keydown(function(keyShortcut) {
			if ((keyboardShortcutClear == true) && (!$(keyShortcut.target).is('input')) && (!$(keyShortcut.target).is('textarea'))) {
				switch (keyShortcut.which) {
					//arrow left <
					case 37:
						if (selectedOldNum > 1) {
							selectedNewNum = selectedOldNum - 1;
							keyboardSwitch();
						}
						else {
							selectedNewNum = 3;
							keyboardSwitch();
						}
					break;
					//arrow right >
					case 39:
						if (selectedOldNum != 3) {
							selectedNewNum = selectedOldNum + 1;
							keyboardSwitch();
						}
						else {
							selectedNewNum = 1;
							keyboardSwitch();
						}
					break;
					//brad "b"
					case 66:
						keyboardBrad = 'b';
					break;
					//brad "r"
					case 82:
						keyboardBrad += 'r';
					break;
					//brad "a"
					case 65:
						keyboardBrad += 'a';
					break;
					//brad "d"
					case 68:
						keyboardBrad += 'd';
						if (keyboardBrad == 'brad') {
							$('html').toggleClass('beautifuluniquesnowflake');
							keyboardBrad = '';
						}
					break;
					//any other key entered besides those above
					default:
						keyboardShortcutClear = false;
						ks = setTimeout(runKeyboardShortcutClear, 1500);
						keyboardBrad = '';
				}
			}
		});
	}
	// hide X axis window scroll on webkit
	if (document.documentElement.clientWidth > 950) $('html').addClass('scrollXhide');
	//load click binding for tabs
	$('nav a').click(function () {
		selectedNew = $(this).attr('class');
		clickSwitch();
	});
	// load infiniteScroll/backToTop button mechanics
	function doInfiniteScroll() {
		var loadInfiniteScrollOffset = document.documentElement.scrollHeight - document.documentElement.clientHeight - 50;
		$(window).bind('scroll.infiniteScroll', function() {
			if (($(window).scrollTop() > loadInfiniteScrollOffset) && ($('nav .blog').parent().hasClass('this'))) {
				$('#infiniteScrollLoadMsg').show();
				tumblrDo();
				$(window).unbind('scroll.infiniteScroll');
			}
		});
	}
	function floatToTopButton() {
		if ($('nav .blog').parent().hasClass('this')) {
			var topButtonOffset = $('.backToTopButtonArea').offset();
			var scrollTopButtonOffset = topButtonOffset.top - 25;
			$(window).bind('scroll.floatToTopButton', function() {
				if ($(window).scrollTop() > scrollTopButtonOffset) {
					if ($('.backToTop:hidden').length == 1) {
						$('.backToTop').css('left', topButtonOffset.left).fadeIn('slow').addClass('block').click(function() {
							$.scrollTo( { top:0, left:0 } , {duration:750} , {axis:'y'} );
						});
					}
					$('.backToTop').addClass('floater');
				}
				else {
					$('.backToTop').removeClass('floater');
				}
			});
		}
		else {
			$(window).unbind('scroll.floatToTopButton');
		}
	}
	// load keyboard shortcuts
	keyboardShortcuts();
	// bind search submit event for tumblr search
	$('.search form').submit(function(e) {
		e.preventDefault();
		var tempTerm = $(this).serialize();
		if (tempTerm.split('=')[1] != '') location.search = tempTerm;
	});
	// load fancyBox behavior
	$('a.fancyBox').fancybox();

	// lazy load
	$(window).load(function () {
		$('.project-sample, i.social').addClass('delayed');
	});
});