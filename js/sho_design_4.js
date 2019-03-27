var elem = $('col-sm-10');

window.onload = function() {
  $('.workss').addClass("before");
}

$(function() {
  $('.aw').click(function() {
    $('img.css3-C').toggleClass("after");
  });
  $('#works').click(function() {
    $('.workss').addClass("after");
    $('.workss').removeClass("before");
    $('.aboutMe').removeClass("after");
  });
  $('#aboutMe').click(function() {
    $('.aboutMe').addClass("after");
    $('.workss').removeClass("after");
    $('.workss').removeClass("before");
  });
});

if ($('.col-sm-2').css('display') == 'none') {
  elem.className = 'col-sm-1';
} else {
  elem.className = 'col-sm-10';
}


$(function() {
  $('.aboutMe').click(function() {
    setTimeout(function() {
      // $('#line').lazylinepainter({"svgData": pathObj, "strokeWidth": 1, "strokeColor": "#0F0F0E", "ease": "easeInOutQuad", "drawSequential": false}).lazylinepainter('paint');

      setTimeout(function() {
        $('#profile').fadeTo(2000, 1);
        $('#line').fadeOut(1600);
      }, 800);
    }, 200);
  });
})

//ダイレクトリンク
$(function() {

  var hash = location.hash;
  hash = (hash.match(/^#tab\d+$/) || [])[0];

  if ($(hash).length) {
    var tabname = hash.slice(1);
  } else {
    var tabname = "tab1";
  }
  $('.tab-content').css('display', 'none');

  $('.tab-content').removeClass('active');

  var tabno = $('menu_awi#' + tabname).index();

  $('.tab-content').eq(tabno).fadeIn();

  $('menu_aw').eq(tabno).addClass('active')
});

/* -------------------graphics----------------------- */

$(function() {
  $('#closemaster').click(function() {
    $('div[id^="g_pop"]').css("display", "none");
    $('div[id^="r_pop"]').css("display", "none");
    $('.g_d').css("display", "block");
    $('.Gifs').css("display", "block");
    $('#batu').css("display", "none");
  });
});
$(function() {
  $('#batu').click(function() {
    $('div[id^="g_pop"]').css("display", "none");
    $('div[id^="r_pop"]').css("display", "none");
    $('.g_d').css("display", "block");
    $('.Gifs').css("display", "block");
    $('#batu').css("display", "none");
  });
});

/* --connection--- */
$(function() {
  $('#g').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop').css("display", "block");
    $('#r_pop').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

$(function() {
  $('#close1_1').click(function() {
    $('#batu').css("display", "none");
    $('#g_pop').css("display", "none");
    $('.g_d').css("display", "block");
  });
});
// $(function(){
//     $('#g_0').click(function(){
//         $('#g_pop').css("display", "block");
//         $('.g_d').css("display", "none");
//         $('div[id^="g_pop"]:not("#g_pop")').css("display", "none");
//     });
// });
/* ------------- */
/* -----patching------ */

$(function() {
  $('#g2').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop2').css("display", "block");
    $('#r_pop2').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

$(function() {
  $('#close1_2').click(function() {
    $('#batu').css("display", "none");
    $('#g_pop2').css("display", "none");
    $('.g_d').css("display", "block");
    $('.Gifs').css("display", "block");
    $('#r_pop2').css("display", "none");
  });
});
/* ----------------- */

$(function() {
  $('#works').click(function() {
    $('.works').css("display", "block");
    $('.about').css("display", "none");
  });
});
$(function() {
  $('#aboutMe').click(function() {
    $('.about').css("display", "block");
    $('.works').css("display", "none");
  });
});

/* ------illust----------- */
$(function() {
  $('#g3').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop3').css("display", "block");
    $('#r_pop3').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ------typo----------- */
$(function() {
  $('#g4').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop4').css("display", "block");
    $('#r_pop4').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ------SS----------- */
$(function() {
  $('#g5').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop5').css("display", "block");
    $('#r_pop5').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ----------------- */

/* ------kiki----------- */
$(function() {
  $('#g6').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop6').css("display", "block");
    $('#r_pop6').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ----------------- */

/* ------hp----------- */
$(function() {
  $('#g7').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop7').css("display", "block");
    $('#r_pop7').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ----------------- */

/* ------//----------- */
$(function() {
  $('#g8').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop8').css("display", "block");
    $('#r_pop8').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ----------------- */

/* ------//----------- */
$(function() {
  $('#g9').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop9').css("display", "block");
    $('#r_pop9').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ----------------- */

/* ------//----------- */
$(function() {
  $('#g10').click(function() {
    $('#batu').css("display", "block");
    $('#g_pop10').css("display", "block");
    $('#r_pop10').css("display", "block");
    $('.g_d').css("display", "none");
    $('.Gifs').css("display", "none");
  });
});

/* ----------------- */


$(function() {
  $('.absolute').click(function() {
    $('div[id^="g_pop"]').css("display", "none");
    $('.g_d').css("display", "block");
  });
});

/* ----------------- */

$(function() {

  var top = $('.backtotop');

  var topBtn = $('#batu');
  var topBtn2 = $('#closemaster');
  var topBtn3 = $('#close3');
  var topBtn1_2 = $('#close1_2');
  var topBtn1_1 = $('#close1_1');
  var topBtn1_3 = $('#close1_3');
  var topBtn1_4 = $('#close1_4');
  var topBtn2_1 = $('#close2_1');

  top.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  topBtn1_2.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn1_1.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn1_3.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn1_4.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn2.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn3.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  topBtn2_1.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

});

$(function() {
  $('#cf').click(function() {
    $('.lm_dis').css("display", "block");
    $('.stage').css("display", "none");
  });
});

$(function() {
  $('#close').click(function() {
    $('.lm_dis').css("display", "none");
    $('.stage').css("display", "block");
    document.getElementById('playing').pause();
  });
});

$(function() {
  $('#cf2').click(function() {
    $('.lm_dis2').css("display", "block");
    $('.stage').css("display", "none");
  });
});

$(function() {
  $('#close2').click(function() {
    $('.lm_dis2').css("display", "none");
    $('.stage').css("display", "block");
    document.getElementById('playing2').pause();
  });
});

$(function() {
  $('#cf3').click(function() {
    $('.lm_dis3').css("display", "block");
    $('.stage').css("display", "none");
  });
});

$(function() {
  $('#close3').click(function() {
    $('.lm_dis3').css("display", "none");
    $('.stage').css("display", "block");
    document.getElementById('playing3').pause();
  });
});

$(function() {
  $('#pb').click(function() {
    $('.pb').toggleClass("after");
    if ($('.pb_hidden').css('display') == 'none') {
      $('.pb_hidden').css("display", "block");
    } else {
      $('.pb_hidden').css("display", "none");
      document.getElementById('playing01').pause();
    }
  });
});

$(function() {
  $('#pb2').click(function() {
    $('.pb').toggleClass("after");
    if ($('.pb_hidden').css('display') == 'none') {
      $('.pb_hidden').css("display", "block");
    } else {
      $('.pb_hidden').css("display", "none");
      document.getElementById('playing02').pause();
    }
  });
});

$(function() {
  $('#pb3').click(function() {
    $('.pb').toggleClass("after");
    if ($('.pb_hidden').css('display') == 'none') {
      $('.pb_hidden').css("display", "block");
    } else {
      $('.pb_hidden').css("display", "none");
      document.getElementById('playing03').pause();
    }
  });
});

$(function() {
  $('#pb4').click(function() {
    $('.pb').toggleClass("after");
    if ($('.pb_hidden').css('display') == 'none') {
      $('.pb_hidden').css("display", "block");
    } else {
      $('.pb_hidden').css("display", "none");
      document.getElementById('playing04').pause();
    }
  });
});
