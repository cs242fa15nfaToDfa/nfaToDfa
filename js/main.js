// global to hold the nodes
var nodeArray;

function processNodes() {
	//get rid of spaces
	var input = $("#csn_text").val().replace(/ /g,'');
	var inputTransitions = $("#csn_transitions").val().replace(/ /g, '');
	// validation step
	var numPairs = nodeInputValidator(input, inputTransitions);

	if (numPairs > 0) {
		$("#csn_button").hide();
		nodeArray = input.split(",");
		transitionArray = inputTransitions.split(",");
		for (var i = 0; i < nodeArray.length; i++) {
			for(var j = 0; j < transitionArray.length; j++) {
			// using document.createElement is faster than jQuery's creation

			// create element for input field for d(node i, transition j)
			var transition = $(document.createElement("INPUT"));
			transition.attr({
				"type" : "text",
				"placeholder" : "𝛿(" + nodeArray[i] + "," + transitionArray[j] + ")",
				"Name" : "textelement_" + nodeArray[i] + transitionArray[j],
				"id" : "transitition_input_id_" + nodeArray[i] + transitionArray[j]
			});

			// add text fields to DOM
			$("#node_input").append(transition);
			};
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

function nodeInputValidator(inputString, inputTransitions) {

	inputString = inputString.toUpperCase();
	var arr = inputString.split(",");
	var duplicateMap = {};



	for (var i = 0; i < arr.length; i++) {
		var elem = arr[i];
		// check against multi-letter node names
		if (elem.length != 1) {
			console.log("Please only single character nodes.");
			return -1;
		}

		if (duplicateMap[elem]) {
			console.log("Please no duplicate inputs.")
			return -1;
		}
		duplicateMap[elem] = true;
	};


	inputTransitions = inputTransitions.toUpperCase();
	var transitionArr = inputTransitions.split(",");
	var duplicateTransitionMap = {};

	for(var j = 0; j < transitionArr.length; j++) {
		var elem = transitionArr[j];
		//check against multi-letter node names
		if (elem.length != 1) {
			console.log("Please only single character transitions.");
			return -1;
		}

		if(duplicateTransitionMap[elem]) {
			console.log("Please no duplicate transitions.");
			return -1;
		}
		duplicateTransitionMap[elem] = true;
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