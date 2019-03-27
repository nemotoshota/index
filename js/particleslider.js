// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ ParticleSlider                   |                     Version 0.9 │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2013 Tamino Martinius (http://zaku.eu)                 │ \\
// │ Copyright © 2013 Particleslider.com (http://particleslider.com)    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Terms of usage: (http://particleslider.com/legal/license)          │ \\
// └────────────────────────────────────────────────────────────────────┘ \\
/*\
 * ParticleSlider
 [ method ]
 **
 * Creates a ParticleSlider object.
 **
 > Parameters
 - params (object) #optional final attributes of the ParticleSlider
 **
 > Possible parameters
 o sliderId (string) ID which contains source for slides and canvas elements. Default: `particle-slider`
 o color (string) Color (rgb,rgba,hex,shorthex) for controls and slide (if monochrome = `true`). Default: `#fff`
 o hoverColor (string) Color (rgb,rgba,hex,shorthex) for controls on hover. Default: `#f88`
 o width (number) width of slider. Default: `container-width`
 o height (number) height of  slider. Default: `container-height`
 o ptlGap (number) gap between particles. Default: `0`
 o ptlSize (number) particle-size (usually used in combination with pxlGap). Default: `1`
 o slideDelay (number) time between slides. Default: `10`
 o arrowPadding (number) padding between arrows and slider-border. Default: `10`
 o showArrowControls (boolean) shows/hides arrows to change slide. Default: `true`
 o onNextSlide (function) function is called after slide changes. Default: `null`
 o monochrome (boolean) tints source images in given color. Default: `false`
 o mouseForce (number) force which pushes the particle from cursor away. Default: `10000`
 o restless (boolean) Particles never stay still if restless is true. Default: `true`
 = (object) @ParticleSlider
 **
 > Usage
 | // ParticleSlider is created with default-values
 | var ps = new ParticleSlider();
 | // ParticleSlider is created with given width and height
 | var ps = new ParticleSlider({
 |     width: 800,
 |     height: 400
 | });
 | // ParticleSlider is created with 1px gap between particles
 | var ps = new ParticleSlider({
 |     ptlGap: 1
 | });
 | // ParticleSlider is created 200px wide by 200px high,
 | // with a monochrome half transparent white slide
 | // without controls, bound on ID #logos
 | var ps = new ParticleSlider({
 |     sliderId: 'logos',
 |     width: 200,
 |     height: 200,
 |     color: 'rgba(255,255,255,0.5)',
 |     monochrome: true,
 |     showArrowControls: false
 | });
\*/
function ParticleSlider(params) {
	var ps = this;

	/*** public values (modified by users) ***/

	/*\
	 * ParticleSlider.sliderId
	 [ property (string) ]
	 **
	 * ID which contains source for slides and canvas elements.
	 * Can only be specified on slider creation.
	 *
	 * Default: `particle-slider`
	 **
	 > Usage
	 | // Create new ParticleSlider on HtmlElement with ID `logos`
	 | var ps = new ParticleSlider({
	 |     sliderId: 'logos'
	 | });
	\*/
	ps.sliderId = 'particle-slider';

	/*\
	 * ParticleSlider.color
	 [ property (string) ]
	 **
	 * Color (rgb,rgba,hex,shorthex) for controls and slide (if monochrome = true).
	 * Can only be specified on slider creation.
	 *
	 * Default: `#fff`
	 **
	 > Usage
	 | // Each of the following examples creates a
	 | // ParticleSlider with white color.
	 |
	 | // short hex
	 | var ps = new ParticleSlider({
	 |     color: '#fff'
	 | });
	 | // hex
	 | var ps = new ParticleSlider({
	 |     color: '#ffffff'
	 | });
	 | // rgb
	 | var ps = new ParticleSlider({
	 |     color: 'rgb(255,255,255)'
	 | });
	 | // rgba
	 | var ps = new ParticleSlider({
	 |     color: 'rgba(255,255,255,1)'
	 | });
	\*/
	ps.color = '#fff';

	/*\
	 * ParticleSlider.hoverColor
	 [ property (string) ]
	 **
	 * Color (rgb,rgba,hex,shorthex) for controls on hover.
 	 * Can only be specified on slider creation.
	 *
	 * Default: `#88f`
	 **
	 > Usage
	 | // Each of the following examples creates a
	 | // ParticleSlider with white hover color.
	 |
	 | // short hex
	 | var ps = new ParticleSlider({
	 |     hoverColor: '#fff'
	 | });
	 | // hex
	 | var ps = new ParticleSlider({
	 |     hoverColor: '#ffffff'
	 | });
	 | // rgb
	 | var ps = new ParticleSlider({
	 |     hoverColor: 'rgb(255,255,255)'
	 | });
	 | // rgba
	 | var ps = new ParticleSlider({
	 |     hoverColor: 'rgba(255,255,255,1)'
	 | });
	\*/
	ps.hoverColor = '#88f';

	/*\
	* ParticleSlider.width
	[ property (number) ]
	**
	* Width in px of slider. Can set while running.
	* The slider checks this value every keyframe.
	*
	* Default: `container-width`
	**
	> Usage
	| // Create a 100px wide ParticleSlider.
	| var ps = new ParticleSlider({
	|     width: 100
	| });
	| // Create a ParticleSlider with default width
	| // and change width to 100px.
	| var ps = new ParticleSlider();
	| ps.width = 100;
	\*/
	ps.width = 0;

	/*\
	 * ParticleSlider.height
	 [ property (number) ]
	 **
	 * Height in px of slider. Can set while running.
	 * The slider checks this value every keyframe.
	 *
	 * Default: `container-width`
	 **
	 > Usage
	 | // Create a 100px high ParticleSlider.
	 | var ps = new ParticleSlider({
	 |     height: 100
	 | });
	 | // Create a ParticleSlider with default height
	 | // and change height to 100px.
	 | var ps = new ParticleSlider();
	 | ps.height = 100;
	\*/
	ps.height = 0;

	/*\
	 * ParticleSlider.ptlGap
	 [ property (number) ]
	 **
	 * Gap in px between Particles. Can set while running.
	 * The slider checks this value on every
	 * change of slide or change of size.
	 *
	 * Default: `0`
	 **
	 > Usage
	 | // Create a ParticleSlider with
	 | // 1px gap between Particles.
	 | var ps = new ParticleSlider({
	 |     ptlGap: 1
	 | });
	 | // Create a ParticleSlider with default gap
	 | // and change gap to 1px
	 | var ps = new ParticleSlider();
	 | ps.ptlGap = 1;
	\*/
	ps.ptlGap = 0;

	/*\
	 * ParticleSlider.ptlSize
	 [ property (number) ]
	 **
	 * Size in px of Particles. Can set while running.
	 *
	 * Default: `1`
	 **
	 > Usage
	 | // Create a ParticleSlider with
	 | // 2px x 2px big Particles.
	 | var ps = new ParticleSlider({
	 |     ptlSize: 2
	 | });
	 | // Create Particles with default size
	 | // and change size to 2px
	 | var ps = new ParticleSlider();
	 | ps.ptlSize = 2;
	\*/
	ps.ptlSize = 1;

	/*\
	 * ParticleSlider.slideDelay
	 [ property (number) ]
	 **
	 * Delay in seconds of autmoatic slide change.
	 * Set to `0` if no automatic change is wanted.
	 * The slider checks this value on every change
	 * of slide. Call @ParticleSlider.nextSlide()
	 * with count `0` to start the timer.
	 *
	 * Default: `10`
	 **
	 > Usage
	 | // Create a ParticleSlider with
	 | // 30s delay between slides.
	 | var ps = new ParticleSlider({
	 |     slideDelay: 30
	 | });
	 | // Create a ParticleSlider without
	 | // automatically slide change.
	 | var ps = new ParticleSlider({
	 |     slideDelay: 0
	 | });
	 | // Set slide delay to 30s and trigger timer.
	 | ps.slideDelay = 30;
	 | ps.nextSlide(0);
	\*/
	ps.slideDelay = 10;

	/*\
	 * ParticleSlider.arrowPadding
	 [ property (number) ]
	 **
	 * Inner distance between canvas border and
	 * controls in px.
	 * The slider checks this value on every
	 * change of slide or change of size.
	 *
	 * Default: `10`
	 **
	 > Usage
	 | // Create a ParticleSlider with
	 | // 25px padding.
	 | var ps = new ParticleSlider({
	 |     arrowPadding: 25
	 | });
	 | // Create a ParticleSlider without padding.
	 | var ps = new ParticleSlider({
	 |     arrowPadding: 0
	 | });
	 | // Create a ParticleSlider with default
	 | // padding and change padding to 25px
	 | var ps = new ParticleSlider();
	 | ps.arrowPadding = 25;
	\*/
	ps.arrowPadding = 10;

	/*\
	 * ParticleSlider.showArrowControls
	 [ property (boolean) ]
	 **
	 * Show / Hide controls.
	 * Slider sets value to false, if only
	 * one slide is given.
	 * The slider checks this value on every
	 * change of slide or change of size.
	 *
	 * Default: `true`
	 **
	 > Usage
	 | // Create a ParticleSlider with controls.
	 | var ps = new ParticleSlider({
	 |     showArrowControls: true
	 | });
	 | // Create a ParticleSlider without controls.
	 | var ps = new ParticleSlider({
	 |     showArrowControls: false
	 | });
	 | // Create a ParticleSlider with controls
	 | // and hide them after creation.
	 | var ps = new ParticleSlider();
	 | ps.showArrowControls = false;
	\*/
	ps.showArrowControls = true;

	/*\
	 * ParticleSlider.onNextSlide
	 [ property (function) ]
	 **
	 * This function is called after the slide changes.
	 *
	 * Default: `null`
	 **
	 > Usage
	 | // Creates a ParticleSlider which shows an
	 | // alert after slide change.
	 | var ps = new ParticleSlider({
	 |     onNextSlide: function(){alert('next slide');}
	 | });
	 | // Create a ParticleSlider and attach
	 | // function onNextSlide after creation.
	 | var ps = new ParticleSlider();
	 | ps.onNextSlide = function(){alert('next slide');};
	\*/
	ps.onNextSlide = null;

	/*\
	 * ParticleSlider.onWidthChange
	 [ property (function) ]
	 **
	 * This function is called after the slider-width changes.
	 *
	 * Default: `null`
	 **
	 > Usage
	 | // Creates a ParticleSlider which shows an
	 | // alert after slider-width change.
	 | var ps = new ParticleSlider({
	 |     onWidthChange: function(ps, newWidth){alert('width changes to ' + newWidth);}
	 | });
	 | // Create a ParticleSlider and attach
	 | // function onWidthChange after creation.
	 | var ps = new ParticleSlider();
	 | ps.onWidthChange = function(ps, newWidth){alert('width changes to ' + newWidth);};
	\*/
	ps.onWidthChange = null;

	/*\
	 * ParticleSlider.onHeightChange
	 [ property (function) ]
	 **
	 * This function is called after the slider-height changes.
	 *
	 * Default: `null`
	 **
	 > Usage
	 | // Creates a ParticleSlider which shows an
	 | // alert after slider-height change.
	 | var ps = new ParticleSlider({
	 |     onHeightChange: function(ps, newHeight){alert('height changes to ' + newHeight);}
	 | });
	 | // Create a ParticleSlider and attach
	 | // function onHeightChange after creation.
	 | var ps = new ParticleSlider();
	 | ps.onHeightChange = function(ps, newHeight){alert('height changes to ' + newHeight);};
	\*/
	ps.onHeightChange = null;


	/*\
	 * ParticleSlider.onSizeChange
	 [ property (function) ]
	 **
	 * This function is called after the slider-size changes.
	 *
	 * Default: `null`
	 **
	 > Usage
	 | // Creates a ParticleSlider which shows an
	 | // alert after slider-size change.
	 | var ps = new ParticleSlider({
	 |     onSizeChange: function(ps, newWidth, newHeight){alert('size changes to w:' + newWidth + ' h: ' + newHeight);}
	 | });
	 | // Create a ParticleSlider and attach
	 | // function onSizeChange after creation.
	 | var ps = new ParticleSlider();
	 | ps.onSizeChange = function(ps, newWidth, newHeight){alert('size changes to w:' + newWidth + ' h: ' + newHeight);};
	\*/
	ps.onSizeChange = null;

	/*\
	 * ParticleSlider.monochrome
	 [ property (function) ]
	 **
	 * Tints source images in @ParticleSlider.color if value is `true`.
	 * The slider checks this value on every
	 * change of slide or change of size.
	 *
	 * Default: `false`
	 **
	 > Usage
	 | // Creates a monochrome ParticleSlider.
	 | var ps = new ParticleSlider({
	 |     monochrome: true
	 | });
	 | // Creates a colored ParticleSlider.
	 | var ps = new ParticleSlider({
	 |     monochrome: false
	 | });
	 | // Create a colored ParticleSlider and
	 | // switch to monochrome after creation.
	 | var ps = new ParticleSlider();
	 | ps.monochrome = true;
	\*/
	ps.monochrome = false;

	/*\
	 * ParticleSlider.mouseForce
	 [ property (number) ]
	 **
	 * Force which pushes the particle from cursor away.
	 * Set value to `0` to turn off particle manipulation.
	 *
	 * Default: `10000`
	 **
	 > Usage
	 | // Creates a ParticleSLider with low manipulation force.
	 | var ps = new ParticleSlider({
	 |     mouseForce: 500
	 | });
	 | // Creates a ParticleSLider with high manipulation force.
	 | var ps = new ParticleSlider({
	 |     mouseForce: 15000
	 | });
	 | // Creates a ParticleSLider without manipulation force.
	 | var ps = new ParticleSlider({
	 |     mouseForce: 0
	 | });
	 | // Create a colored ParticleSlider and
	 | // lower manipulation force.
	 | var ps = new ParticleSlider();
	 | ps.mouseForce -= 1000;
	\*/
	ps.mouseForce = 10000;

	/*\
	 * ParticleSlider.restless
	 [ property (boolean) ]
	 **
	 * Particles never stay still if restless is true.
	 * The slider checks this value on every frame.
	 *
	 * Default: `true`
	 **
	 > Usage
	 | // Creates a ParticleSLider with restless Particles.
	 | var ps = new ParticleSlider({
	 |     restless: true
	 | });
	 | // Creates a ParticleSlider without restless Particles.
	 | var ps = new ParticleSlider({
	 |     mouseForce: 15000
	 | });
	 | // Dynamically enable restless Particles.
	 | var ps = new ParticleSlider();
	 | ps.restless = true;
	 | // Dynamically disable restless Particles.
	 | var ps = new ParticleSlider();
	 | ps.restless = false;
	\*/
	ps.restless = true;

	/*\
	 * ParticleSlider.imgs
	 [ property (array) ]
	 **
	 * imgs is an `array` of `images`. ParticleSlider loades
	 * images from Markup if `array` is empty.
	 *
	 * Dynamically add slides on runtime.
	 *
	 * The slider checks this value on every
	 * change of slide or change of size.
	 *
	 * Default: `[]`
	 **
	 > Usage
	 | // Creates a ParticleSLider with image-array.
	 | var imgPaths = ['img/image1.gif', 'img/image2.gif', 'img/image3.gif'];
	 | var imgs = [];
	 | for (var i = 0, ii = imgPaths.length; i < ii; i++) {
	 |     var img = new Image();
	 |     img.src = imgPaths[i];
	 |     imgs.push(img);
	 | }
	 | var ps = new ParticleSlider({
	 |     imgs: imgs
	 | });
	 | // Creates a ParticleSlider with image-array.
	 | // Changes images with smaller versions if
	 | // browser-width is below 950px
	 | var imgPaths = ['img/image1.gif', 'img/image2.gif', 'img/image3.gif'];
	 | var imgs = [];
	 | var imgsSmall = [];
	 | for (var i = 0, ii = imgPaths.length; i < ii; i++) {
	 |     var img = new Image();
	 |     var imgSmall = new Image();
	 |     img.src = imgPaths[i];
	 |     imgSmall.src = imgPaths[i].replace(/\.gif/, '_small.gif');
	 |     imgs.push(img);
	 |     imgsSmall.push(imgSmall);
	 | }
	 | var ps = new ParticleSlider({
	 |     imgs: (document.body.clientWidth <= 950) ? imgsSmall : imgs,
	 |     onSizeChange: function (ps, width, height) {
	 |         ps.imgs = (document.body.clientWidth <= 950) ? imgsSmall : imgs;
	 |         ps.init(true);
	 |     }
	 | });
	\*/
	ps.imgs = [];

	/*** value parsing ***/
	if (params) {
		var paramNames = [
			'color',
			'hoverColor',
			'width',
			'height',
			'ptlGap',
			'ptlSize',
			'slideDelay',
			'arrowPadding',
			'sliderId',
			'showArrowControls',
			'onNextSlide',
			'monochrome',
			'mouseForce',
			'restless',
			'imgs',
			'onSizeChange',
			'onWidthChange',
			'onHeightChange'
		];
		for (var i = 0, ii = paramNames.length; i < ii; i++) {
			if (params[paramNames[i]]) ps[paramNames[i]] = params[paramNames[i]];
		}
	}

	/*** HTML references ***/
	ps.$container = ps.$('#' + ps.sliderId);
	ps.$$children = ps.$container.childNodes;
	ps.$controlsContainer = ps.$('.controls');
	ps.$$slides = ps.$('.slide', ps.$('.slides').childNodes, true);
	ps.$controlLeft = null;
	ps.$controlRight = null;
	ps.$canv = ps.$('.draw');

	ps.$srcCanv = document.createElement('canvas');
	ps.$srcCanv.style.display = 'none';
	ps.$container.appendChild(ps.$srcCanv);
	ps.$prevCanv = document.createElement('canvas');
	ps.$prevCanv.style.display = 'none';
	ps.$container.appendChild(ps.$prevCanv);
	ps.$nextCanv = document.createElement('canvas');
	ps.$nextCanv.style.display = 'none';
	ps.$container.appendChild(ps.$nextCanv);
	ps.$overlay = document.createElement('p');
	ps.$container.appendChild(ps.$overlay);

	ps.imgControlPrev = null;
	ps.imgControlNext = null;

	if (ps.$$slides.length <= 1) ps.showArrowControls = false;
	if (ps.$controlsContainer && ps.$controlsContainer.childNodes && ps.showArrowControls == true) {
		ps.$controlLeft = ps.$('.left', ps.$controlsContainer.childNodes);
		ps.$controlRight = ps.$('.right', ps.$controlsContainer.childNodes);
		ps.imgControlPrev = new Image();
		ps.imgControlNext = new Image();
		ps.imgControlPrev.onload = function () {
			ps.$prevCanv.height = this.height;
			ps.$prevCanv.width = this.width;
			ps.loadingStep();
		};
		ps.imgControlNext.onload = function () {
			ps.$nextCanv.height = this.height;
			ps.$nextCanv.width = this.width;
			ps.loadingStep();
		};
		ps.imgControlPrev.src = ps.$controlLeft.getAttribute('data-src');
		ps.imgControlNext.src = ps.$controlRight.getAttribute('data-src');
	} else {
		ps.showArrowControls = false;
	}

	if (ps.width <= 0) ps.width = ps.$container.clientWidth;
	if (ps.height <= 0) ps.height = ps.$container.clientHeight;

	/*** private values (internal use) ***/
	ps.mouseDownRegion = 0;
	ps.colorArr = ps.parseColor(ps.color);
	ps.hoverColorArr = ps.parseColor(ps.hoverColor);
	ps.mx = -1;
	ps.my = -1;
	ps.swipeOffset = 0;
	ps.cw = ps.getCw();
	ps.ch = ps.getCh();
	ps.frame = 0;
	ps.nextSlideTimer = false;
	ps.currImg = 0;
	ps.lastImg = 0;
	ps.imagesLoaded = 0;
	ps.pxlBuffer = { first: null };
	ps.recycleBuffer = { first: null };

	ps.ctx = ps.$canv.getContext('2d');
	ps.srcCtx = ps.$srcCanv.getContext('2d');
	ps.prevCtx = ps.$prevCanv.getContext('2d');
	ps.nextCtx = ps.$nextCanv.getContext('2d');

	ps.$canv.width = ps.cw;
	ps.$canv.height = ps.ch;

	/*** extend Array with shuffle function ***/
	ps.shuffle = function () {
		var tmp, rand;
		for (var i = 0, ii = this.length; i < ii; i++) {
			rand = Math.floor(Math.random() * ii);
			tmp = this[i];
			this[i] = this[rand];
			this[rand] = tmp;
		}
	}
	Array.prototype.shuffle = ps.shuffle;

	/***** bind mose events *****/
	/*** canvas - mouseout ***/
	ps.$canv.onmouseout = function () {
		ps.mx = -1;
		ps.my = -1;
		ps.mouseDownRegion = 0;
	}

	/*** canvas - mousemove ***/
	ps.$canv.onmousemove = function (evt) {
		function GetElementPosition(param) {
			var x = 0, y = 0;
			var obj = (typeof param === 'string') ? ps.$(param) : param;
			if (obj) {
				x = obj.offsetLeft;
				y = obj.offsetTop;
				var body = document.getElementsByTagName('body')[0];
				while (obj.offsetParent && obj != body) {
					x += obj.offsetParent.offsetLeft;
					y += obj.offsetParent.offsetTop;
					obj = obj.offsetParent;
				}
			}
			this.x = x;
			this.y = y;
		}

		var divPos = new GetElementPosition(ps.$container);

		ps.mx = evt.clientX - divPos.x + document.body.scrollLeft + document.documentElement.scrollLeft;
		ps.my = evt.clientY - divPos.y + document.body.scrollTop + document.documentElement.scrollTop;
	}

	/*** canvas - mousedown ***/
	ps.$canv.onmousedown = function () {
		if (ps.imgs.length > 1) {
			var region = 0;
			if (ps.mx >= 0 && ps.mx < ps.arrowPadding * 2 + ps.$prevCanv.width) {
				region = -1;
			} else if (ps.mx > 0 && ps.mx > ps.cw - (ps.arrowPadding * 2 + ps.$nextCanv.width)) {
				region = 1;
			}
			ps.mouseDownRegion = region;
		}
	}

	/*** canvas - mouseup ***/
	ps.$canv.onmouseup = function () {
		if (ps.imgs.length > 1) {
			var region = '';
			if (ps.mx >= 0 && ps.mx < ps.arrowPadding * 2 + ps.$prevCanv.width) {
				region = -1;
			} else if (ps.mx > 0 && ps.mx > ps.cw - (ps.arrowPadding * 2 + ps.$nextCanv.width)) {
				region = 1;
			}
			if (region != 0 && ps.mouseDownRegion != 0) {
				if (region != ps.mouseDownRegion) region *= -1;
				if (ps.nextSlideTimer) clearTimeout(ps.nextSlideTimer);
				ps.nextSlide(region);

			}
			ps.mouseDownRegion = 0;
		}
	}

	/*** load images dynamicly ***/
	if (ps.imgs.length == 0) {
		for (var i = 0, ii = ps.$$slides.length; i < ii; i++) {
			var img = new Image();
			ps.imgs.push(img);
			img.src = ps.$$slides[i].getAttribute('data-src');
		}
	}
	if (ps.imgs.length > 0) {
		ps.imgs[0].onload = function () {
			ps.loadingStep();
		};
	}

	/*** render frames ***/
	ps.requestAnimationFrame(function () { ps.nextFrame(); });
}

