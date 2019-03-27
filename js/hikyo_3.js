



$(function() {
  $('#works').click(function() {
    $('.workss').addClass("after");
    $('.workss').removeClass("before");
    $('.bioo').removeClass("after");
    $('.contactt').removeClass("after");
    $('.contactt').removeClass("before");

    $('.works').css("display", "block");
    $('.bio').css("display", "none");
    $('.contact').css("display", "none");

    $('.status_works').css("display", "block");
    $('.status_bio').css("display", "none");
    $('.status_contact').css("display", "none");
  });
  $('#bio').click(function() {
    $('.bioo').addClass("after");
    $('.workss').removeClass("after");
    $('.workss').removeClass("before");
    $('.contactt').removeClass("after");
    $('.contactt').removeClass("before");

    $('.bio').css("display", "block");
    $('.works').css("display", "none");
    $('.contact').css("display", "none");

    $('.status_works').css("display", "none");
    $('.status_bio').css("display", "block");
    $('.status_contact').css("display", "none");
  });
  $('#contact').click(function() {
    $('.contactt').addClass("after");
    $('.workss').removeClass("after");
    $('.workss').removeClass("before");
    $('.bioo').removeClass("after");

    $('.contact').css("display", "block");
    $('.works').css("display", "none");
    $('.bio').css("display", "none");

    $('.status_works').css("display", "none");
    $('.status_bio').css("display", "none");
    $('.status_contact').css("display", "block");
  });


});


$(function() {
    $('#play').click(function() {
    $('.scroll_lst').css("display", "none");
    $('.scroll_item_hidden').css("display", "block");
    $('.scroll_item_hidden1').css("display", "block");
    $('#backin').css("display", "block");
  });

    $('#backin').click(function() {
    $('.scroll_lst').css("display", "block");
    $('.scroll_item_hidden').css("display", "none");
    $('.scroll_item_hidden1').css("display", "none");
    $('#backin').css("display", "none");
  });
});


$(function() {

  $('.scroll_item').hover(function() {

    $('.scroll_item_container').css('display', 'none');
    $('.scroll_item_container_hidden').css('display', 'block');

  }, function() {

    $('.scroll_item_container').css('display', 'block');
    $('.scroll_item_container_hidden').css('display', 'none');

  });

  $('.scroll_item1').hover(function() {

    $('.scroll_item_container1').css('display', 'none');
    $('.scroll_item_container_hidden1').css('display', 'block');

  }, function() {

    $('.scroll_item_container1').css('display', 'block');
    $('.scroll_item_container_hidden1').css('display', 'none');

  });
});




(function(){
  var CloseTrigger = function(el){
      var $video = $('.video-stream');
      $(el).on('click', function() {
        console.log('success')
          videoControl("stopVideo");
      });
      function videoControl(action){
          var $playerWindow = $('#popup-YouTube-player')[0].contentWindow;
          $playerWindow.postMessage('{"event":"command","func":"'+action+'","args":""}', '*');
      }
  };
  var closeBtnClick = new CloseTrigger('#backin');

})();



(function() {

  'use strict';



  var c = document.getElementById('c');
  var ctx = c.getContext('2d');
  var w = c.width = window.innerWidth;
  var h = c.height = window.innerHeight;
  var cx = w;
  var cy = h / 2;
  var P = function(x, y, r, aa) {
    this.ar = aa;
    this.x = x;
    this.y = y;
    this.r = r;
    this.or = r;
    this.a1 = 0;
    this.a2 = 0;
    this.va2 = 0;
    this.vas2 = Math.random();
    this.flag = false;
    this.d = 0;
    this.dir = [1, -1];
    this.ea = Math.random() * 0.1;
    this.dr = this.dir[Math.floor(Math.random() * this.dir.length)];
  };
  P.prototype = {
    constructor: P,
    update: function() {

      this.ar += 0.1;
      this.r = this.or + Math.cos(this.ar) * this.or;

      this.d = Math.abs(this.a2 - this.a1);
      this.va2 += this.vas2 * this.dr;

      if(this.a2 < 360 && this.dr == 1)
        this.a2 += this.va2;
      if(this.a2 > -360 && this.dr == -1)
        this.a2 += this.va2;

      if(this.d > 200) {
        this.flag = true;
      }

      if(this.flag) {
        this.a1 += (this.a2 - this.a1) * this.ea;
      }

    },
    render: function(ctx) {

      if(this.a2 > 360 && this.d < 5 && this.dr === 1) {
        this.va2 = 0;
        this.a2 = 0;
        this.flag = false;
        this.a1 = 0;
        return;
      }

      if(this.a2 < -360 && this.d < 5 && this.dr === -1) {
        this.va2 = 0;
        this.a2 = 0;
        this.flag = false;
        this.a1 = 0;
        return;
      }

      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.r,
        this.a1 * Math.PI / 180,
        this.a2 * Math.PI / 180,
        (this.dr === 1) ? false : true
      );
      ctx.stroke();
    }
  };

  var ps = [];
  var ctr = 20;
  var p;
  var ww = 1500;
  var hh = 400;
  var slw = ww / (ctr - 1);
  var slh = hh / (ctr - 1)
  var ii = 0;

  for(var i = 0; i < ctr; i++) {
    for(var j = 0; j < ctr; j++) {

      ii += 20;
      var aa = ii * Math.PI / 180;

      p = new P(
        slw * i,
        slh * j,
        Math.abs(Math.cos(aa) * 20),
        aa
      );
      ps.push(p);
    }
  }

  ctx.strokeStyle = 'white';

  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(cx - ww, cy - hh/2);

    for(var i = 0; i < ctr * ctr; i++) {
      p = ps[i];
      p.update();
      p.render(ctx);
    }

    ctx.restore();
  });

})();



var fc = document.querySelector('#fc');
var fctx = fc.getContext('2d');
var w = 50;
var h = 50;
var cols = 50;
var rows = 50;
var scale = 0.03;
var size = 1;
var TWO_PI = Math.PI * 2;
var simplex = new SimplexNoise();
var t = 0;
var frameCount = 0;
var frameTotal = 256;

fc.width = w;
fc.height = h;

function loop() {
  t = frameCount / frameTotal;

  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var x2 = x * size;
      var y2 = y * size;
      var lightness = (simplex.noise4D(x * scale, y * scale, 0.2 * Math.cos(TWO_PI * t), 0.2 * Math.sin(TWO_PI * t)) + 1) / 2;
      var hue = (simplex.noise4D(x * scale + 1000, y * scale + 1000, 0.2 * Math.cos(TWO_PI * t), 0.2 * Math.sin(TWO_PI * t)) + 1) / 2;
      fctx.fillStyle = 'hsla(' + (360 - hue * 120) + ', 100%, ' + (100 - lightness * 100) + '%, 1)';
      fctx.fillRect(x2, y2, size, size);
    }
  }

  if (frameCount < frameTotal) {
    frameCount++;
  } else {
    frameCount = 0;
  }

  requestAnimationFrame(loop);
}

loop();
