function validate_nodes() {
	nameFunction();
	console.log("Hello World!");
	return true;
}

function getNumNodes(input_string) {
	input_string = input_string.toUpperCase();
	var arr = input_string.split(",");
	for (var i = 0; i < arr.length; i++) {
		var elem = arr[i];

		if (elem.length != 1) {
			console.log("Please only single letters.")
			return -1;
		}
	};
	return arr.length;
}

var i = 0; /* Set Global Variable i */
function increment(){
i += 1; /* Function for automatic increment of field's "Name" attribute. */
}
/*
---------------------------------------------

Function to Remove Form Elements Dynamically
---------------------------------------------

*/
function removeElement(parentDiv, childDiv){
	if (childDiv == parentDiv){
		alert("The parent div cannot be removed.");
	}
	else if (document.getElementById(childDiv)) {
		var child = document.getElementById(childDiv);
		var parent = document.getElementById(parentDiv);
		parent.removeChild(child);
	}
	else{
		alert("Child div has already been removed or does not exist.");
		return false;
	}
}
/*
----------------------------------------------------------------------------

Functions that will be called upon, when user click on the Name text field.

----------------------------------------------------------------------------
*/
function nameFunction(){
	var r = document.createElement('span');
	var y = document.createElement("INPUT");
	y.setAttribute("type", "text");
	y.setAttribute("placeholder", "Name");
	increment();
	y.setAttribute("Name", "textelement_" + i);
	r.appendChild(y);
	r.setAttribute("id", "id_" + i);
	document.getElementById("node_input").appendChild(r);
}
/*
-----------------------------------------------------------------------------

Functions that will be called upon, when user click on the Reset Button.

------------------------------------------------------------------------------
*/
function resetElements(){
	document.getElementById('node_input').innerHTML = '<form NAME="myform" ID="node_input" ACTION="" METHOD="POST">Enter nodes: <br>
									<input TYPE="text" NAME="inputbox" VALUE=""><P><br>
									<input TYPE="button" NAME="button" Value="Click" onClick="validate_nodes(this.form)"><br><br>
									<input TYPE="reset" NAME="resetbutton" Value="Reset" onClick="resetElements()">
								</form>';
}