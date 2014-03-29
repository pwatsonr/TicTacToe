var myGame;

(function( $ ){

	$(function(){
		 myGame = new game()
			, note = new notification();


		// alerts to user to select game mode
		note.alert(
			"Select Game Mode" //header
			, "One player or Two?" //text
			, "Two Player" // button two
			, "One Player" // button one
			, function(){// callback when two player button is click

				note.alert(
					"Select Game Mode"
					, "Online?"
					, "Yes"
					, "No"
					, function(){
						// callback for when the user selects yes
					}
					, function(){
						// callback for when the user selects No
						setPlayers();
					}
				);

			}
			, function(){// callback for when the user selects one player
				myGame.setMode( 'computer' );
				setPlayers();
			}
		);

		// uncomment the top part and delete bottom this is for testing....
		//myGame.setPlayer1Info( 'Pat' );
		//myGame.setPlayer2Info( 'Pat2' );

		//$('.player1-name').text( myGame.getPlayerInfo('player1').name );
		//$('.player2-name').text( myGame.getPlayerInfo('player2').name );
		//startGame();
		// end test

		
		setEventlistener();

		function setPlayers(){
			var html = 'Player 1 Name <input type="text" class="player1">';


			if( myGame.getMode() == "local" ){
				html += '<br />Player 2 Name <input type="text" class="player2">';
			}

			note.prompt(
				'Players Info'
				, html
				, "Ok"
				, "Cancel"
				, function( el ){
					myGame.setPlayer1Info( 
						$('.player1').val()
						, function(){
							$('.player1-name').text( myGame.getPlayerInfo('player1').name );
							
							if( myGame.getMode() == "local" ){
								myGame.setPlayer2Info( 
									$('.player2').val()
									, function(){
										$('.player2-name').text( myGame.getPlayerInfo('player2').name );
										startGame();
									}
								);
							}else{
								$('.player2-name').text( myGame.getPlayerInfo('player2').name );
								startGame();
							}
						} 
					);
				}
			);
		}

		function setEventlistener(){
			$('.reset').on('click', function(){
				myGame.reset();
			});


			$('.square').on('click', function(){
				if( $(this).children().length == 0 ){
					var results = myGame.set( parseInt( $(this).attr('id') ) );

					$(this).html('<span class="' + results.piece + '"></span>');
					switchTurn();


					if( results.msg != "" ){
						note.alert(
							results.msg
							, "Play Again?"
							, "Yes"
							, ""
							, function(){
								startGame();
							}
						);
					}else{
						results.callback( myGame );
					}
				}

				//myGame.win();
			});
		}

		function switchTurn(){
			$('.playerInfo').removeClass('turn');
			$('.' + myGame.getUserTurn() + '-name').addClass('turn');
		}

		function startGame(){
			myGame.startGame(
				function(){
					$('.' + myGame.getUserTurn() + '-name').addClass('turn');
				}
			);
		}
	});




	$.fn.center = function( side, position ) {
		side = side || "both"
		, position = position || "absolute";
	    this.css("position", position);

	    if( side == "left" || side == "both" ){
		    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +  $(window).scrollLeft()) + "px");
		}

	    if( side == "top" || side == "both" ){
		    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
	    }
	    return this;
	}

	$.fn.label = function(){
		$('input,textarea').each(
			function(){
				if( $(this).attr('name') ){
					$(this).addClass('form-item-' + $(this).attr('name'));
				}
			}
		);

		$(this).on(
			'click'
			, function(){
				$(".form-item-" +  $(this).attr('for')  ).focus();
			}
		);
	}

})( jQuery )