/***** Particle class *****/
/*** Particle constructor ***/
/*\
 * Particle
 [ method ]
 **
 * Creates a Particle object.
 **
 > Parameters
 - ps (object) Reference to @ParticleSlider
 = (object) Returns new @Particle object
 **
 > Usage
 | // Create a new Particle
 | var ps = new ParticleSlider();
 | var ptl = new ps.Particle(ps);
\*/
var psParticle = function (ps) {
	this.ps = ps;
	/*\
	 * Particle.ttl
	 [ property (number) ]
	 **
	 * Time to live counts down every frame, and destroys
	 * Particle if `ttl` reaches `0`.
	 * Disabled if value is `null`
	 *
	 * Default: `null`
	 **
	 > Usage
	 | // Set time to live of Particle to 20 frames.
	 | ptl.ttl = 20;
	 | // Disable time to live
	 | ptl.ttl = null;
	\*/
	this.ttl = null;

	/*\
	 * Particle.color
	 [ property (array) ]
	 **
	 * Color holds 4 bytes in an array.
	 * [0]: Red, Possible Values: 0..255
	 * [1]: Green, Possible Values: 0..255
	 * [2]: Blue, Possible Values: 0..255
	 * [3]: Alpha, Possible Values: 0..255
	 *
	 * Default:
	 o value parsed from @ParticleSlider.color if
	 o @ParticleSlider.monochrome is `true`
	 * or
	 o value parsed from current slide if
	 o @ParticleSlider.monochrome is `false`
	 **
	 > Usage
	 | // Set particle color to white.
	 | ptl.color = [255,255,255,255];
	 | // Set particle color to half transparent white.
	 | ptl.color = [255,255,255,127];
	\*/
	this.color = ps.colorArr;

	this.next = null;
	this.prev = null;


	/*\
	 * Particle.gravityX
	 [ property (number) ]
	 **
	 * Home coordinate (x) from Particle.
	 * The Particle is forced to get this coordinates
	 * See @Particle.gravityY
	 *
	 * Default: `0`
	 **
	 > Usage
	 | // Set particle home to left border.
	 | ptl.gravityX = 0;
	 | // Set particle home to right border.
	 | ptl.gravityX = ps.width - 1;
	 | // Set particle home to horizontal center.
	 | ptl.gravityX = ps.width / 2;
	\*/
	this.gravityX = 0;

	/*\
	 * Particle.gravityY
	 [ property (number) ]
	 **
	 * Home coordinate (y) from Particle.
	 * The Particle is forced to get this coordinates.
	 * See @Particle.gravityX
	 *
	 * Default: `0`
	 **
	 > Usage
	 | // Set particle home to top border.
	 | ptl.gravityY = 0;
	 | // Set particle home to bottom border.
	 | ptl.gravityY = ps.height - 1;
	 | // Set particle home to vertical center.
	 | ptl.gravityY = ps.height / 2;
	\*/
	this.gravityY = 0;

	/*\
	 * Particle.x
	 [ property (number) ]
	 **
	 * Current coordinate (x) from Particle.
	 * See @Particle.y
	 *
	 * Default:
	 * Random value between `0` and @ParticleSlider.width
	 **
	 > Usage
	 | // Set particle position to left border.
	 | ptl.x = 0;
	 | // Set particle position to right border.
	 | ptl.x = ps.width - 1;
	 | // Set particle position to horizontal center.
	 | ptl.x = ps.width / 2;
	\*/
	this.x = Math.random() * ps.cw;

	/*\
	 * Particle.y
	 [ property (number) ]
	 **
	 * Current coordinate (y) from Particle.
	 * See @Particle.x
	 *
	 * Default:
	 * Random value between `0` and @ParticleSlider.height
	 **
	 > Usage
	 | // Set particle position to top border.
	 | ptl.y = 0;
	 | // Set particle position to bottom border.
	 | ptl.y = ps.height - 1;
	 | // Set particle position to vertical center.
	 | ptl.y = ps.height / 2;
	\*/
	this.y = Math.random() * ps.ch;

	/*\
	 * Particle.velocityX
	 [ property (number) ]
	 **
	 * Current velocity in horizontal direction.
	 * See @Particle.velocityY
	 *
	 * Default:
	 * Random value between `-5` and `+5`
	 **
	 > Usage
	 | // Set horizontal particle velocity targeting left border.
	 | ptl.velocityX = -10;
	 | // Accelerate particle targeting left border.
	 | ptl.velocityX -= 10;
	 | // Set horizontal particle velocity targeting right border.
	 | ptl.velocityX = 10;
	 | // Accelerate particle targeting right border.
	 | ptl.velocityX += 10;
	 | // Stop horizontal particle velocity.
	 | ptl.velocityX = 0;
	\*/
	this.velocityX = Math.random() * 10 - 5;

	/*\
	 * Particle.velocityY
	 [ property (number) ]
	 **
	 * Current velocity in vertical direction.
	 * See @Particle.velocityX
	 *
	 * Default:
	 * Random value between `-5` and `+5`
	 **
	 > Usage
	 | // Set vertical particle velocity targeting top border.
	 | ptl.velocityY = -10;
	 | // Accelerate particle targeting top border.
	 | ptl.velocityY -= 10;
	 | // Set vertical particle velocity targeting bottom border.
	 | ptl.velocityY = 10;
	 | // Accelerate particle targeting bottom border.
	 | ptl.velocityY += 10;
	 | // Stop vertical particle velocity.
	 | ptl.velocityY = 0;
	\*/
	this.velocityY = Math.random() * 10 - 5;
}

