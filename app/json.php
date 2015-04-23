<?php 


	/**
	 * Converts the JSON file to an array in php format
	 * @param  	$obj deserialized JSON object from JavaScript
	 * @return array of states in a php array 
	 */
	function jsonToStateArray($nfaStates) {

		$array = array();

		//loop through all the states
		foreach($nfaStates as $state){
			
			//initialize a new state with the same name as the current state in the array
			$newState = new NFAState($state->name);
			
			//loop through the adjacency list and use the key value pair as the transition for the state
			foreach ($state->adjacencyList as $transition => $toStates) {
				$newState->setTransition($transition, $toStates);
			}

			//add the new state to the array
			$array[$state->name] = $newState;
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

		//set the array of states in the JSON equal to the states inputted
		$json["states"] = $states;

		return json_encode($json);

	}


?>
