
(function(){
    var defaults = {
    	container: 'body'
    	, debug: false
    }, console = window.console || { log: function(){} };


    function notification( options ){
        if( this == window ){
            return new notification();
        }
        
        options = options || {};
        
        this.setOptions( defaults, this );
        this.setOptions( options, this );
        
        if( this.debug ){
            console.log( this );
        }

        return this;
    }

    notification.prototype.alert = function( header, text, btn1, btn2, confirmCallBack, cancelCallBack ){
		var that 				= this
			, btn1				= btn1 || "Cancel"
			, btn2				= btn2 || "Ok"
			, $this 			= $('#' + this._popup( 'alert', btn1, btn2 ) )
			, $overlay 			= $('#' + this._overlay( $this ) )
			, header 			= header || ""
			, text 				= text || ""
			, confirmCallBack 	= confirmCallBack || function (){}
			, cancelCallBack 	= cancelCallBack || function (){};

		$this.off('click', 'button');
		$overlay.removeClass('cancel');

		$this.center("both", "fixed").show().addClass('fadeIn');
		$overlay.fadeIn();

		this._setMsg( $this, header, text );

		$overlay.addClass('cancel');

    	if( cancelCallBack.toString().replace(/\s+/g, '') != "function(){}" ){
			$('.overlay.cancel').on('click', function(){
				that.hide( cancelCallBack );
			});

			$this.on('click', 'button.cancel', function(){
				that.hide( $this, $overlay, cancelCallBack );
			});
		}else{
			$this.find('.cancel').hide();
			$this.find('.confirm').addClass('single');
		}

		$this.on('click', 'button.confirm', function(){
			that.hide( $this, $overlay, confirmCallBack );
		});
    }

    notification.prototype.prompt = function( header, text, btn1, btn2, confirmCallBack, cancelCallBack ){
		var that 				= this
			, btn1				= btn1 || "Cancel"
			, btn2				= btn2 || "Ok"
			, $this 			= $('#' + this._popup( 'prompt', btn1, btn2 ) )
			, $overlay 			= $('#' + this._overlay( $this ) )
			, header 			= header || ""
			, text 				= text || ""
			, confirmCallBack 	= confirmCallBack || function (){}
			, cancelCallBack 	= cancelCallBack || function (){};

		$this.off('click', 'button');
		$overlay.removeClass('cancel');

		$this.center("both", "fixed").show().addClass('fadeIn');
		$overlay.fadeIn();

		this._setMsg( $this, header, text );

		$overlay.addClass('cancel');

		if( cancelCallBack.toString().replace(/\s+/g, '') != "function(){}" ){
			$('.overlay.cancel').on('click', function(){
				that.hide( cancelCallBack );
			});

			$this.on('click', 'button.cancel', function(){
				that.hide( $this, $overlay, cancelCallBack );
			});
		}else{
			$this.find('.cancel').hide();
			$this.find('.confirm').addClass('single');
		}

		$this.on('click', 'button.confirm', function(){
			that.hide( $this, $overlay, confirmCallBack );
		});
			
    }

    notification.prototype.hide = function( $this, $overlay, callback ){
		$this.animate(
			{
				top: "100%"
			}
			, 100
			, function() {
				$(this).hide().removeClass('fadeIn');
				callback( $(this) );
			}
		)
		$overlay.fadeOut(
			function(){
				$(this).remove();
			}
		);
    }


    notification.prototype._setMsg = function( $this, header, text ){
		$this.find('.header').text( header );
		$this.find('.text').html( text );	
    }

    notification.prototype._popup = function( type, btn1, btn2 ){
		var id = ranString( 5 )
			, type = type || 'alert'
    		, html = '<div id="' + id + '" class="popup notification border">';
				html += "<h2 class='header'></h2>";
				html += "<p class='text'></p>";

				html += "<div class='buttons'>";
					if( type == "alert" ){
						html += "<button class='cancel'>" + btn2 + "</button>";
						html += "<button class='confirm'>" + btn1 + "</button>";
					}else{
						html += "<button class='confirm'>" + btn1 + "</button>";
					}
				html += "</div>";
			html += "</div>";

		$( this.container ).append( html );
		return id;
    }

    notification.prototype._overlay = function( $this ){
		var id = ranString( 5 );

		$( this.container ).append('<div class="overlay" id="' + id + '"></div>');

		return id;		
    }


    notification.prototype.setOptions = function(options, obj){
        for( i in options ){
            if( options.hasOwnProperty( i ) ){
                this[ i ] = options[ i ];
            }
        }
        return this;
    }

    function ranString( len ){
	    var text = ""
	    	, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	    	, len = len || 5;

	    for( var i=0; i < len ; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

    window.notification = notification;
    
})();
  