/*\
 * Particle.move
 [ method ]
 **
 * @Particle moves under the action of the given forces.
 * See @Particle.x
 * See @Particle.y
 * See @Particle.gravityX
 * See @Particle.gravityY
 * See @Particle.velocityX
 * See @Particle.velocityY
 * See @ParticleSlider.mouseForce
 **
 > Usage
 | // Example moves Particle under the action of the given forces.
 | ptl.move();
\*/
psParticle.prototype.move = function () {
	var ps = this.ps;
	var p = this;
	if (this.ttl != null && this.ttl-- <= 0) {
		ps.swapList(p, ps.pxlBuffer, ps.recycleBuffer);
		this.ttl = null;
		return;
	}
	var gravityDX = this.gravityX + ps.swipeOffset - this.x;
	var gravityDY = this.gravityY - this.y;
	var gravityDistance = Math.sqrt(Math.pow(gravityDX, 2) + Math.pow(gravityDY, 2));
	var gravityAngle = Math.atan2(gravityDY, gravityDX);
	var gravityForce = gravityDistance * 0.01;
	if (ps.restless == true) {
		gravityForce += Math.random() * 0.1 - 0.05;
	} else {
		if (gravityForce < 0.01) {
			this.x = this.gravityX + 0.25;
			this.y = this.gravityY + 0.25;
		}
	}

	var cursorForce = 0;
	var cursorAngle = 0;

	if (ps.mx >= 0 && ps.mouseForce) {
		var cursorDX = this.x - ps.mx;
		var cursorDY = this.y - ps.my;
		cursorForce = Math.min(ps.mouseForce / (Math.pow(cursorDX, 2) + Math.pow(cursorDY, 2)), ps.mouseForce);
		cursorAngle = Math.atan2(cursorDY, cursorDX);
		if (typeof this.color == 'function') {
			cursorAngle += Math.PI;
			cursorForce *= 0.001 + Math.random() * 0.1 - 0.05;
		}
	}
	else {
		cursorForce = 0;
		cursorAngle = 0;
	}

	this.velocityX += gravityForce * Math.cos(gravityAngle) + cursorForce * Math.cos(cursorAngle);
	this.velocityY += gravityForce * Math.sin(gravityAngle) + cursorForce * Math.sin(cursorAngle);

	this.velocityX *= 0.92;
	this.velocityY *= 0.92;

	this.x += this.velocityX;
	this.y += this.velocityY;

}

