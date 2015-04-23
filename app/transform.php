<?php
	require("state.php");
	require("json.php");

	$json = file_get_contents('php://input');
	$obj = json_decode($json);
	$nfaStates = jsonToStateArray($obj);
	$transitions = getTransitions($obj);

	$dfaStates = transformToDfa($nfaStates, $transitions);

	echo buildJSON($dfaStates);
?>