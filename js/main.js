var State = function(name) {
	var self = this; 
	self.name = name;
	self.adjacencyList = {};
	
	this.setTransition = function(transition, toStates) {
		self.adjacencyList[transition] = toStates;
	}
};

/**
 * Takes an input of either a string of states or transitions and gives their count
 * @param  {string} inputString      string captured from HTML
 * @return {integer}                 number of states/elements in string, -1 if fail
 */
function stateTransInputValidator(inputString) {
	var arr;
	if (inputString == "") {
		arr = [];
	} else {
		arr = inputString.split(",");
	}

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

/**
 * Wrapper to get string from the DOM
 * @param  {string} id          HTML descriptor of the text field
 * @return {string}             Adapted string from the text field  
 */
function getStatesString(id) {
	var inputStates = $(id).val().replace(/ /g,'').toUpperCase();
	$(id).val(inputStates);
	return inputStates;
};

/**
 * Gives back an array of states from a string retrieved by getStatesString()
 * @param  {string} statesString          comma separated, no space, uppercase string of states
 * @return {array}                        array of strings with state names   
 */
function getStates(statesString) {
	var numStates = stateTransInputValidator(statesString);
	if (numStates > -1) {
		var stateArray;

		if (numStates == 0) {
			stateArray = [];
		} else {
			stateArray = statesString.split(",");
		}

		return stateArray
	} else {
		return null;
	}
}

/**
 * Gives back an array of the transitions as specified by the 
 * @return {array} 				array of strings with transition names
 */
function getTransitions() {
	// remove spaces and to lowercase
	var inputTransitions = $("#csn_transitions").val().replace(/ /g, '').toLowerCase();
	$("#csn_transitions").val(inputTransitions); // update the field

	var numTrans = stateTransInputValidator(inputTransitions);

	if (numTrans > 0) {
		var transitionArray = inputTransitions.split(",");
		return transitionArray;
	} else {
		return null;
	}
}

function processStates() {
	var statesString = getStatesString("#csn_states");
	var stateArray = getStates(statesString);
	var transitionArray = getTransitions();

	if (stateArray == null || transitionArray == null) {
		return false;
	}

	$("#csn_button").hide();
	$("#csn_states").prop("disabled", true);
	$("#csn_transitions").prop("disabled", true);
	
	for (var i = 0; i < stateArray.length; i++) {
		for(var j = 0; j < transitionArray.length; j++) {
			// using document.createElement is faster than jQuery's creation

			// create element for input field for d(state i, transition j)
			var transition = $(document.createElement("INPUT"));
			transition.attr({
				"type"        : "text",
				"placeholder" : "d(" + stateArray[i] + "," + transitionArray[j] + ")",
				"Name"        : "textelement_" + i + "-" + j,
				"id"          : "transitition_input_id_" + i + "-" + j
			});

			// add text fields to DOM
			$("#state_input").append(transition);
		}
	}

	// add submit button to DOM
	var submitButton = $(document.createElement("INPUT"));
	submitButton.attr({
		"type"    : "button",
		"class"   : "special",
		"id"      : "submit_nfa_button",
		"Value"   : "Transform",
		"onClick" : "transformNFA()"
	});
	$("#state_input").append(submitButton);

	return true;
}

/**
 * Clear out the fields and restore the site to normal
 */
function resetElements() {
	$('input[id*="transitition_input_id_"]').remove();
	$("#submit_nfa_button").remove();
	$("#csn_button").show();
	$("#csn_states").val("");
	$("#csn_states").prop("disabled", false);
	$("#csn_transitions").val("");
	$("#csn_transitions").prop("disabled", false);
	$("#reachable").text("");
	$("#unreachable").text("");
}

/**
 * 
 * @return {[type]} [description]
 */
function processTransitionsInput() {
	var array = [];

	var inputs = $('input[id*="transitition_input_id_"]');
	var i = 0;

	var inputSet = $('input[id*="transitition_input_id_' + i + '"]');
	while (inputSet.size() > 0) {


		i++;
	}
}


function generateStateObjects(stateNames, transitions) {
	console.log(stateNames);
	console.log(transitions);

	var objects = [];

	for (var i = 0; i < stateNames.length; i++) {
		var state = new State(stateNames[i]);

		// build up the adjacency list
		for (var j = 0; j < transitions.length; j++) {
			var id = "#transitition_input_id_" + i + "-" + j;
			console.log("processing id", id)
			var toStatesInput = $(id).val();

			var toStatesString = getStatesString(id);
			var toStates = getStates(toStatesString);
			state.setTransition(transitions[j], toStates);
		};

		objects.push(state);
	};

	return objects;
}

function transformNFA() {
	// grab every input element
	var statesString = getStatesString("#csn_states");
	var stateArray = getStates(statesString);
	var transitions = getTransitions();

	var transitionsToStates = [];
	$('input[id*="transitition_input_id_"]').each(function(i,v) {
		var value = $(v).val();

		var validate = stateTransInputValidator(value);
		if (validate == -1) {
			console.log("Validation failed at text box " + i);
			return -1;
		}
	});

	// process input
	var stateObjArray = generateStateObjects(stateArray, transitions);

	// build json
	var data = buildJSON(stateArray, transitions, stateObjArray);

	console.log(data);

	// ajax request to servers
	$.ajax({
		url    : "app/transform.php",
		method : "POST",
		data   : data
	}).done(function(response){
		outputDFA(response, stateArray[0]);
	});
}




/**
 * function used to build the JSON that will be sent to the server
 * @return JSON 
 */
function buildJSON(stateNames, transitions, stateObjArray) {
	var JSONarr = {
		stateNames  : stateNames,
		transitions : transitions,
		states      : stateObjArray
	};
	
	return JSON.stringify(JSONarr);
}

function arrayDifference(foo, bar) {
	var baz = [];

	$.each(foo, function(key, value) {
	    if (-1 === bar.indexOf(value)) {
	        baz.push(value);
	    }
	});
	return baz;
}


function dfs(dfaStates, state, visited) {
	visited.push(state.name);
	$.each(state.adjacencyList, function(transition, nextStateName) {
		nextState = dfaStates[nextStateName];	
		if ($.inArray(nextStateName, visited) === -1)
			dfs(dfaStates, nextState, visited);
	})
}



function outputDFA(response, firstStateName) {
	var response = JSON.parse(response);
	var dfaStates = response.states;	

	$('#reachable').text('');
	
	var visited = [];
	dfs(dfaStates, dfaStates[firstStateName], visited);
	dfaStatesNames = [];
	$.each(dfaStates, function(i,v) { dfaStatesNames.push(i); });

	unreachableStates = arrayDifference(dfaStatesNames, visited);

	for (stateName in dfaStates) { 
		var state = dfaStates[stateName];
		var fixedName = '{'  + state.substates.join() + '}'; 


		if (jQuery.inArray(stateName, unreachableStates) == '-1') {
			$('#reachable').append(fixedName + '<br>');

			for (var transition in state.adjacencyList){
				nextStateName = state.adjacencyList[transition];
				nextState = dfaStates[nextStateName];
				var nextFixedName = '{'  + nextState.substates.join() + '}';

				$('#reachable').append('d(' + fixedName + ',' + transition + ') = ' + nextFixedName + '<br>');
			}		

		}
	}

	for(unreachableStateName in unreachableStates) {
		var unreachableState = unreachableStates[unreachableStateName];
		var fixedUnreachableName = '{' + unreachableStates.substates.join() + '}';

		for (var transition in unreachableState.adjacencyList){
			nextStateName = unreachableState.adjacencyList[transition];
			nextState = unreachableStates[nextStateName];
			var nextFixedName = '{' + nextState.substates.join() + '}';

			$('#unreachable').append('d(' + fixedName + ',' + transition + ') = ' + nextFixedName + 'HELLO<br>');
		}
	}
}