/* move Particle to ParticleSlider namespace */
ParticleSlider.prototype.Particle = psParticle;

/*\
 * ParticleSlider.swapList
 [ method ]
 **
 > Parameters
 - p (object) #optional Particle which should be swaped between two lists
 - srcList (object) Root-element of a double linked list. Attribute `first` needed
 - dstList (object) Target-element of a double linked list. Attribute `first` needed
 **
 * Method removes @Particle p from srcList. If no @Particle is given, a new would created.
 * Afterwards p was added to the beginning of dstList.
 **
 > Usage
 | // Example removes p from buffer and moves p to trash.
 | ps.swapList(p, buffer, trash);
 | // Example adds new Particle to buffer or recycles Particle from trash.
 | ps.swapList(trash.first, trash, buffer);
\*/
ParticleSlider.prototype.swapList = function (p, srcList, dstList) {
	var ps = this;

	if (p == null) {
		//p is not defined - create new Particle
		p = new ps.Particle(ps);
	} else {
		//remove p from srcList
		if (srcList.first == p) {
			if (p.next != null) {
				p.next.prev = null;
				srcList.first = p.next;
			}
			else {
				srcList.first = null;
			}
		}
		else {
			if (p.next == null) {
				p.prev.next = null;
			}
			else {
				p.prev.next = p.next;
				p.next.prev = p.prev;
			}
		}
	}

	//add to dstList
	if (dstList.first == null) {
		dstList.first = p;
		p.prev = null;
		p.next = null;
	}
	else {
		p.next = dstList.first;
		dstList.first.prev = p;
		dstList.first = p;
		p.prev = null;
	}
}

