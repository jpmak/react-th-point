   $(function() {
       $('a.search-btn').on('click', function() {
           var sVal = $("#searchInput").val();
           if (sVal !== '') {
               skey = sVal;
               search_cache();
           }
       });

       $('.search-keywords-list li a').on('click', function() {
           var hVal = $(this).html();
           skey = hVal;
           search_cache();
       });


       // js-search
       $('.on-blur .search-bar').on('click', function() {
           $('#headnav').addClass('js-header');
           $('#scroll-wrapper').hide();
           $('.on-blur').removeClass('on-blur').addClass('on-focus');
           $('.search-wrap').show();
           $('.th-search-box a.class').hide();
           $('.th-search-box a.backbtn').show();
       });

       $('#searchInput').on('keyup', function(e) {
           $('.search-bar input').css('width', '80%');
           var uVal = $("#searchInput").val();
           if (uVal !== "") {
               if (e.keyCode == 13) {
                   skey = uVal;
                   search_cache();
               }
               $('#del').show();
           } else {
               $('#del').hide();
           }
       });
       $('.th-search-box a.backbtn').on('click', function() {
           del();
           $('#searchInput').blur();
           $('header').removeClass('js-header');
           $('.on-focus').removeClass('on-focus').addClass('on-blur');
           // $('.search-bar input').val('');
           $('#scroll-wrapper').show();
           $('.search-wrap').hide();
           $('.th-search-box a.class').show();
           $('.th-search-box a.backbtn').hide();
       });

       function del() {
           $('#searchInput').val("").focus();
           $('#del').hide();
           $('.search-bar input').css('width', '100%');
       }

   })