var isModalOpen = 'no';
var isModalEventOpen = 'no';


$(document).ready(function(){

	
	// animate that splash screen
	$('body,html').animate({'scrollTop':0},100);
	setTimeout(function(){
		$('#intro .anim_zone').addClass('f1');
		setTimeout(function(){
			$('#intro .anim_zone').addClass('f2');	
			setTimeout(function(){
				$('#intro .anim_zone').addClass('f3');	
				setTimeout(function(){
					$('#intro, #intro .anim_zone').addClass('f4');		
					setTimeout(function(){
						$('body').addClass('showtime');
					},1000);
				},1000);
			},500);
		},50);
	},100);
	
	
	
	
	// count the cards, determine the train width
	// var devCards = $('#speakers .train.dev .the_cards .card').length;
	// var devCardsWidth = devCards*285;
	
	// var designCards = $('#speakers .train.design .the_cards .card').length;
	// var designCardsWidth = designCards*285;

	// var testCards = $('#speakers .train.test .the_cards .card').length;
	// var testCardsWidth = testCards*285;
	
	// //var screenWidth = $(window).innerWidth();
	// //var trainOffset = $('#speakers .wrap').offset().left;
	
	// $('#speakers .train.dev .the_cards').css('width',devCardsWidth+'px');
	// $('#speakers .train.design .the_cards').css('width',designCardsWidth+'px');
	// $('#speakers .train.test .the_cards').css('width',testCardsWidth+'px');
	
	
	
	
	
	// navigate the card carousel back and forth
	// var devOffset = 0;
	// var designOffset = 0;
	// var testOffset = 0;
	
	// $('#speakers header nav a').click(function(e){
	// 	e.preventDefault();
		
	// 	var theTrack = $(this).parents('.train');
	// 	if ( $(this).is('.next') && !$(this).is('.disabled') ) {
	// 		if ( theTrack.is('.dev') ) {
	// 			devOffset = devOffset - 285;
	// 			theTrack.find('.the_train').animate({'left':devOffset+'px'},300);
	// 			$('#speakers .dev header nav .prev').removeClass('disabled');
	// 			if ( ((devOffset-285)*-1) == devCardsWidth ) {
	// 				$('#speakers .dev header nav a.next').addClass('disabled');
	// 			}
	// 		}
	// 		else if ( theTrack.is('.design') ) {
	// 			designOffset = designOffset - 285;
	// 			theTrack.find('.the_train').animate({'left':designOffset+'px'},300);
	// 			$('#speakers .design header nav .prev').removeClass('disabled');
	// 			if ( ((designOffset-285)*-1) == designCardsWidth ) {
	// 				$('#speakers .design header nav a.next').addClass('disabled');
	// 			}
	// 		}
	// 		else if ( theTrack.is('.test') ) {
	// 			testOffset = testOffset - 285;
	// 			theTrack.find('.the_train').animate({'left':testOffset+'px'},300);
	// 			$('#speakers .test header nav .prev').removeClass('disabled');
	// 			if ( ((testOffset-285)*-1) == testCardsWidth ) {
	// 				$('#speakers .test header nav a.next').addClass('disabled');
	// 			}
	// 		}
	// 	}
	// 	else if ( $(this).is('.prev') && !$(this).is('.disabled') ) {
	// 		if ( theTrack.is('.dev') ) {
	// 			devOffset = devOffset + 285;
	// 			theTrack.find('.the_train').animate({'left':devOffset+'px'},300);
	// 			$('#speakers .dev header nav .next').removeClass('disabled');
	// 			if ( devOffset == 0 ) {
	// 				$('#speakers .dev header nav a.prev').addClass('disabled');
	// 			}
	// 		}
	// 		else if ( theTrack.is('.design') ) {
	// 			designOffset = designOffset + 285;
	// 			theTrack.find('.the_train').animate({'left':designOffset+'px'},300);
	// 			$('#speakers .design header nav .next').removeClass('disabled');
	// 			if ( designOffset == 0 ) {
	// 				$('#speakers .design header nav a.prev').addClass('disabled');
	// 			}
	// 		}
	// 		else if ( theTrack.is('.test') ) {
	// 			testOffset = testOffset + 285;
	// 			theTrack.find('.the_train').animate({'left':testOffset+'px'},300);
	// 			$('#speakers .test header nav .next').removeClass('disabled');
	// 			if ( testOffset == 0 ) {
	// 				$('#speakers .test header nav a.prev').addClass('disabled');
	// 			}
	// 		}
	// 	}
	// });
	
	
	// click into a card
	$('#speakers .keynote .mini, #speakers .dev .card, #speakers .design .card, #speakers .test .card').click(function(e){
		e.preventDefault();
		if ( !$(this).is('.blank') ) {
			var theCard = $(this);
			var cardTop = theCard.offset().top;
			cardTop = cardTop - ($(window).scrollTop());
			var cardLeft = theCard.offset().left;
			theCard.clone().appendTo('#modal');
			theCard.addClass('active');
			$('#modal .card').css({'left':cardLeft+'px', 'top':cardTop+'px'});
			if ( theCard.parents('.train').is('.keynote') && $(window).innerWidth() < 600 ) {
				var cardWidth = theCard.width();
				$('#modal .card').css({'width':cardWidth+'px'});
			}
			$('#modal').show();
			setTimeout(function(){
				$('#modal').addClass('show');
				setTimeout(function(){
					$('#modal').addClass('grow_h');
					setTimeout(function(){
						$('#modal').addClass('grow_v');
						isModalOpen = 'yes';
						postModal();
					},375);
				},375);
			},10);
		}
	});
	
	
	// using the dev / design / testing tabs for the agenda
	$('#agenda .agenda_nav a').click(function(e){
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		if ( $(this).is('.dev_link') ) {
			$('#agenda').removeClass('show_design show_testing').addClass('show_dev');
		}
		else if ( $(this).is('.design_link') ) {
			$('#agenda').removeClass('show_dev show_testing').addClass('show_design');
		}
		else if ( $(this).is('.testing_link') ) {
			$('#agenda').removeClass('show_dev show_design').addClass('show_testing');
		}
	});

	// using the dev talk / dev workshop tabs for the agenda
	$('#agenda .agenda_nav a').click(function(e){
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		if ( $(this).is('.dev_talk_link') ) {
			$('#agenda').removeClass('show_dev_workshop').addClass('show_dev_talk');
		}
		else if ( $(this).is('.dev_workshop_link') ) {
			$('#agenda').removeClass('show_dev_talk').addClass('show_dev_workshop');
		}
	});
	
	// click into a clickable agenda event
	$('#agenda .the_field article').click(function(e){
		e.preventDefault();
		if ( $(this).is('.clickable') ) {
			var theEvent = $(this);
			var eventTop = theEvent.offset().top;
			eventTop = eventTop - ($(window).scrollTop());
			var eventLeft = theEvent.offset().left;
			var whichTrack = $(this).parent().attr('class');
			var eventWidth = theEvent.width();
			var eventHeight = theEvent.height();
			theEvent.clone().appendTo('#modal');
			theEvent.addClass('active');
			$('#modal article').css({'left':eventLeft+'px', 'top':eventTop+'px', 'width':eventWidth+'px', 'height':eventHeight+'px'});
			$('#modal').addClass(whichTrack).show();
			setTimeout(function(){
				$('#modal').addClass('show');
				setTimeout(function(){
					$('#modal').addClass('grow');
					setTimeout(function(){
						$('#modal').addClass('loaded');
						isModalEventOpen = 'yes';
						postModal();
					},375);
				},375);
			},10);
		}
	});
	
});



