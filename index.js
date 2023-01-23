$(function() {
 
   var player1=$("#player_1").val();
    var player2=$("#player_2").val();
  
  var player = $("#player_1").val();
  var table = $('table');
  var messages = $('.messages');
  var turn = $('.turn');
 
 
 displayNextPlayer(turn, player);
  
  $('td').click(function() {
    td = $(this);
    var state = getState(td);
    if(!state) {
      var pattern = definePatternForCurrentPlayer(player);
      changeState(td, pattern);
      if(checkIfPlayerWon(table, pattern)) {
        messages.html('<span class="note note-success">Player '+player+' has won.</span>');
        turn.html('');
		$('table td').off('click');
      } else {
        player = setNextPlayer(player);
        displayNextPlayer(turn, player);
      }
    } else {
      messages.html('<span class="note note-danger">This box is already checked.</span>');
    }
  });
  
  $('.reset').click(function() {
    player = $("#player_1").val();
    messages.html('');
    reset(table);
    displayNextPlayer(turn, player);
  });
  
  $('.start').click(function() {
   var validator =$('.needs-validation').validate({
				  errorClass: "invalid",
				  validClass: "success",
				rules: {
				
				player_1: {
				  required: true,     
				},
				player_2: {
				  required: true,     
				}
				},
				messages: {
				 player_1: "Please complete name",
                 player_2: "Please complete name",
			   
			  }
		});
   
   if(validator.valid()){
				  
      var player1=$("#player_1").val();
	  var player2=$("#player_2").val();
	  
	  if(player1==""){
		  $("#player_1").addClass('invalid');
		  return false;
	  }
	  
	   if(player2==""){
		  $("#player_2").addClass('invalid');
		  return false;
	  }

    var url="http://localhost:8888/api/player/add";
    var data={'name':player2};

    var id1=sendRequest({'name':player1},'POST',url);
    var id2=sendRequest({'name':player2},'POST',url);
    
    
    if(id1>0 && id2>0){
      var game={'player1':id1,'player2':id2};
      sendRequest(game,'POST','http://localhost:8888/api/game/add');
    }
  
   
	 player = $("#player_1").val();

     messages.html('');
     $('.needs-validation').addClass('hide');
     reset(table);
	$("#game-holder").removeClass("hide");
	$("#game-btns").removeClass("hide");
    displayNextPlayer(turn, player);
	}
  });
  
   $('.pause').click(function() {
    player = 1;
    messages.html('');
    pause(table);//@todo
    displayNextPlayer(turn, player);
  });
  
});

function getState(td) {
  if(td.hasClass('cross') || td.hasClass('circle')) {
    return 1;
  } else {
    return 0;
  }
}

function changeState(td, pattern) {
  return td.addClass(pattern);
}

function definePatternForCurrentPlayer(player) {
	var player1=$("#player_1").val();
  
  if(player ==player1) {
    return 'cross';
  } else {
    return 'circle';
  }
}

function setNextPlayer(player) {
	var player1=$("#player_1").val();
    var player2=$("#player_2").val();
  if(player == player1) {
    return player = player2;
  } else {
    return player = player1;
  }
}

function displayNextPlayer(turn, player) {
  turn.html('<span class="note note-info">Player turn : '+player +'</span>');
}

function checkIfPlayerWon(table, pattern) {
	var player1=$("#player_1").val();
    var player2=$("#player_2").val();
  var won = 0;
  if(table.find('.item1').hasClass(pattern) && table.find('.item2').hasClass(pattern) && table.find('.item3').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item1').hasClass(pattern) && table.find('.item4').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
    won = 1; 
  } else if (table.find('.item1').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item4').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item6').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item7').hasClass(pattern) && table.find('.item8').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item2').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item8').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item3').hasClass(pattern) && table.find('.item6').hasClass(pattern) && table.find('.item9').hasClass(pattern)) {
    won = 1;
  } else if (table.find('.item3').hasClass(pattern) && table.find('.item5').hasClass(pattern) && table.find('.item7').hasClass(pattern)) {
    won = 1;
  }
  if(won==1)
	  return player1;
  else if(won==2)
	  return player2;
  else return "";
  
 
}

function reset(table) {
	table.on('click', 'td', function() {
      console.log("activate");
});
  table.find('td').each(function() {
	//  $(this).on('click');
    $(this).removeClass('circle').removeClass('cross');
  });
}

function sendRequest(data,method,url){
    //console.log(data);return false;
    var response='';

    $.ajax({
        type: method,//"POST",
        url: url,//",
        data: data,
        async:false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        statusCode: {
            200: function(resp) {
                console.log(resp);
                response=resp.id;
            },
            201: function(resp) {
                console.log(resp);
                response=resp.id;
            },
            400: function(resp) {
                console.log(resp);
              response="fail";
            }
        }
    });
    return response;
}