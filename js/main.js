function validate_nodes() {
	console.log("Hello World!");

	var parseStr = $("#csn_text").val();
	
	var numPairs = getNumNodes(parseStr);

	if (numPairs > 0) {

		var arr = parseStr.split(",");
		for (var i = 0; i < arr.length; i++) {
			var y = document.createElement("INPUT");
			y.setAttribute("type", "text");
			y.setAttribute("placeholder", "𝛿(" + arr[i] + ", 0)");
			y.setAttribute("Name", "textelement_" + 2*i);
			y.setAttribute("id", "id_" + 2*i);

			var z = document.createElement("INPUT");
			z.setAttribute("type", "text");
			z.setAttribute("placeholder", "𝛿(" + arr[i] + ", 1)");
			z.setAttribute("Name", "textelement_" + 2*i+1);
			z.setAttribute("id", "id_" + 2*i+1);


			/**
			 * JQuery conversion example
			 */
			var j = $(y);
			var k = $(z);
			// document.getElementById("node_input").appendChild(r);
			$("#node_input").append(j);
			$("#node_input").append(k);
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
			console.log("Please only single letters.");
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
	document.getElementById('node_input').innerHTML = '<form NAME="myform" ID="node_input" ACTION="" METHOD="POST">Enter nodes: <br>
									<input TYPE="text" NAME="inputbox" VALUE=""><P><br>
									<input TYPE="button" NAME="button" Value="Click" onClick="validate_nodes(this.form)"><br><br>
									<input TYPE="reset" NAME="resetbutton" Value="Reset" onClick="resetElements()">
								</form>';
}