
(function(exports) {
  'use strict';

  const _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ setTimeout(callback, 10) };
  let options, imageData, renderCount;
  let index, startIndex, layerIndex;
  let origin, particle, touch, touchIndex, rect;
  let x, y, z, dX, dY, dZ, distance;
  let force, angle, intensity, vertices;
  let canvas, context, data, r, g, b, a;

  const NextParticle = class NextParticle {
    constructor(optionsParam) {
      options = {};
      if (optionsParam) {
        if (optionsParam.nodeName) {
          options = JSON.parse(JSON.stringify(optionsParam.dataset));
          if (optionsParam.nodeName === 'IMG') {
            options.image = optionsParam;
          } else {
            options.wrapperElement = optionsParam;
          }
        } else {
          options = optionsParam;
        }
      }
      this.state = 'stopped';
      this.touches = [];
      this.on('imageLoaded', this._onImageLoaded);
      this._initImage(options);
    }

    on(event, fn) {
      this.events = this.events || {};
      this.events[event] = this.events[event] || [];
      this.events[event].push(fn);
    }

    emit(event) {
      const events = this.events[event];
      if (events && events.length) {
        for (const cb of events) {
          cb.call(this);
        }
      }
    }

    get renderer() {
      return this._renderer;
    }

    set renderer(value) {
      this._renderer = value;
      this._draw = this['_' + value + 'Renderer'];
      try {
        this['_' + value + 'InitContext']();
      } catch (e) {
        console.log(e);
        if (value !== 'default') {
          this.renderer = 'default';
        }
      }
    }

    set color(value) {
      this.colorArr = this._parseColor(value);
      if (this.colorArr) {
        if (isNaN(this.colorArr[3])) {
          this.colorArr[3] = 255;
        }
        if (0 < this.colorArr[3] && this.colorArr[3] <= 1) {
          this.colorArr[3] *= 255;
        }
      }
    }

    start(optionsParam) {
      options = optionsParam || {};
      this.initPosition = options.initPosition || this.initPosition;
      this.initDirection = options.initDirection || this.initDirection;
      if (this.canvas) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.display = '';
      }
      this._initOrigins();
      this._initParticles();
      if (this.state !== 'running') {
        this.state = 'running';
        if (!this.disableInteraction) {
          if ('ontouchstart' in window || window.navigator.msPointerEnabled) {
            document.body.addEventListener('touchstart', this._touchHandler);
            document.body.addEventListener('touchmove', this._touchHandler);
            document.body.addEventListener('touchend', this._clearTouches);
            document.body.addEventListener('touchcancel', this._clearTouches);
          } else {
            this.canvas.addEventListener('mousemove', this._mouseHandler);
            this.canvas.addEventListener('mouseout', this._clearTouches);
          }
        }
        this._animate();
      }
    }

    stop(optionsParam) {
      options = optionsParam || {};
      this.fadePosition = options.fadePosition || this.fadePosition;
      this.fadeDirection = options.fadeDirection || this.fadeDirection;
      this._fade();
      document.body.removeEventListener('touchstart', this._touchHandler);
      document.body.removeEventListener('touchmove', this._touchHandler);
      document.body.removeEventListener('touchend', this._clearTouches);
      document.body.removeEventListener('touchcancel', this._clearTouches);
      this.canvas.removeEventListener('mousemove', this._mouseHandler);
      this.canvas.removeEventListener('mouseout', this._clearTouches);
    }

    _animate() {
      if (this.state !== 'stopped') {
        this._calculate();
        this._draw();
        _requestAnimationFrame(() => this._animate());
      } else {
        this.emit('stopped');
      }
    }

    get _mouseHandler() {
      return (e) => {
        this.touches = [{
          x: e.offsetX,
          y: e.offsetY,
          z: 0,
          force: 1,
        }];
      };
    }

    get _touchHandler() {
      return (e) => {
        this.touches = [];
        rect = this.canvas.getBoundingClientRect();
        for (touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++) {
          touch = e.changedTouches[touchIndex];
          if (touch.target === this.canvas) {
            this.touches.push({
              x: touch.pageX - rect.left,
              y: touch.pageY - rect.top,
              z: 0,
              force: touch.force || 1,
            });
            e.preventDefault();
          }
        }
      };
    }

    get _clearTouches() {
      return (e) => {
        this.touches = [];
      };
    }

    _onImageLoaded() {
      this.imageWidth = this.image.naturalWidth || this.image.width;
      this.imageHeight = this.image.naturalHeight || this.image.height;
      this.imageRatio = this.imageWidth / this.imageHeight;
      this.width = this.width || this.imageWidth;
      this.height = this.height || this.imageHeight;
      this.renderSize = (this.width + this.height) / 4;
      if (this.srcImage) {
        this.srcImage.style.display = 'none';
      }
      this._initSettings(options);
      this._initContext(options);
      this._initResponsive(options);
      this.start();
    }

    _initImage(options) {
      this.srcImage = options.image;
      if (!this.srcImage && options.imageId) {
        this.srcImage = document.getElementById(options.imageId);
      }
      this.imageUrl = options.imageUrl || this.srcImage.src;
      this.image = document.createElement('img');
      this.wrapperElement = options.wrapperElement || this.srcImage.parentElement;
      this.image.onload = () => this.emit('imageLoaded');
      this.image.crossOrigin = 'Anonymous';
      if (options.addTimestamp) {
        if (/\?/.test(this.imageUrl)) {
          this.imageUrl += '&d=' + Date.now();
        } else {
          this.imageUrl += '?d=' + Date.now();
        }
      }
      this.image.src = this.imageUrl;
    }

    _initContext(options) {
      this.canvas = options.canvas;
      if (!this.canvas && !this.context && this.wrapperElement) {
        this.canvas = document.createElement('canvas');
        this.wrapperElement.appendChild(this.canvas);
      }
      if (this.convas) {
        this.convas.style.display = 'none';
      }
      this.context = options.context;
      this.renderer = options.renderer || 'default';
    }

    _defaultInitContext(options) {
      this.context = this.context || this.canvas.getContext('2d');
      // this.context.scale(2,2);
    }

    _webglInitContext() {
      this.context = this.context || this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      this.fragmentShaderScript = `
        void main(void) {
         gl_FragColor = vec4(1, 1, 1, 0.7);
        }
      `;

      this.vertexShaderScript = `
        attribute vec3 vertexPosition;
        vec3 offset = vec3(-5, 3, 100);
        vec3 mirror = vec3(0.01, -0.01, 1);

        uniform mat4 modelViewMatrix;
        uniform mat4 perspectiveMatrix;

        void main(void) {
          gl_Position = perspectiveMatrix * modelViewMatrix * vec4(mirror * vertexPosition + offset, 1.0);
          gl_PointSize = 1.0;
        }
      `;
      this.context.viewport(0, 0, this.width, this.height);
      const vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
      this.context.shaderSource(vertexShader, this.vertexShaderScript);
      this.context.compileShader(vertexShader);
      const fragmentShader = this.context.createShader(this.context.FRAGMENT_SHADER);
      this.context.shaderSource(fragmentShader, this.fragmentShaderScript);
      this.context.compileShader(fragmentShader);
      this.program = this.context.createProgram();
      this.context.attachShader(this.program, vertexShader);
      this.context.attachShader(this.program, fragmentShader);
      this.context.linkProgram(this.program);
      this.context.useProgram(this.program);
      this.vertexPosition = this.context.getAttribLocation(this.program, 'vertexPosition');
      this.context.enableVertexAttribArray(this.vertexPosition);
      this.context.clearColor(0.0, 0.0, 0.0, 1.0);
      this.context.clearDepth(1.0);
      this.context.enable(this.context.BLEND);
      this.context.disable(this.context.DEPTH_TEST);
      this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE);
      this.vertexBuffer = this.context.createBuffer();
      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBuffer);
      this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
      var fieldOfView = 1.0;
      var aspectRatio = this.width / this.height;
      var nearPlane = 1;
      var farPlane = 10000;
      var top = nearPlane * Math.tan(fieldOfView * Math.PI / 360.0);
      var bottom = -top;
      var right = top * aspectRatio;
      var left = -right;
      var a = (right + left) / (right - left);
      var b = (top + bottom) / (top - bottom);
      var c = (farPlane + nearPlane) / (farPlane - nearPlane);
      var d = (2 * farPlane * nearPlane) / (farPlane - nearPlane);
      var x = (2 * nearPlane) / (right - left);
      var y = (2 * nearPlane) / (top - bottom);
      var perspectiveMatrix = [
        x, 0, a, 0,
        0, y, b, 0,
        0, 0, c, d,
        0, 0, -1, 0,
      ];
      var modelViewMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ];
      var vertexPosAttribLocation = this.context.getAttribLocation(this.program, 'vertexPosition');
      this.context.vertexAttribPointer(vertexPosAttribLocation, 3.0, this.context.FLOAT, false, 0, 0);
      var uModelViewMatrix = this.context.getUniformLocation(this.program, 'modelViewMatrix');
      var uPerspectiveMatrix = this.context.getUniformLocation(this.program, 'perspectiveMatrix');
      this.context.uniformMatrix4fv(uModelViewMatrix, false, new Float32Array(perspectiveMatrix));
      this.context.uniformMatrix4fv(uPerspectiveMatrix, false, new Float32Array(modelViewMatrix));
    }

    _initSettings(options) {
      this.width = options.width || this.width;
      this.height = options.height || this.height;
      this.maxWidth = options.maxWidth;
      this.maxHeight = options.maxHeight;
      this.minWidth = options.minWidth;
      this.minHeight = options.minHeight;
      if (this.maxWidth) {
        if (/%$/.test(this.maxWidth)) {
          this.maxWidth = (this.width * this.maxWidth.replace('%', '')) / 100;
        } else {
          this.maxWidth *= 1;
        }
      }
      if (this.maxHeight) {
        if (/%$/.test(this.maxHeight)) {
          this.maxHeight = (this.height * this.maxHeight.replace('%', '')) / 100;
        } else {
          this.maxHeight *= 1;
        }
      }
      if (this.minWidth) {
        if (/%$/.test(this.minWidth)) {
          this.minWidth = (this.width * this.minWidth.replace('%', '')) / 100;
        } else {
          this.minWidth *= 1;
        }
      }
      if (this.minHeight) {
        if (/%$/.test(this.minHeight)) {
          this.minHeight = (this.height * this.minHeight.replace('%', '')) / 100;
        } else {
          this.minHeight *= 1;
        }
      }
      this.alphaFade = 0.4;
      this.gravity = options.gravity * 1 || 0.08;
      this.particleGap = options.particleGap * 1 || 3;
      this.layerCount = options.layerCount || 1;
      this.layerDistance = options.layerDistance || this.particleGap;
      this.initPosition = options.initPosition || 'random';
      this.initDirection = options.initDirection || 'random';
      this.fadePosition = options.fadePosition || 'none';
      this.fadeDirection = options.fadeDirection || 'none';
      this.noise = Number.isNaN(options.noise * 1) ? 10 : options.noise * 1;
      this.disableInteraction = options.disableInteraction;
      this.mouseForce = options.mouseForce * 1 || 30;
      this.color = options.color;
      this.colorArr = options.colorArr || this.colorArr;
    }

    _initResponsive(options) {
      this.responsiveWidth = this.wrapperElement && options.responsiveWidth;
      if (this.responsiveWidth) {
        this.on('stopped', () => {
          this.width = this.wrapperElement.clientWidth;
          nextParticle.start();
        });
        this.wrapperElement.addEventListener('resize', () => this.stop());
        this.width = this.wrapperElement.clientWidth;
      }
    }

    _calculate() {
      this.vertices = [];
      renderCount = 0;
      for (index = 0; index < this.particles.length; index++) {
        origin = this.origins[index];
        particle = this.particles[index];
        dX = origin.x - particle.x + (Math.random() - 0.5) * this.noise;
        dY = origin.y - particle.y + (Math.random() - 0.5) * this.noise;
        dZ = origin.z - particle.z + (Math.random() - 0.5) * this.noise / 1000;
        distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
        force = distance * 0.01;
        particle.vx += force * (dX / distance) * this.speed;
        particle.vy += force * (dY / distance) * this.speed;
        particle.vz += force * (dZ / distance) * this.speed;
        for (touch of this.touches) {
          dX = particle.x - touch.x;
          dY = particle.y - touch.y;
          dZ = particle.z - touch.z;
          distance = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
          force = (this.mouseForce * touch.force) / distance;
          particle.vx += force * (dX / distance) * this.speed;
          particle.vy += force * (dY / distance) * this.speed;
          particle.vz += force * (dZ / distance) * this.speed;
        }
        particle.vx *= this.gravityFactor;
        particle.vy *= this.gravityFactor;
        particle.vz *= this.gravityFactor;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        if (0 > particle.x || particle.x >= this.width || 0 > particle.y || particle.y >= this.height) {
          particle.isHidden = true;
          if (this.state === 'stopping') {
            particle.isDead = true;
          }
        } else {
          if (this.state === 'stopping' && !particle.isDead) {
            renderCount++;
          }
          particle.isHidden = false;
        }
        this.vertices.push(particle.x, particle.y, particle.z)
      }
      if (this.state === 'stopping' && renderCount === 0) {
        this.state = 'stopped';
      }
    }

    _defaultRenderer() {
      this.depth = Math.max(this.layerDistance * this.layerCount / 2, this.mouseForce);
      this.minZ = -this.depth;
      this.maxZ = this.depth;
      imageData = this.context.createImageData(this.width, this.height);

      for (index = 0; index < this.origins.length; index++) {
        origin = this.origins[index];
        particle = this.particles[index];
        if (!particle.isDead && !particle.isHidden) {
          x = ~~particle.x;
          y = ~~particle.y;
          a = origin.color[3];
          if (this.alphaFade > 0 && this.layerCount > 1) {
            z = Math.max(Math.min(particle.z, this.maxZ), this.minZ) - this.minZ;
            a = a * (1 - this.alphaFade) + (a * this.alphaFade * (z / (this.maxZ - this.minZ)));
            a = Math.max(Math.min(~~a, 255), 0);
          }
          startIndex = (x + y * this.width) * 4;
          imageData.data[startIndex + 0] = origin.color[0];
          imageData.data[startIndex + 1] = origin.color[1];
          imageData.data[startIndex + 2] = origin.color[2];
          imageData.data[startIndex + 3] = a;
        }
      }
      this.context.putImageData(imageData, 0, 0);
    }

    _webglRenderer() {
      vertices = new Float32Array( this.vertices );
      this.context.lineWidth(2.6);
      this.context.bufferData(this.context.ARRAY_BUFFER, vertices, this.context.DYNAMIC_DRAW);
      this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
      this.context.drawArrays( this.context.POINTS, 0, this.particles.length );
      this.context.flush();
    }

    _initParticles() {
      this.particles = undefined;
      this.particles = [];
      for (origin of this.origins) {
        particle = {};
        this._initParticlePosition(origin, particle);
        this._initParticleDirection(particle);
        this.particles.push(particle);
      }
    }

    _initParticlePosition(origin, particle) {
      particle.z = 0;
      switch (this.initPosition) {
        case 'random': {
          particle.x = Math.random() * this.width;
          particle.y = Math.random() * this.height;
          break;
        }
        case 'top': {
          particle.x = Math.random() * this.width * 3 - this.width;
          particle.y = -Math.random() * this.height;
          break;
        }
        case 'left': {
          particle.x = -Math.random() * this.width;
          particle.y = Math.random() * this.height * 3 - this.height;
          break;
        }
        case 'bottom': {
          particle.x = Math.random() * this.width * 3 - this.width;
          particle.y = this.height + Math.random() * this.height;
          break;
        }
        case 'right': {
          particle.x = this.width + Math.random() * this.width;
          particle.y = Math.random() * this.height * 3 - this.height;
          break;
        }
        case 'misplaced': {
          particle.x = origin.x + Math.random() * this.width * 0.3 - this.width * 0.1;
          particle.y = origin.y + Math.random() * this.height * 0.3 - this.height * 0.1;
          break;
        }
        default: {
          particle.x = origin.x;
          particle.y = origin.y;
        }
      }
    }

    _fade() {
      if (
        this.fadePosition === 'explode' ||
        this.fadePosition === 'top' ||
        this.fadePosition === 'left' ||
        this.fadePosition === 'bottom' ||
        this.fadePosition === 'right'
      ) {
        this.state = 'stopping';
      } else {
        this.state = 'stopped';
      }
      for (index = 0; index < this.origins.length; index++) {
        this._fadeOriginPosition(this.origins[index]);
        this._fadeOriginDirection(this.particles[index]);
      }
    }

    _fadeOriginPosition(origin) {
      switch (this.fadePosition) {
        case 'random': {
          origin.x = Math.random() * this.width * 2 - this.width;
          origin.y = Math.random() * this.height * 2 - this.height;
          if (origin.x > 0) origin.x += this.width;
          if (origin.y > 0) origin.y += this.height;
          break;
        }
        case 'top': {
          origin.x = Math.random() * this.width * 3 - this.width;
          origin.y = -Math.random() * this.height;
          break;
        }
        case 'left': {
          origin.x = -Math.random() * this.width;
          origin.y = Math.random() * this.height * 3 - this.height;
          break;
        }
        case 'bottom': {
          origin.x = Math.random() * this.width * 3 - this.width;
          origin.y = this.height + Math.random() * this.height;
          break;
        }
        case 'right': {
          origin.x = this.width + Math.random() * this.width;
          origin.y = Math.random() * this.height * 3 - this.height;
          break;
        }
        default: {
          // Stay in place
        }
      }
    }

    _initParticleDirection(particle) {
      particle.vz = 0;
      switch (this.initDirection) {
        case 'random': {
          angle = Math.random() * Math.PI * 2;
          intensity = Math.random();
          particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'top': {
          angle = Math.random() * Math.PI - Math.PI / 2;
          intensity = Math.random();
          particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'left': {
          angle = Math.random() * Math.PI + Math.PI;
          intensity = Math.random();
          particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'bottom': {
          angle = Math.random() * Math.PI + Math.PI / 2;
          intensity = Math.random();
          particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'right': {
          angle = Math.random() * Math.PI;
          intensity = Math.random();
          particle.vx = this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy = this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        default: {
          particle.vx = 0;
          particle.vy = 0;
        }
      }
    }

    _fadeOriginDirection(particle) {
      switch (this.fadeDirection) {
        case 'random': {
          angle = Math.random() * Math.PI * 2;
          intensity = Math.random();
          particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'top': {
          angle = Math.random() * Math.PI - Math.PI / 2;
          intensity = Math.random();
          particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'left': {
          angle = Math.random() * Math.PI + Math.PI;
          intensity = Math.random();
          particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'bottom': {
          angle = Math.random() * Math.PI + Math.PI / 2;
          intensity = Math.random();
          particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        case 'right': {
          angle = Math.random() * Math.PI;
          intensity = Math.random();
          particle.vx += this.width * intensity * Math.sin(angle) * 0.1;
          particle.vy += this.height * intensity * Math.cos(angle) * 0.1;
          break;
        }
        default: {
          particle.vx = 0;
          particle.vy = 0;
        }
      }
    }

    _initOrigins() {
      canvas = document.createElement('canvas');
      if (this.responsiveWidth) {
        this.width = this.wrapperElement.clientWidth;
      }
      this.ratio =
        Math.min(this.width, this.maxWidth || Number.POSITIVE_INFINITY) /
        Math.min(this.height, this.maxHeight || Number.POSITIVE_INFINITY);
      if (this.ratio < this.imageRatio) {
        this.renderWidth = ~~Math.min(
          this.width,
          this.minWidth || this.imageWidth,
          this.maxWidth || Number.POSITIVE_INFINITY
        );
        this.renderHeight = ~~(this.renderWidth / this.imageRatio);
      } else {
        this.renderHeight = ~~Math.min(
          this.height,
          this.minHeight || this.imageHeight,
          this.maxHeight || Number.POSITIVE_INFINITY
        );
        this.renderWidth = ~~(this.renderHeight * this.imageRatio);
      }
      this.offsetX = ~~((this.width - this.renderWidth) / 2)
      this.offsetY = ~~((this.height - this.renderHeight) / 2)
      canvas.width = this.renderWidth;
      canvas.height = this.renderHeight;
      context = canvas.getContext('2d');
      context.drawImage(this.image, 0, 0, this.renderWidth, this.renderHeight);
      data = context.getImageData(0, 0, this.renderWidth, this.renderHeight).data;
      this.origins = undefined;
      this.origins = [];
      for (x = 0; x < this.renderWidth; x += this.particleGap) {
        for (y = 0; y < this.renderHeight; y += this.particleGap) {
          index = (x + y * this.renderWidth) * 4;
          a = data[index + 3];
          if (a > 0) {
            if (this.colorArr) {
              for (layerIndex = 0; layerIndex < this.layerCount; layerIndex++) {
                this.origins.push({
                  x: this.offsetX + x,
                  y: this.offsetY + y,
                  z: layerIndex * this.layerDistance - this.layerCount * this.layerDistance / 2,
                  color: this.colorArr,
                });
              }
            } else {
              r = data[index];
              g = data[index + 1];
              b = data[index + 2];
              for (layerIndex = 0; layerIndex < this.layerCount; layerIndex++) {
                this.origins.push({
                  x: this.offsetX + x,
                  y: this.offsetY + y,
                  z: layerIndex * this.layerDistance - this.layerCount * this.layerDistance / 2,
                  color: [r, g, b, a],
                });
              }
            }
          }
        }
      }
      this.speed = Math.log(this.origins.length) / 10;
      this.gravityFactor = 1 - this.gravity * this.speed;
    }

    _parseColor(strParam) {
    	let color;
      if (typeof(strParam) !== 'string') {
        return undefined;
      }
    	const str = strParam.replace(' ', '');

    	if (color = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(str)) {
    		color = [parseInt(color[1], 16), parseInt(color[2], 16), parseInt(color[3], 16)];
    	} else if (color = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(str)) {
    		color = [parseInt(color[1], 16) * 17, parseInt(color[2], 16) * 17, parseInt(color[3], 16) * 17];
    	} else if (color = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(str)) {
    		color = [+color[1], +color[2], +color[3], +color[4]];
    	} else if (color = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str)) {
    		color = [+color[1], +color[2], +color[3]];
    	} else return undefined;

    	return color;
    }
  }

  exports.NextParticle = NextParticle;
  const nextParticles = document.getElementsByClassName('next-particle');
  for (let nextParticleIndex = 0; nextParticleIndex < nextParticles.length; nextParticleIndex++) {
    const elem = nextParticles[nextParticleIndex];
    elem.nextParticle = new NextParticle(elem);
  }
}(window));