/*\
 * ParticleSlider.parseColor
 [ method ]
 **
 > Parameters
 o color (string) Hexadecimal color. Example: `#ffffff`
 * or
 o color (string) short Hexadecimal color. Example: `#fff`
 * or
 o color (string) rgb color. Example: `rgb(255,255,255)`
 * or
 o color (string) rgba color. Example: `rgba(255,255,255,1)`
 = (array) returns for fields long color [red,green,blue,alpha]
 **
 * Parse color to array [red,green,blue,alpha].
 * red: 0..255
 * green: 0..255
 * blue: 0..255
 * alpha: 0..255
 *
 * See @ParticleSlider.color
 * See @ParticleSlider.hoverColor
 **
 > Usage
 | // All function calls return [255,255,255,255]
 | // hex
 | ps.parseColor('#ffffff');
 | // short hex
 | ps.parseColor('#fff');
 | // rgb
 | ps.parseColor('rgba(255,255,255)');
 | // rgba
 | ps.parseColor('rgba(255,255,255,1)');
\*/
ParticleSlider.prototype.parseColor = function (result) {
	var tmp;
	var result = result.replace(' ', '');

	if (tmp = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(result)) {
		tmp = [parseInt(tmp[1], 16), parseInt(tmp[2], 16), parseInt(tmp[3], 16)];
	} else if (tmp = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(result)) {
		tmp = [parseInt(tmp[1], 16) * 17, parseInt(tmp[2], 16) * 17, parseInt(tmp[3], 16) * 17];
	} else if (tmp = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(result)) {
		tmp = [+tmp[1], +tmp[2], +tmp[3], +tmp[4]];
	} else if (tmp = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(result)) {
		tmp = [+tmp[1], +tmp[2], +tmp[3]];
	} else return null;

	if (isNaN(tmp[3])) {
		(tmp[3] = 1);
	}

	tmp[3] *= 255;

	return tmp;
}

