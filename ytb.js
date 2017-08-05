/*!
 * jQuery youtube loader
 * This project realized youtube load videos by Google Pagespeed Insights optimization scenarios
 *
 * Copyright by Pavel Pronskiy and jQuery Foundation
 * Version: 0.1
 *
 * Example integration:

 * <head>
 *   <script src="/jquery.js"></script>
 *   <script src="/ytb.js"></script>
 * </head>
 * <body>
 *   <div data-youtube-loader data-watch="_UYEOeyRm4E" data-width="480" data-height="320"></div>
 *   ... html tags ...
 *   <div data-youtube-loader data-watch="uVsfzprO7zs" data-width="480" data-height="320"></div>
 * </body>
 */


(function($) {
	try {
		var p = {
			play: {
				css: {
					left: '50%',
					top: '50%',
					position: 'absolute',
					'z-index': 1,
					cursor: 'pointer'
				},
				html: '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">' +
					'<path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.81"></path>' +
					'<path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"></path>' +
					'<path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"></path></svg>'				
			},
			opacity: {
				normal: {
					opacity: 1
				},
				hover: {
					opacity: '0.7'
				}
			},
			iframe: {
				css: {
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					'z-index': 100,
					background: 'transparent'
				}
			}
		};

		$("[data-youtube-loader]").each(function() {
			var s = {
				watch: this.dataset.watch,
				size: {
					width: this.dataset.width,
					height: this.dataset.height
				},
				play: p.play,
				iframe: {
					src: 'https://www.youtube.com/embed/' + this.dataset.watch + '?autoplay=1',
					css: p.iframe.css
				},
				preview: {
					src: 'https://i.ytimg.com/vi/' + this.dataset.watch + '/hqdefault.jpg',
					css: {
						position: 'absolute',
						width: this.dataset.width,
						height: this.dataset.height
					}
				},
				container: {
					css: {
						width: this.dataset.width,
						height: this.dataset.height,
						position: 'relative'
					}
				}
			};

			s.play.css.width = parseInt(s.size.width / 4, 10);
			s.play.css.height = parseInt(s.size.height / 4, 10);
			s.play.css['margin-top'] = '-' + parseInt(s.size.height / 7, 10) + 'px';
			s.play.css['margin-left'] = '-' + parseInt(s.size.width / 7, 10) + 'px';

			$(this).css(s.container.css);

			$('<img/>', {
				src: s.preview.src,
				css: s.preview.css
			}).appendTo(this);

			$('<div/>', {
				css: s.play.css,
				html: s.play.html
			}).appendTo(this).on('touchstart click', function() {
				return $('<iframe/>', {
					src: s.iframe.src,
					css: s.iframe.css,
					frameborder: 0,
					allowfullscreen: 1
				}).appendTo(this.parentNode);
			}).mouseenter(function() {
				return $(this).css(p.opacity.hover);
			}).mouseleave(function() {
				return $(this).css(p.opacity.normal);
			});
		});
	} catch(e) {};
})(jQuery);

