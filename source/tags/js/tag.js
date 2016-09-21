jQuery(function(){
  $(".tags").each(function(){
      var x = 9;
      var y = 0;
      var rand = parseInt(Math.random() * (x - y + 1) + y);
      $(this).addClass("tag"+rand);
  });
})