/*\
 * ParticleSlider.loadingStep
 [ method ]
 **
 * Every loaded element calls this function.
 * If all necessary ressources are loaded, the slider starts
 * his timers and begins to generate and render Particles
 **
 > Usage
 | // Function should called after necessary ressource is loaded.
 | ps.loadingStep();
\*/
ParticleSlider.prototype.loadingStep = function () {
	var ps = this;
	ps.imagesLoaded++;
	if (ps.imagesLoaded >= 3 || ps.showArrowControls == false) {
		ps.resize();
		if (ps.slideDelay > 0) ps.nextSlideTimer = setTimeout(function () { ps.nextSlide() }, 1000 * ps.slideDelay);
	}
}

/*\
 * ParticleSlider.$
 [ method ]
 **
 > Parameters
 - query (string) pattern to search
 * (starts with `.` if matching class is searched.)
 * (starts with `#` if matching id is searched.)
 - elems (array) #optional array of HtmlElements to filter.
 * searches in children of @ParticleSlider.sliderId if empty
 - asArray (boolean) forces array as result. Default: `false`
 = (array) returns array if multiple matches, or `asArray` is `true`
 * or
 = (object) returns HtmlElement if single element matches and `asArray` is `false`
 * or
 = (string) returns `id` or `class` of searched element
 * if no element matches and `asArray` is `false`
 **
 * Searches jQuery like in HtmlElements.
 **
 > Usage
 | // Example returns current drawing Canvas
 | ps.$('.draw');
\*/
ParticleSlider.prototype.$ = function (query, elems, asArray) {
	var ps = this;
	if (query[0] == '.') {
		var elemClass = query.substr(1);
		if (!elems) elems = ps.$$children;
		var result = [];
		for (var i = 0, ii = elems.length; i < ii; i++) {
			if (elems[i].className && elems[i].className == elemClass) result.push(elems[i]);
		}
		if (result.length == 0) {
			return null;
		} else if (result.length == 1 && !asArray) {
			return result[0];
		} else {
			return result;
		}
	} else return document.getElementById(query.substr(1));
}

/*\
 * ParticleSlider.nextFrame
 [ method ]
 **
 * Moves all Particles and render particles afterwards.
 **
 > Usage
 | // Render next frame
 | ps.nextFrame();
\*/
ParticleSlider.prototype.nextFrame = function () {
	var ps = this;

	if ((ps.mouseDownRegion == 1 && ps.mx < ps.cw / 2) || (ps.mouseDownRegion == -1 && ps.mx > ps.cw / 2)) {
		ps.swipeOffset = (ps.mx - ps.cw / 2);
	} else {
		ps.swipeOffset = 0;
	}

	var p = ps.pxlBuffer.first;
	var next = null;
	while (p != null) {
		next = p.next;
		p.move();
		p = next;
	}

	ps.drawParticles();

	if (ps.frame++ % 25 == 0 && (ps.cw != ps.getCw() || ps.ch != ps.getCh())) {
		var tmpCh = ps.getCh();
		var tmpCw = ps.getCw();
		if (ps.ch != tmpCw) {
			if (typeof ps.onWidthChange === 'function') {
				ps.onWidthChange(ps, tmpCw);
			}
		}
		if (ps.ch != tmpCh) {
			if (typeof ps.onHeightChange === 'function') {
				ps.onHeightChange(ps, tmpCh);
			}
		}
		if (typeof ps.onSizeChange === 'function') {
			ps.onSizeChange(ps, tmpCw, tmpCh);
		}
		ps.resize();
	}

	setTimeout(function () {
		ps.requestAnimationFrame(function () { ps.nextFrame(); });
	}, 15);
}

