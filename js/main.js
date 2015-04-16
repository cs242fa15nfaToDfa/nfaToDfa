// global to hold the states
var stateArray;
var transitionArray;


var State = function(name) { 
	this.name = name;
	this.adjacencyList = {}
	for (var i = 0; i < transitionArray.length; i++) {
		adjacencyList[transitionArray[i]] = null;
	};

	this.setTransition = function(transition, toStates) {
		this.adjacencyList[transition] = toStates;
	}
};

/**
 * Takes an input of either a string of states or transitions and gives their count
 * @param  {[type]} inputString      string captured from HTML
 * @return {[integer]}               number of states/elements in string, -1 if fail
 */
function stateTransInputValidator(inputString) {
	var arr = inputString.split(",");
	var duplicateMap = {};

	for (var i = 0; i < arr.length; i++) {
		var elem = arr[i];
		// check against multi-letter state names
		if (elem.length != 1) {
			console.log("Please only single character states/transitions.");
			return -1;
		}

		if (duplicateMap[elem]) {
			console.log("Please no duplicate inputs.")
			return -1;
		}
		duplicateMap[elem] = true;
	};

	return arr.length;
}

function getStates(id) {
	var inputStates = (id).val().replace(/ /g,'').toUpperCase();
	$(id).val(inputStates);
};

function getTransitions() {
	var inputTransitions = $("#csn_transitions").val().replace(/ /g, '').toLowerCase();
	$("#csn_transitions").val(inputTransitions);

	var numTrans = stateTransInputValidator(inputTransitions);

	if (numTrans > 0) {
		var transitionArray = inputTransitions.split(",");

		return transitionArray;
	} else {
		return null;
	}
}

function processStates() {
	// get rid of spaces

	// validation step
	var numPairs = stateTransInputValidator(inputStates);


	if (numPairs > 0) {
		$("#csn_button").hide();
		stateArray = inputStates.split(",");
		
		for (var i = 0; i < stateArray.length; i++) {
			for(var j = 0; j < transitionArray.length; j++) {
				// using document.createElement is faster than jQuery's creation

				// create element for input field for d(state i, transition j)
				var transition = $(document.createElement("INPUT"));
				transition.attr({
					"type" : "text",
					"placeholder" : "𝛿(" + stateArray[i] + "," + transitionArray[j] + ")",
					"Name" : "textelement_" + stateArray[i] + "-" + transitionArray[j],
					"id" : "transitition_input_id_" + stateArray[i] + "-" + transitionArray[j]
				});

				// add text fields to DOM
				$("#state_input").append(transition);
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
		$("#state_input").append(submitButton);
	}
	return true;
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

		var validate = stateInputValidator(value);
		if (validate == -1) {
			console.log("Validation failed at text box " + i);
			return -1;
		}
	});
	// process input

	// build json

	// ajax request to servers
}




/**
 * function used to build the JSON file that will be sent to the server
 * @return {[type]}
 */
function buildJSON() {

	var JSONarr = {
		nodes: []
	};
	
	var stateArray = getStates("csn_states");
	var transitionArray = getTransitions("csn_transitions");
	for(var i = 0; i < stateArray.length; i++) {

		var stateJSON = {
			name: stateArray[i].name;
			transitions: {}
		};

		for (var i = 0; i < transitionArray.length; i++) {
			stateJSON.transitions[transitionArray[i]] = [];
		}

		


	}



}