<?php
	/**
	* Class to hold the state object
	*/
	class State
	{
		public $name;
		public $adjacencyList = [];

		function __construct($name) {
			$this->name = $name;
		}

		/**
		 * Analogous to setTransition in main.js
		 * @param string $transition lowercase single character string, transition name
		 * @param array  $toStates   state(s) to transition to
		 */
		function setTransition($transition, $toStates) {
			$this->adjacencyList[$transition] = $toStates;
		}
	}

	/**
	 * Given array of node names returns the power set of the nodes
	 * ex. [A, B] -> [[], [A], [B], [A,B]]
	 * @param  array  $nodeNames Array of node names
	 * @return array             Array of array of node names
	 */
	function powerSet($stateNames) {
	    $powerSet = [];
	    $powerSet[] = []; // add an empty set

	    foreach ($stateNames as $stateName) {
	        foreach ($powerSet as $subset) {
	        	$otherSubset = [];
	        	$otherSubset[] = $stateName;

	            $powerSet[] = array_merge($subset, $otherSubset);
	        }
	    }

	    return $powerSet;
	}

	/**
	 * Main logic of the server, performs the NFA to DFA conversion via subset transformation
	 * @param  array $nfaStates array of States of an NFA
	 * @return array            array of States of a DFA, state names will be stringified
	 */
	function transformToDfa($nfaStates) {
		$dfaStates = [];

		$stateNames = [];
		foreach ($nfaStates as $nfaState) {
			$stateNames[] = $nfaState->name;
		}
		$powerSet = powerSet($stateNames);

		foreach ($powerSet as $subset) {
			$name = implode($subset);
			if ($name == "") {
				$name = "@";
			}
			$dfaStates[] = new State($name);
		}

		print_r($dfaStates);
		// here be magic
		return $dfaStates;
	}
?>