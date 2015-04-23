<?php
	require("state.php");
	require("json.php");

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	$nfaStates = jsonToStateArray($obj->states);
	// $transitions = getTransitions($obj);
	$transitions = $obj->transitions;

	$dfaStates = transformToDfa($nfaStates, $transitions);

	echo buildJSON($dfaStates);
?>