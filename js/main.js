// global to hold the nodes
var nodeArray;

function processNodes() {
	var input = $("#csn_text").val().replace(/ /g,'');
	// validation step
	var numPairs = nodeInputValidator(input);

	if (numPairs > 0) {
		$("#csn_button").hide();
		nodeArray = input.split(",");
		for (var i = 0; i < nodeArray.length; i++) {
			// using document.createElement is faster than jQuery's creation

			// create element for input field for d(A,0)
			var zeroTransition = $(document.createElement("INPUT"));
			zeroTransition.attr({
				"type" : "text",
				"placeholder" : "𝛿(" + nodeArray[i] + ", 0)",
				"Name" : "textelement_" + (2*i),
				"id" : "transitition_input_id_" + (2*i)
			});

			// create element for input for d(A, 1)
			var oneTransition = $(document.createElement("INPUT"));
			oneTransition.attr({
				"type" : "text",
				"placeholder" : "𝛿(" + nodeArray[i] + ", 1)",
				"Name" : "textelement_" + (2*i+1),
				"id" : "transitition_input_id_" + (2*i+1)
			});
			// add text fields to DOM
			$("#node_input").append(zeroTransition);
			$("#node_input").append(oneTransition);
		};
		// add submit button to DOM
		var submitButton = $(document.createElement("INPUT"));
		submitButton.attr({
			"type" : "button",
			"class" : "special",
			"id" : "submit_nfa_button",
			"Value" : "Transform",
			"onClick" : "transformNFA()"
		});
		$("#node_input").append(submitButton);
	}
	return true;
}

function nodeInputValidator(inputString) {

	inputString = inputString.toUpperCase();
	var arr = inputString.split(",");

	var duplicateMap = {};

	for (var i = 0; i < arr.length; i++) {
		var elem = arr[i];
		// check against multi-letter node names
		if (elem.length != 1) {
			console.log("Please only single letters.");
			return -1;
		}

		if (duplicateMap[elem]) {
			console.log("Please no duplicates.")
			return -1;
		}
		duplicateMap[elem] = true;
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
	var failedElement = -1;
	// grab every input element
	$('input[id*="transitition_input_id_"]').each(function(i,v) {
		var value = $(v).val();
		console.log(value);

		var validate = nodeInputValidator(value);
		if (validate == -1) {
			console.log("Validation failed at text box " + i);
			return -1;
		}
	});
	// process input

	// build json

	// ajax request to servers
}