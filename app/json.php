<?php 


	/**
	 * Converts the JSON file to an array in php format
	 * @param  	$obj deserialized JSON object from JavaScript
	 * @return [type]       [description]
	 */
	function jsonToStateArray($obj){
//print_r($obj);
		$array = array();

		foreach($obj->nodes as $state){
			
			$newState = new State($state->name);
			
			foreach ($state->adjacencyList as $transition => $toStates) {
				$newState->setTransition($transition, $toStates);
			}

			$array[] = $newState;
		}

// print_r($array);

		return $array;

	}






?>