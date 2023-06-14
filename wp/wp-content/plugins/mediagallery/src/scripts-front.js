( function agex2023() {
	//TEST CONNECTIONS
	function mfoo() {
		// console.log( 'block plugin custom js connected to front-end' );
	}
	mfoo();

	//VIDEO GALLERY EVENT HANDLING FOR POP-UPS AND FLEXSLIDER
	function videoGallery() {
		//IF WE ARE ON THE VIDEO GALLERY CUSTOM TEMPLATE
		const mlocation = document.querySelector(
			'.wp-block-create-block-mediagallery'
		);
		if ( mlocation ) {
			// console.log( 'yes we ar in the right mlocation' );

			//GET THE VIDEO GALLERY POP-UP OVERLAY LOCATION
			const mOverlay = document.querySelector( '.video-pop-up-overlay' );

			//THE POP-UP OVERLAY LOCATION FOR THE VIDEO ITEM
			const mvidItem = mOverlay.querySelector( '.stream-insert' );

			//WE ALSO NEED ALL CLICKABLE ELEMENTS ASSOCIATED TO THIS ENTIRE BLOCK PROJECT (E.G. X ICON, ARROW ICONS,ETC..)
			const mClickables = mlocation.querySelectorAll(
				'div, a, i, img, button'
			);

			//PREPARE CLICK EVENT HANDLING FOR ALL CLICKABLE ITEMS
			for ( let i = 0, len = mClickables.length; i < len; i++ ) {
				mClickables[ i ].addEventListener( 'click', function ( e ) {
					//LETS REFERENCE THIS
					const mthis = this;

					//IF WE CLICK ON A VIDEO GALLERY IMG COVER
					if ( mthis.classList.contains( 'pop' ) ) {
						e.preventDefault();

						// console.log( 'i clicked on the image' );

						//CLONE THE IMG ELEMENT
						const mclone = mthis.cloneNode( true );

						//INSERT THE CLONE INTO THE OVERLAY POP-UP ELEMENT
						//BUILD OUT DOM STRUCTURE FOR FLEXSLIDER AND VIDEO HERE

						//RESET THE STREAM LOCATION
						mvidItem.innerHTML = "<div class='spinner'></div>";

						//GET ATTRIBUTE VALUES FROM SELECTED IMG TO HELP PREPARE CLOUDFLARE ELEMENT BUILD
						const mDataVidURL = mclone.getAttribute( 'data-vid' );

						//GET THE ID IN THE URL
						const mURLParams =
							mDataVidURL.match( /.*\/(.*)\/(.*)$/ );
						//AND USE IT LIKE SO...
						// console.log( mURLParams[ 1 ] );

						//BUILD OUT THE CLOUDFLARE STREAM ELEMENT AND ITS REQUIRED SCRIPT TAG
						const mStream = document.createElement( 'stream' );
						for ( const [ key, value ] of Object.entries( {
							src: mURLParams[ 1 ],
							'customer-domain-prefix':
								'customer-uq7hrwsxe8cjcwdg',
							controls: '',
							preload: '',
						} ) ) {
							mStream.setAttribute( key, value );
						}

						const mStreamScript =
							document.createElement( 'script' );
						for ( const [ key, value ] of Object.entries( {
							'data-cfasync': false,
							defer: '',
							type: 'text/javascript',
							class: 'mStreamScript',
							src:
								'https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=' +
								mURLParams[ 1 ],
						} ) ) {
							mStreamScript.setAttribute( key, value );
						}

						mvidItem.appendChild( mStream );
						mvidItem.appendChild( mStreamScript );

						//MAKE THE POP-UP VISIBLE
						mOverlay.classList.remove( 'd-none' );
						mOverlay.classList.add( 'open' );
					}

					//IF WE CLICK ON OVERLAY X ICON TO CLOSE POP-UP
					if ( mthis.classList.contains( 'lnk-close-window' ) ) {
						e.preventDefault();
						mOverlay.classList.add( 'd-none' );
						//RESET THE STEAM LOCATION
						mvidItem.innerHTML = "<div class='spinner'></div>";
					}

					//IF WE CLICK ON THE OVERLAY ITSELF, CLOSE POP-UP
					if ( mthis.classList.contains( 'video-pop-up-overlay' ) ) {
						e.preventDefault();
						e.stopPropagation();
						mOverlay.classList.add( 'd-none' );
						//RESET THE STEAM LOCATION
						mvidItem.innerHTML = "<div class='spinner'></div>";
					}

					//IF WE CLICK ON THE LEFT ARROW DO NOTHING!
					if ( mthis.classList.contains( 'lnk-prev' ) ) {
						e.preventDefault();
						e.stopPropagation();
					}

					//IF WE CLICK ON THE RIGHT ARROW DO NOTHING!
					if ( mthis.classList.contains( 'lnk-next' ) ) {
						e.preventDefault();
						e.stopPropagation();
					}
				} );
			}

			//CHECK FOR CHANGES VIA MUTATION OBSERVER!
			/* global MutationObserver */

			const observer = new MutationObserver( function () {
				//GET THE SPINNER AND MODIFY IT
				const mSpinner = document.querySelector( '.spinner' );
				setTimeout( () => {
					if ( mSpinner ) {
						// console.log( 'spinner exists' );
						mSpinner.remove();
					} else {
						// console.log( 'spinner does not exist' );
					}
				}, 1000 );
			} );

			//OBSERVE THE STREAM INSERT!
			observer.observe( mvidItem, {
				childList: true, // observe direct children
				subtree: true, // and lower descendants too
				characterDataOldValue: true, // pass old data to callback
			} );
		}
	}
	videoGallery();
} )();
