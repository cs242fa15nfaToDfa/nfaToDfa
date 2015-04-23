<?php 


	/**
	 * Converts the JSON file to an array in php format
	 * @param  	$obj deserialized JSON object from JavaScript
	 * @return array of states in a php array 
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

	/**
	 * Returns the transitions of the object
	 * @param  [type] $obj deserialized json
	 * @return array  of the possible transitions
	 */
	function getTransitions($obj){

		$array = array();

		$a = $obj->nodes[0];
		foreach ($a->adjacencyList as $key => $value) {
			$array[] = $key;
		}

		return $array;

	}

	/**
	 * serializes the json to be sent back to the server 
	 * @param  array $states contains the DFA states
	 * @return json formatted list of DFA states   
	 */
	function buildJSON($states) {
		$json = array();

		$json["states"] = $states;

		return json_encode($json);

	}


?>
