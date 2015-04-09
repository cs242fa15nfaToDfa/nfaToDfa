function validate_nodes() {
	console.log("Hello World!");

	var parseStr = $("#comma_separated_nodes").val();
	var numPairs = getNumNodes(parseStr);

	if (numPairs > 0) {

		var arr = parseStr.split(",");
		for (var i = 0; i < arr.length; i++) {
			var r = document.createElement('span');
			var y = document.createElement("INPUT");
			y.setAttribute("type", "text");
			y.setAttribute("placeholder", "Name");
			y.setAttribute("Name", "textelement_" + i);
			r.appendChild(y);
			r.setAttribute("id", "id_" + i);

			/**
			 * JQuery conversion example
			 */
			var j = $(r);
			// document.getElementById("node_input").appendChild(r);
			$("#node_input").append(j);
		};

	}
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
-----------------------------------------------------------------------------

Functions that will be called upon, when user click on the Reset Button.

------------------------------------------------------------------------------
*/
function resetElements(){
	document.getElementById('node_input').innerHTML = '';
}