
(function(){
    var defaults = {
    	mode: 'local' //computer, online
    	, square: '.square'
    	, board: $('.game-board')
    	, player1: {
    		name: ''
    		, score: 0
    	}
    	, player2: {
    		name: 'Computer'
    		, score: 0
    	}
    	, turn: 'player1'
    	, moves: 0
    	/*
	     *
	     *     273                 84
	     *        \               /
	     *          1 |   2 |   4  = 7
	     *       -----+-----+-----
	     *          8 |  16 |  32  = 56
	     *       -----+-----+-----
	     *         64 | 128 | 256  = 448
	     *       =================
	     *         73   146   292
	     *
	     */
   		, wins: [7, 56, 448, 73, 146, 292, 273, 84]
    }, console = window.console || { log: function(){} };


    function game( options ){
        if( this == window ){
            return new game();
        }
        
        options = options || {};
        
        this._setOptions( defaults, this );
        this._setOptions( options, this );


        
        if( this.debug ){
            console.log( this );
        }

        return this;
    }

    game.prototype.startGame = function( callback ){
    	callback = callback || function(){};

    	this.board.find( this.square ).html('');

    	this.moves 	= 0;
    	this.player1.score = 0;
    	this.player2.score = 0;
    	this.turn 	= 'player1';

    	callback();
    }

    game.prototype.setMode = function( mode ){
    	mode = mode || 'local';

    	this.mode = mode;
    }

    game.prototype.getMode = function(){
    	return this.mode;
    }

    game.prototype.getUserTurn = function(){
    	return this.turn;
    }

    game.prototype.reset = function(){
    	this.board.find('.square').html('');
    }

    game.prototype.set = function( square ){
        var msg = ""
        	, callback = function(){};

        this[ this.turn ].score += square;
        this.moves++;


        if( this.mode == 'computer' && this.turn == "player1"){
        	callback = function( game ){
        		game._computer();
        	}
        }

		if( this.win( this[ this.turn ].score ) ){
			msg = this[ this.turn ].name + " Wins!";
		}else if( this.moves == 9 ){
        	msg = "Tied game!"
		}

    	if( this.turn == "player1" ){
    		this._switch();

    		return {
    			piece: "x"
    			, msg: msg
    			, callback: callback
    		};
    	}else{
    		this._switch();

    		return {
    			piece: "o"
    			, msg: msg
    			, callback: callback
    		};
    	}
    }

    game.prototype.setPlayer1Info = function( player, callback ){
    	callback = callback || function(){};

    	this.player1.name = player;

    	callback();
	}

    game.prototype.setPlayer2Info = function( player, callback ){
    	callback = callback || function(){};

    	this.player2.name = player;

    	callback();
	}

    game.prototype.getPlayerInfo = function( player ){
    	player = player || 'player1'

    	return this[ player ];
    }

    game.prototype.win = function( score ){
        var i;

        for (i = 0; i < this.wins.length; i += 1) {
            if ( ( this.wins[i] & score ) === this.wins[ i ] ) {
                return true;
            }
        }
        return false;
    }


    game.prototype._computer = function(){
    	var $this = this.board.find( this.square + '-' + this._getSquare() );

    	if( $this.children().length == 0 ){
			$this.trigger('click');
			return false;
    	}else{
    		this._computer();
    	}
    }

	game.prototype._getSquare = function(){
	    return Math.floor(Math.random()*9+1);//return a number between 1 - 10
	}

    game.prototype._switch = function(){
    	this.turn = this.turn === "player1" ? "player2" : "player1";
    }

    game.prototype._setOptions = function(options, obj){
        for( i in options ){
            if( options.hasOwnProperty( i ) ){
                this[ i ] = options[ i ];
            }
        }
        return this;
    }

    window.game = game;
    
})();
  