<?php
	/**
	* Class to hold the state object
	*/
	class NFAState
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
 	 * Identical to NFAState except that the adjacency list maps a transition to a DFAState name
 	 *  
 	 */
	class DFAState extends NFAState
	{
		public $substates; // easier to iterate through these than exploding the state name

		function setSubstates($substates) {
			$this->substates = $substates;
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

	        	// don't need array_unique here because the powerset elements get added as such
	        	// [[]]                   -> add([A])
	        	// [[], [A]]              -> add([B])
	        	// [[], [A], [B], [A, B]] -> add([C])
	        	// [[], [A], [B], [A, B], [C], [A, C], [B, C], [A, B, C]]
	        	// because of nature of the merge with only ne
	        	$output = array_merge($subset, $otherSubset);
	        	sort($output);
	            $powerSet[] = $output;
	        }
	    }

	    return $powerSet;
	}

	/**
	 * Main logic of the server, performs the NFA to DFA conversion via subset transformation
	 * @param  array $stateNames  array of NFA state names for easy access
	 * @param  array $transitions array of transitions for easy access
	 * @param  array $nfaStates   array of States of an NFA generated by jsonToStateArray function
	 * @return array              array of States of a DFA, state names will be stringified
	 */
	function transformToDfa($stateNames, $transitions, $nfaStates) {
		$dfaStates = [];

		$powerSet = powerSet($stateNames);

		foreach ($powerSet as $subset) {
			$name = implode($subset);
			if ($name == "") {
				$name = "@";
			}
			$d = new DFAState($name);
			$d->setSubstates($subset);
			$dfaStates[$name] = $d;
		}

		foreach($dfaStates as $dfaState) {
			foreach($transitions as $transition) {
				
				$collector = [];

				foreach ($dfaState->substates as $substateName) {

					$nfaState = $nfaStates[$substateName];


					$toStates = $nfaState->adjacencyList[$transition];

					$collector = array_unique(array_merge($collector, $toStates));
				}
				sort($collector);

				$toState = implode($collector);
				if ($toState == "") {
					$toState = "@";
				}

				$dfaState->setTransition($transition, $toState);

			}
		}

		return $dfaStates;
	}
?>