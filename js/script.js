(function($) {
   'use strict';
   var source   = $("#entry-template").html();
   var template = Handlebars.compile(source);

   var renderHtml = function (book) {
      var newHtml = template(book);
      $('.books').append(newHtml);
   };

   var getData = function (data) {
      var book = {
         title: '',
         description: '',
         authors: [],
         url: '',
         pageCount: ''
      };
      $(data.items[0].volumeInfo).each(function (idx, val) {
         book.title = val.title;
         book.description = val.description;
         $(val.authors).each(function (i, v) {
            book.authors.push(v);
         });
         book.url = val.imageLinks.thumbnail;
         book.pageCount = val.pageCount;
      });
      console.log(book);
      return book;
   };

   var fetch = function (isbn) {
      $.ajax({
         method: "GET",
         url: 'https://www.googleapis.com/books/v1/volumes?q='+isbn,
         dataType: "json",
         success: function(data) {
            var book = getData(data);
            renderHtml(book);
            // console.log(book);
            // console.log(data);
         },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
         }
      });
   }

   $('button[type="search"]').on('click', function (e) {
      e.preventDefault();
      var valIsbn = $('#isbn').val();
      $('.books').empty();
      fetch(valIsbn);
      $('#isbn').val('').focus();
   });
}(jQuery));
