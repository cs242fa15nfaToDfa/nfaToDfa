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

	function powerSet($array) {
		$powerSet = [];
		$powerSet[] = [];

		foreach ($array as $element) {
			foreach ($powerSet as $toJoin) {
				$elem = [];
				$elem[] = $toJoin;
				$powerset[] = array_merge($elem, $combination);
			}
		}

		return $powerSet;
	}
?>