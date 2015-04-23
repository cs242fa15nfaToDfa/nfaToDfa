<?php
	require("state.php");
	require("json.php");

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	$stateNames = $obj->stateNames;
	$transitions = $obj->transitions;
	$nfaStates = jsonToStateArray($obj->states);

	$dfaStates = transformToDfa($stateNames, $transitions, $nfaStates);

	echo buildJSON($dfaStates);
?>