function postModal() {

	// close an active modal by clicking
	$('#modal .close, #modal .blackout').click(function(e){
		e.preventDefault();
		if ( isModalOpen == 'yes' ) {
			var theCard = $('#speakers .card.active');
			var cardTop = theCard.offset().top;
			cardTop = cardTop - ($(window).scrollTop());
			var cardLeft = theCard.offset().left;
			$('#modal').removeClass('grow_v');
			setTimeout(function(){
				$('#modal').removeClass('grow_h');
				$('#modal .card').css({'left':cardLeft+'px', 'top':cardTop+'px'});
				setTimeout(function(){
					theCard.removeClass('active');
					$('#modal').removeClass('show');
					setTimeout(function(){
						$('#modal').fadeOut(50, function(){
							$('#modal .card').remove();
						});
						isModalOpen = 'no';
					},375);
				},375);
			},375);
		}
		else if ( isModalEventOpen == 'yes' ) {
			var theEvent = $('#agenda .the_field article.active');
			var eventTop = theEvent.offset().top;
			eventTop = eventTop - ($(window).scrollTop());
			var eventLeft = theEvent.offset().left;
			$('#modal').removeClass('loaded');
			setTimeout(function(){
				$('#modal').removeClass('grow');
				$('#modal article').css({'left':eventLeft+'px', 'top':eventTop+'px'});
				setTimeout(function(){
					theEvent.removeClass('active');
					$('#modal').removeClass('show dev design testing dev_talk dev_workshop');
					setTimeout(function(){
						$('#modal').fadeOut(50, function(){
							$('#modal article').remove();
						});
						isModalEventOpen = 'no';
					},375);
				},375);
			},375);
		}		
	});
	
	
	// close an active modal with the Escape key
	$(document).keyup(function(e) {
		if ((e.keyCode == 27) && isModalOpen == 'yes') {
			isModalOpen = 'no';
		    var theCard = $('#speakers .card.active');
			var cardTop = theCard.offset().top;
			cardTop = cardTop - ($(window).scrollTop());
			var cardLeft = theCard.offset().left;
			$('#modal').removeClass('grow_v');
			setTimeout(function(){
				$('#modal').removeClass('grow_h');
				$('#modal .card').css({'left':cardLeft+'px', 'top':cardTop+'px'});
				setTimeout(function(){
					theCard.removeClass('active');
					$('#modal').removeClass('show');
					setTimeout(function(){
						$('#modal').fadeOut(50, function(){
							$('#modal .card').remove();
						});
					},375);
				},375);
			},375);
		}
		else if ((e.keyCode == 27) && isModalEventOpen == 'yes') {
			isModalEventOpen = 'no';
		    var theEvent = $('#agenda .the_field article.active');
			var eventTop = theEvent.offset().top;
			eventTop = eventTop - ($(window).scrollTop());
			var eventLeft = theEvent.offset().left;
			$('#modal').removeClass('loaded');
			setTimeout(function(){
				$('#modal').removeClass('grow');
				$('#modal article').css({'left':eventLeft+'px', 'top':eventTop+'px'});
				setTimeout(function(){
					theEvent.removeClass('active');
					$('#modal').removeClass('show dev design testing dev_talk dev_workshop');
					setTimeout(function(){
						$('#modal').fadeOut(50, function(){
							$('#modal article').remove();
						});
						isModalEventOpen = 'no';
					},375);
				},375);
			},375);
		}
	});

}