/*\
 * ParticleSlider.nextSlide
 [ method ]
 **
 > Parameters
 - count (number) #optional slide-index would moved `count` slides. Default: `1`
 **
 * Method switches slides or refreshes slide if `count` is `0`
 **
 > Usage
 | // Show next slide
 | ps.nextSlide();
 | // or
 | ps.nextSlide(1);
 | // Show previous slide
 | ps.nextSlide(-1);
 | // Refresh slide
 | ps.nextSlide(0);
\*/
ParticleSlider.prototype.nextSlide = function (count) {
	var ps = this;
	if (ps.nextSlideTimer != null && ps.imgs.length > 1) {
		ps.currImg = (ps.currImg + ps.imgs.length + (count ? count : 1)) % ps.imgs.length;
		ps.resize();
		if (ps.slideDelay > 0) ps.nextSlideTimer = setTimeout(function () { ps.nextSlide() }, 1000 * ps.slideDelay);
	}
	else {
		if (ps.slideDelay > 0) ps.nextSlideTimer = setTimeout(function () { ps.nextSlide() }, 1000 * ps.slideDelay);
	}
	if (typeof ps.onNextSlide === 'function') {
		ps.onNextSlide(ps.currImg);
	}
}

/*\
 * ParticleSlider.drawParticles
 [ method ]
 **
 * Draws all @Particle to canvas
 **
 > Usage
 | // Draw all particles
 | ps.drawParticles();
\*/
ParticleSlider.prototype.drawParticles = function () {
	var ps = this;

	//ps.ctx.fillStyle = 'rgba(0,0,0,1)';
	//ps.ctx.fillRect(0, 0, ps.cw, ps.ch);

	//for (var i = 0; i < ps.pxls.length; i++) {
	//	if (ps.pxls[i].x >= 0 && ps.pxls[i].x < ps.cw && ps.pxls[i].y >= 0 && ps.pxls[i].y < ps.ch) {
	//		ps.ctx.fillStyle = ((ps.pxls[i].left && ps.mx >= 0 && ps.mx < ps.arrowPadding * 2 + ps.arrowWidth) ||
	//				(ps.pxls[i].right && ps.mx > 0 && ps.mx > ps.cw - (ps.arrowPadding * 2 + ps.arrowWidth))) ? ps.hoverColor : ps.color;
	//		ps.ctx.beginPath();
	//		ps.ctx.arc(ps.pxls[i].x, ps.pxls[i].y, ps.ptlSize, 0, 2 * Math.PI, false);
	//		ps.ctx.closePath();
	//		ps.ctx.fill();
	//	}
	//}

	//return;
	var imageData = ps.ctx.createImageData(ps.cw, ps.ch);
	var actualData = imageData.data;

	var index;
	var X;
	var Y;
	var dX;
	var dY;
	var color;

	var p = ps.pxlBuffer.first;
	while (p != null) {
		X = ~~p.x;
		Y = ~~p.y;

		for (dX = X; dX < X + ps.ptlSize && dX >= 0 && dX < ps.cw; dX++) {
			for (dY = Y; dY < Y + ps.ptlSize && dY >= 0 && dY < ps.ch; dY++) {
				index = (dY * imageData.width + dX) * 4;
				color = typeof p.color == 'function' ? p.color() : p.color;
				actualData[index + 0] = color[0];
				actualData[index + 1] = color[1];
				actualData[index + 2] = color[2];
				actualData[index + 3] = color[3];
			}
		}

		p = p.next;
	}

	imageData.data = actualData;
	ps.ctx.putImageData(imageData, 0, 0);
}

/*\
 * ParticleSlider.getPixelFromImageData
 [ method ]
 **
 > Parameters
 - imageData (object) image data from canvas. Array of colors
 * and alpha with `width` and `height` attributes
 - offsetX (number) offset would be added to x value of image.
 - offsetY (number) offset would be added to y value of image.
 = (array) Array of objects with following form:
 o {
 o     x (number) vertical position
 o     y (number) horizontal position
 o     color (array) color array with [red, green, blue, alpha]
 o }
 **
 * Method extracts all non transparent pixels to result array.
 * Offset x,y would be added to original coodinates.
 **
 > Usage
 | // Extracts non transparent pixel from image data without offset
 | ps.getPixelFromImageData(imageData, 0, 0);
 | // Extracts non transparent pixel from image data with 50px vertical offset
 | ps.getPixelFromImageData(imageData, 50, 0);
 | // Extracts non transparent pixel from image data with 50px horizontal offset
 | ps.getPixelFromImageData(imageData, 0, 50);
\*/
ParticleSlider.prototype.getPixelFromImageData = function (imageData, offsetX, offsetY) {
	var ps = this;

	var result = [];
	for (var x = 0; x < imageData.width; x += ps.ptlGap + 1) {
		for (var y = 0; y < imageData.height; y += ps.ptlGap + 1) {
			i = (y * imageData.width + x) * 4;

			if (imageData.data[i + 3] > 0) {
				result.push({
					x: offsetX + x,
					y: offsetY + y,
					color: (ps.monochrome == true ?
						[ps.colorArr[0], ps.colorArr[1], ps.colorArr[2], ps.colorArr[3]] :
						[imageData.data[i], imageData.data[i + 1], imageData.data[i + 2], imageData.data[i + 3]])
				});
			}
		}
	}
	return result;
}

