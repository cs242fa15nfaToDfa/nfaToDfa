<?php
	require("state.php");
	require("json.php");
	error_reporting (E_ALL); 

	$json = file_get_contents('php://input');
	$obj = json_decode($json);
	$nfaStates = jsonToStateArray($obj);
	$transitions = getTransitions($obj);
	
	$nodeNames = [];

	$nodes = [];

	foreach ($obj->nodes as $key => $value) {
		array_push($nodeNames, $value->name);
		// print_r($value);
	}

	$final = powerSet($nodeNames);

	$a = new State("A");
	$b = new State("B");
	$c = new State("C");

	$input = array($a, $b, $c);

	transformToDfa($nfaStates, $transitions);
?>