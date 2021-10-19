$(document).on("submit",".callback_form",function () {
   var data = {};
   data['name'] = $("input[name='name']").val();
   data['email'] = $("input[name='email']").val();
   data['tel'] = $("input[name='tel']").val();
   $.post("/build/sendmail.php",data,function(){
       $(".modal-container").show();
       $(".contacts").addClass("blur");
   });
   return false;
});

$(document).on("click",".close-modal",function(){
    $(".contacts").removeClass("blur");
    $(".modal-container").hide();
});