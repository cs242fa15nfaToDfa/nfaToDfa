<?php 


	/**
	 * Converts the JSON file to an array in php format
	 * @param  	$obj deserialized JSON object from JavaScript
	 * @return [type]       [description]
	 */
	function jsonToStateArray($obj) {

		$array = array();

		foreach($obj->nodes as $state){
			
			$newState = new State($state->name);
			
			foreach ($state->adjacencyList as $transition => $toStates) {
				$newState->setTransition($transition, $toStates);
			}

			$array[$state->name] = $newState;
		}

		return $array;

	}


	function getTransitions($obj) {

		$array = array();

		$a = $obj->nodes[0];
		foreach ($a->adjacencyList as $key => $value) {
			$array[] = $key;
		}

		return $array;

	}

	function buildJSON($states) {
		$json = array();

		$json["states"] = $states;

		return json_encode($json);

	}


?>