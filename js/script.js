
// HTMLの要素が全て準備できれば処理を行う
var setImgId = '#float-img';      // スクロールさせる要素
var initOffsetTop = null;   // 要素の初期位置
var takanori = '#takanori';
var doken = '#doken';
var sound = '#sound';
var takanori_balloon = '#takanori_balloon';
var doken_balloon = '#doken_balloon';
var sound_balloon = '#sound_balloon';
var audio = new Audio('../asset/rika-11-checkitout.wav');


$(document).ready(function() {

    //フロートイメージ表示
    $(setImgId).fadeIn(1500);
    $(setImgId).css('display', 'block');

    // 初期位置取得
    initOffsetTop = $(setImgId).offset().top;
});

//スクロールしたらこの処理が走る
$(window).scroll(function() {

    // 現在のスクロール位置を取得
    var scrollTop = $(document).scrollTop();
    console.log('scrollTop' + scrollTop);

    // 初期位置が取れていなければ処理を抜ける
    if(initOffsetTop == null) return;

    // タブレット以上のサイズだったらスクロールを実施
    if (window.matchMedia( '(min-width: 484px)' ).matches) {
        scrollImg(scrollTop);
    }
    displayGallery(scrollTop);
});

// フロートイメージスクロール処理
function scrollImg(scrollTop){

    // スクロールさせる要素の初期位置と現在のスクロールの位置を比較
    //初期位置より下にスクロールした時
    if (initOffsetTop - 100 < scrollTop && scrollTop < 2500) {
        // positionを設定
        $(setImgId).css('position', 'fixed');
        // topの位置を設定
        var _height = $(window).height() * 0.2;
	    $(setImgId).animate({top: _height},
            {duration: 0});

    } else if (scrollTop > 2500){
        $(setImgId).css('position', 'absolute');
        $(setImgId).animate(
            {top: 2700},
            {duration: 0});

    } else {
        // 設定したスタイルを持とに戻す
        $(setImgId).css('position', 'absolute');
        $(setImgId).animate(
            {top: initOffsetTop},
            {duration: 0});
        $(setImgId).attr("src", "img/01.png");
    }
}

//画像、吹き出しアニメーション用関数
function slideImg(scrollTop, from, to, slideImg, slideBalloon, floatSrcFile) {
    if (from < scrollTop && scrollTop < to) {
        $(slideImg).fadeIn();
        $(slideBalloon).fadeIn(1500);
        $(setImgId).attr("src", floatSrcFile);
        //audio.play();
    } else {
        $(slideBalloon).slideUp();
    }
}

function displayGallery(scrollTop) {
    //画像アニメーション
    slideImg(scrollTop, 800, 1200, takanori, takanori_balloon, "img/15.png");
    slideImg(scrollTop, 1400, 2000, doken, doken_balloon, "img/18.png");
	    
    if (2200 < scrollTop ) {
         $(sound).slideDown();
         $(sound_balloon).slideDown();
         $(setImgId).attr("src", "img/08.png");
     } else {
         $(sound_balloon).slideUp();
     } 
}

function goodSound() {
    document.getElementById("sound-file").play();
}
