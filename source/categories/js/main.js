jQuery(function(){
  var rgb=['#aaa','#bbb','#ccc','#ddd','#eee']
  jQuery(".category").each(function(i){
    var color = rgb[i%4];
    $(this).css("background-color", color);
  });
})
