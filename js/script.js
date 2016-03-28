$('#loading-image').hide();
(function($) {
   'use strict';
   var source   = $("#entry-template").html();
   var template = Handlebars.compile(source);

   var renderHtml = function (books) {
      var newHtml = template(books);
      console.log(books);
      console.log(newHtml);
      $('.books').append(newHtml);
   };

   var getData = function (data) {
      // console.log(data);
      var books = [];
      $(data.items).each(function (id, value){
         var book = {
            title: '',
            description: '',
            authors: [],
            url: '',
            pageCount: ''
         };
         $(value.volumeInfo).each(function (idx, val) {
            book.title = val.title;
            book.description = val.description;
            $(val.authors).each(function (i, v) {
               book.authors.push(v);
            });
            book.url = val.imageLinks.thumbnail;
            book.pageCount = val.pageCount;
         });
         books.push(book);
      });
      
      // console.log(books);
      return books;
   };

   // var fetch = function (isbn) {
   //    $.ajax({
   //       method: "GET",
   //       url: 'https://www.googleapis.com/books/v1/volumes?q='+isbn,
   //       dataType: "json",
   //       success: function(data) {
   //          var book = getData(data);
   //          renderHtml(book);
   //          // console.log(book);
   //          // console.log(data);
   //       },
   //       error: function(jqXHR, textStatus, errorThrown) {
   //          console.log(textStatus);
   //       }
   //    });
   // }
      var fetch = function (name) {
      $.ajax({
         method: "GET",
         url: 'https://www.googleapis.com/books/v1/volumes?q='+name+'&maxResults=10',
         dataType: "json",
         success: function(data) {
            var books = getData(data);
            renderHtml({books:books});
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
      var valTitle = $('#name').val();
      valTitle = valTitle.replace(' ','+');
      $('.books').empty();
      fetch(valTitle);
      $('#name').val('').focus();
   });
}(jQuery));

$(document).ajaxStart( function(){
   console.log('started');
    $('#loading-image').show();
});
$(document).ajaxStop( function(){
    $('#loading-image').hide();
});
