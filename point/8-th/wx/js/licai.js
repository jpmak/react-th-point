$(function() {



    //弹出分类选择
    $('.cover-body').height($('.product-cover').height() - $('.cover-head').height());

    $('#btnWrap').on('click', function() {
        $('.product-cover').addClass('cover-toggle').show();
        $('.cover-mask').addClass('cover-mask-toggle').show();
        $('html').addClass('hidescroll');

    });

    $('.close,.cover-mask').on('click', function() {
        $('.product-cover').removeClass('cover-toggle').hide();
        $('.cover-mask').removeClass('cover-mask-toggle').hide();
        $('html').removeClass('hidescroll');
    });



    $('#mon_num').on('click', function() {
        $('.mon_tip .title').hide();
        $('#mon_num').css('opacity', '1');

    });



})