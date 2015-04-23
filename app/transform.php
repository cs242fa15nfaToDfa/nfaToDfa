<?php
	require("state.php");
	require("json.php");

	// decode the json from the server
	$json = file_get_contents('php://input');
	$obj = json_decode($json);
	// extract the contents of the json and feed them into the preprocessing functions
	$stateNames = $obj->stateNames;
	$transitions = $obj->transitions;
	$nfaStates = jsonToStateArray($obj->states);
	
	// perform the subset transformation and return to the client
	$dfaStates = transformToDfa($stateNames, $transitions, $nfaStates);
	echo buildJSON($dfaStates);
?>