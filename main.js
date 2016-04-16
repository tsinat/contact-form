(function(){	

	function init(){
		displayList();
		$('.form').submit(saveContact);
		$('#tblBody').on("click", ".delete" , removeRow);
		$('#tblBody').on("click", ".edit" , editRow);
		$('.form2').submit(saveEdits);
	}
	//creates the table row and cols
	//adds the data from the form to the table rows
	function saveContact(e){
			e.preventDefault();
			var conName, conEmail, conAddress, conImage, conTel;
			conName = $('#name').val();
			conEmail = $('#email').val();
			conAddress = $('#address').val();
			conImage = $('#image').val();
			conTel = $('#tel').val();
			var newContact = {
				name: conName,
				email: conEmail,
				address: conAddress,
				image: conImage,
				tel: conTel
			}
			var contactList = myStorage.get();
			contactList.push(newContact);
			myStorage.set(contactList);
			$('input').val('');
			displayList();
  }
  //removes the parent row of the clicked btn
  function removeRow(e){
  	var temp =$(this).closest('tr').index();
  	var getContactList = myStorage.get();
  	console.log(getContactList.splice(temp,1));
  	myStorage.set(getContactList);
  	displayList();
  	//console.log(getContactList);
  }
  var temp;
  //Editing contact row
  function editRow(e){
  	temp =$(this).closest('tr').index();
  	console.log(temp);
  	var contactList = myStorage.get();
  	var currRow = contactList[temp];
  	$('#name2').val(currRow.name);
  	$('#email2').val(currRow.email);
  	$('#address2').val(currRow.address);
  	$('#tel2').val(currRow.tel);
  	$('#image2').val(currRow.image);
  	//console.log(currRow);
  	//
  }
  function saveEdits(e){
  	console.log(temp);
  	e.preventDefault();
  	var editName = $('#name2').val();
  	var editEmail = $('#email2').val();
  	var editAddress = $('#address2').val();
  	var editTel = $('#tel2').val();
  	var editImage = $('#image2').val();
  	var newContact = {
				name: editName,
				email: editEmail,
				address: editAddress,
				image: editImage,
				tel: editTel
			}
			// console.log(newContact);
		var contactList = myStorage.get();
		contactList[temp] = newContact;
		myStorage.set(contactList);
		displayList();
  }
  //generates the list of all contacts from the storage
		function displayList(){
			var contactList = myStorage.get();
			var holder =[];
			for(var i = 0; i < contactList.length; i++){
				var contact = contactList[i];
				var row = $('<tr>');
				var tdImage = $('<img>').attr({'src': contact.image, 'width':'150px','height':'150px', 'border-radius': '50px'});
				var tdName = $('<td>').text(contact.name);
				var tdEmail = $('<td>').text(contact.email);
				var tdTel = $('<td>').text(contact.tel);
				var tdAddress = $('<td>').text(contact.address);
				var btnEdit = $('<btn>').addClass('btn btn-success btn-lg')
						.text('Edit').addClass('edit').attr({'data-toggle':'modal','data-target':'#editModal'});
				var btnDelete = $('<btn>').addClass('btn btn-danger btn-lg')
						.text('Delete').addClass('delete');
				row.append(tdImage).append(tdName).append(tdEmail)
						.append(tdTel).append(tdAddress).append(btnDelete).append(btnEdit);
				holder.push(row);
				//console.log(i)
			}
				$('#tblBody').empty().append(holder);
		}

				// var contain =[conImage, conName, conEmail, conTel, conAddress ];
				// var row = $('<tr>');
				// for(var i = 0; i< 5; i++){
				// 	if(i ===0){
				// 		var cols = $('<img>').attr({'src': contain[i],
				// 								'width':'150px'});
				// 	}
				// 	else
				// 		var cols = $('<td>').text(contain[i]);
				// 		row.append(cols);
				// }
				// $('#tblBody').append(row);
			 // 	$('input').val('');
				// e.preventDefault();
	
	var myStorage = {
        get: function(){
          try{
            var contact= JSON.parse(localStorage.contact)
          }
          catch(e){
            var contact = [];
          }
         return contact;
        },
        set: function(contact){
          localStorage.contact = JSON.stringify(contact);
        }
  };

	init();
})();