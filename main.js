(function(){	

	function init(){
		$('#add').click(makeFormVisible);
		$('.clo').click(closeForm);
		$('.form').submit(saveContact);

	}
	//to change the visiblity of the form
	function makeFormVisible(){
		$('.formcontainer').css('display', 'block');
	}
	//closes the input form
	function closeForm(){
		$('.formcontainer').css('display', 'none');
	}
	//creates the table row and cols
	//adds the data from the form to the table rows
	function saveContact(e){
		var conName, conEmail, conAddress, conImage, conTel;
		conName = $('#name').val();
		conEmail = $('#email').val();
		conAddress = $('#address').val();
		conImage = $('#image').val();
		conTel = $('#tel').val();
		var contain =[conImage, conName, conEmail, conTel, conAddress ];
		var row = $('<tr>');
		for(var i = 0; i< 5; i++){
			if(i ===0){
				var cols = $('<img>').attr({'src': contain[i],
										'width':'150px'});
			}
			else
				var cols = $('<td>').text(contain[i]);
				row.append(cols);
		}
		$('#tblBody').append(row);
	 	$('input').val('');
		e.preventDefault();
	}
	init();
})();