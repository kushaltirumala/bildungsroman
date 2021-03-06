
$(function(){
var state = 1;
var cards=[];
var index = 0;
$('#myButton').click(function() {
      getCards($('#uniqueID').val())
 });

function cssTransform (name, degree) {
	var style = {
		"transform": "rotateY("+degree+"deg)"
	}
	$(name).css(style);

	return style;
}

function getCards(link) {
	link = link.substring(8,link.length-1);
	var temp = link.split("/");
	var url = "https://api.quizlet.com/2.0/sets/" + temp[1] + "?client_id=4msU8P4c2B&whitespace=1";
	$.ajax({
		url:url,
		data: {
      		format: 'json'
   		},
   		dataType:'jsonp',
   		success:function(data) {
   			var count = data.term_count;
   			for(var i = 0;i  < count; i++){
   				cards.push(data.terms[i]);
   			}
   			if($("#card").length!=0){
   				$("#card").remove();
   			}
   			$(document.body).append('<div class="hover panel" id="card"><div class="front part">' + 
   				cards[0].term + '</div><div class="back part">' + cards[0].definition + '</div></div>');
   				index++;
   		}, 
   		error:function(){
   			alert('error');
   		}
	})
}

function loadNextTerm() {
	$("#card").animate({left:"0px"},800,function(){
              	$("#card").css({"left":"1500px"});
              	$("#card").remove();
              });
	index++;
	if(index >= cards.length) {
		while($('#card').length > 0 ) {
			$("#card").remove();
		}
		console.log("OVER CARD LIMIT");
		if($("#redo").length == 0)
			$(document.body).append('<h1 id="redo" style="text-align:center; color:white;">Load another set, this one is finished</h1>');
	} else {
	var front = cards[index].term;
	var back = cards[index].definition;
	console.log(front + " " + back + " " + index);
	$(document.body).append('<div class="panel" id="card"><div class="front part">' + 
		front + '</div><div class="back part">' + back + '</div></div>');
}
}
//crds to https://github.com/supernancychen/hand-card-flip for this
function cardFlip(hasHand, handType, rollRadian) {
	var degree = rollRadian * (180 / Math.PI);

	if(hasHand) {
	    cssTransform(".front", 0-degree);			
		if(cssTransform === "left")						
			cssTransform(".back", -degree-180);		
		else 										
			cssTransform(".back", -180-degree);		
	} else {
		cssTransform(".front", 0);
		cssTransform(".back", -180);
	}
}

Leap.loop(function (frame) {

	if(frame.valid) {
	if(frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "keyTap":

			loadNextTerm();              
              break;
        }
    });
  } else {
  			if(frame.hands.length > 0) {
				cardFlip(true, frame.hands[0].type, frame.hands[0].roll());
			}
			else {
				cardFlip(false, "", 0);				
			}
  }
}

});

});