/*\
 * ParticleSlider.init
 [ method ]
 **
 > Parameters
 - shuffe (boolean) randomizes particles if shuffle = true.
 **
 * Initializes @ParticleSlider and extracts Particle from current slide.
 **
 > Usage
 | // Initializes ParticleSlider
 | ps.init();
 | // Initializes ParticleSlider and shuffle particles
 | ps.init(true);
\*/
ParticleSlider.prototype.init = function (shuffe) {
	var ps = this;
	if (ps.imgs.length > 0) {
		ps.$srcCanv.width = ps.imgs[ps.currImg].width;
		ps.$srcCanv.height = ps.imgs[ps.currImg].height;
		ps.srcCtx.clearRect(0, 0, ps.$srcCanv.width, ps.$srcCanv.height);
		ps.srcCtx.drawImage(ps.imgs[ps.currImg], 0, 0);
		var tmpParticles = ps.getPixelFromImageData(
			ps.srcCtx.getImageData(0, 0, ps.$srcCanv.width, ps.$srcCanv.height),
			~~((ps.cw / 2) - (ps.$srcCanv.width / 2)),
			~~((ps.ch / 2) - (ps.$srcCanv.height / 2))
		);

		if (ps.showArrowControls == true) {
			ps.prevCtx.clearRect(0, 0, ps.$prevCanv.width, ps.$prevCanv.height);
			ps.prevCtx.drawImage(ps.imgControlPrev, 0, 0);
			var prevParticles = ps.getPixelFromImageData(
				ps.prevCtx.getImageData(0, 0, ps.$prevCanv.width, ps.$prevCanv.height),
				ps.arrowPadding,
				~~(ps.ch / 2 - ps.$prevCanv.height / 2)
			);

			for (var i = 0, ii = prevParticles.length; i < ii; i++) {
				prevParticles[i].color = function () {
					return ps.mx >= 0 && ps.mx < ps.arrowPadding * 2 + ps.$prevCanv.width ? ps.hoverColorArr : ps.colorArr;
				};
				tmpParticles.push(prevParticles[i]);
			}

			ps.nextCtx.clearRect(0, 0, ps.$nextCanv.width, ps.$nextCanv.height);
			ps.nextCtx.drawImage(ps.imgControlNext, 0, 0);
			var nextParticles = ps.getPixelFromImageData(
				ps.nextCtx.getImageData(0, 0, ps.$nextCanv.width, ps.$nextCanv.height),
				ps.cw - ps.arrowPadding - ps.$nextCanv.width,
				~~(ps.ch / 2 - ps.$nextCanv.height / 2)
			);

			for (var i = 0, ii = nextParticles.length; i < ii; i++) {
				nextParticles[i].color = function () {
					return ps.mx > 0 && ps.mx > ps.cw - (ps.arrowPadding * 2 + ps.$nextCanv.width) ? ps.hoverColorArr : ps.colorArr;
				};
				tmpParticles.push(nextParticles[i]);
			}
		}

		if (ps.currImg != ps.lastImg || shuffe == true) {
			tmpParticles.shuffle();
			ps.lastImg = ps.currImg;
		}

		var p = ps.pxlBuffer.first;
		for (var i = 0, ii = tmpParticles.length; i < ii; i++) {
			var target = null;
			if (p != null) {
				target = p;
				p = p.next;
			} else {
				ps.swapList(ps.recycleBuffer.first, ps.recycleBuffer, ps.pxlBuffer);
				target = ps.pxlBuffer.first;
			}
			target.gravityX = tmpParticles[i].x;
			target.gravityY = tmpParticles[i].y;
			target.color = tmpParticles[i].color;
		}

		while (p != null) {
			p.ttl = ~~(Math.random() * 10);
			p.gravityY = ~~(ps.ch * Math.random());
			p.gravityX = ~~(ps.cw * Math.random());
			p = p.next;
		}

		ps.$overlay.innerHTML = ps.$$slides[ps.currImg].innerHTML;
	}
}

/*\
 * ParticleSlider.getCw
 [ method ]
 **
 = (number) Desired width of drawing canvas
 **
 * Get current desired width of canvas.
 * Override function to special responsive layouts.
 * Default function fits canvas to minimum of @ParticleSlider.width
 * and document width. Returned value is checked every keyframe.
 **
 > Usage
 | // Get desired width
 | ps.getCw();
 | // Override default behavior with mehtod that
 | // sets desired width to size of specific html element
 | ps.getCw = function(){return specificElement.clientWidth};
\*/
ParticleSlider.prototype.getCw = function () {
	var ps = this;
	return Math.min(document.body.clientWidth, ps.width, ps.$container.clientWidth);
}

/*\
 * ParticleSlider.getCh
 [ method ]
 **
 = (number) Desired height of drawing canvas
 **
 * Get current desired height of canvas.
 * Override function to special responsive layouts.
 * Default function fits canvas to minimum of @ParticleSlider.height
 * and document height. Returned value is checked every keyframe.
 **
 > Usage
 | // Get desired height
 | ps.getCh();
 | // Override default behavior with mehtod that
 | // sets desired height to size of specific html element
 | ps.getCw = function(){return specificElement.clientWidth};
\*/
ParticleSlider.prototype.getCh = function () {
	var ps = this;
	return Math.min(document.body.clientHeight, ps.height, ps.$container.clientHeight);
}

/*\
 * ParticleSlider.resize
 [ method ]
 **
 * Resizes canvas to values got from @ParticleSlider.getCw and
 * @ParticleSlider.getCh
 **
 > Usage
 | // Resize ParticleSlider
 | ps.resize();
\*/
ParticleSlider.prototype.resize = function () {
	var ps = this;
	ps.cw = ps.getCw();
	ps.ch = ps.getCh();
	ps.$canv.width = ps.cw;
	ps.$canv.height = ps.ch;
	ps.init(true);
}

/*\
 * ParticleSlider.setColor
 [ method ]
 **
 > Parameters
 - color (string) (rgb,rgba,hex,shorthex) for controls and slide (if monochrome = true).
 **
 * Set @ParticleSlider.color on runtime.
 * See @ParticleSlider.parseColor for accepted formats
 **
 > Usage
 | // Each of the following examples changes the
 | // color of ParticleSlider `ps` to white.
 |
 | // short hex
 | ps.setColor('#fff');
 | });
 | // hex
 | ps.setColor('#ffffff');
 | });
 | // rgb
 | ps.setColor('rgb(255,255,255)');
 | });
 | // rgba
 | ps.setColor('rgba(255,255,255,1)');
 | });
\*/
ParticleSlider.prototype.setColor = function (color) {
	var ps = this;
	ps.colorArr = ps.parseColor(color);
}

/*\
 * ParticleSlider.setHoverColor
 [ method ]
 **
 > Parameters
 - color (string) (rgb,rgba,hex,shorthex) for controls on hover.
 **
 * Set @ParticleSlider.hoverColor on runtime.
 * See @ParticleSlider.parseColor for accepted formats
 **
 > Usage
 | // Each of the following examples changes the
 | // hoverColor of ParticleSlider `ps` to white.
 |
 | // short hex
 | ps.setColorsetHoverColor('#fff');
 | });
 | // hex
 | ps.setHoverColor('#ffffff');
 | });
 | // rgb
 | ps.setHoverColor('rgb(255,255,255)');
 | });
 | // rgba
 | ps.setHoverColor('rgba(255,255,255,1)');
 | });
\*/
ParticleSlider.prototype.setHoverColor = function (color) {
	var ps = this;
	ps.hoverColorArr = ps.parseColor(color);
}

ParticleSlider.prototype.requestAnimationFrame = function (callback) {
	var ps = this;

	var fnAnimFrame = (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	);
	fnAnimFrame(callback);
};