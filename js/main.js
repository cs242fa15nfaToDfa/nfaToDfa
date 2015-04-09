var nodeArray;

function processNodes() {
	var input = $("#csn_text").val();
	// validation step
	var numPairs = nodeInputValidator(input);

	if (numPairs > 0) {
		$("#csn_button").hide();
		nodeArray = input.split(",");
		for (var i = 0; i < nodeArray.length; i++) {
			// create element for input field for d(A,0)
			var zeroTransition = document.createElement("INPUT");
			zeroTransition.setAttribute("type", "text");
			zeroTransition.setAttribute("placeholder", "𝛿(" + nodeArray[i] + ", 0)");
			zeroTransition.setAttribute("Name", "textelement_" + (2*i));
			zeroTransition.setAttribute("id", "transitition_input_id_" + (2*i));
			// create element for input for d(A, 1)
			var oneTransition = document.createElement("INPUT");
			oneTransition.setAttribute("type", "text");
			oneTransition.setAttribute("placeholder", "𝛿(" + nodeArray[i] + ", 1)");
			oneTransition.setAttribute("Name", "textelement_" + (2*i+1));
			oneTransition.setAttribute("id", "transitition_input_id_" + (2*i+1));
			// add text fields to DOM
			$("#node_input").append($(zeroTransition));
			$("#node_input").append($(oneTransition));
		};
		// add submit button to DOM
		var submitButton = document.createElement("INPUT");
		submitButton.setAttribute("type", "button");
		submitButton.setAttribute("id", "submit_nfa_button");
		submitButton.setAttribute("Value", "Transform");
		submitButton.setAttribute("onClick", "transformNFA()");
		$("#node_input").append($(submitButton));
	}
	return true;
}

function nodeInputValidator(input_string) {

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

function resetElements() {
	$('input[id*="transitition_input_id_"]').remove();
	$("#submit_nfa_button").remove();
	$("#csn_button").show();
	$("#csn_text").val("");
}

function transformNFA() {
	// grab every input element

	// process input

	// build json

	// ajax request to servers
}