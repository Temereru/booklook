var Validation = function () {
   var enteredVal = function () {
      $('.form-group').children().each(function(idx, val) {
         if($(this).val() === '') {
            $('.errors ul').append('<li class="well">You must enter the ' + $(this).attr('placeholder').toLowerCase() + '</li>')
         } else if (($(this).attr('id') === 'number-of-pages' || $(this).attr('id') === 'minutes-per-day') && !($.isNumeric($(this).val()))) {
            $('.errors ul').append('<li class="well"> ' + $(this).attr('placeholder').toLowerCase() + ' must be a number</li>')
               console.log(true);
         }
      });

   }

   return {
      enteredVal: enteredVal
   }
};

var app = Validation();

$('button[type="search"]').on('click', function (e) {
   e.preventDefault();
   $('.errors ul').empty();
   app.enteredVal();
});
