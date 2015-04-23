<?php
// run phpunit on this file from the root of the git repository

class StateTest extends PHPUnit_Framework_TestCase
{

    /*
        Function to test the powerSet fuction, and make sure it is outputting the right array
     */
    public function testPowerSet(){
    	require("app/state.php");

        //initialize test input
    	$input = array("A", "B");

        //get the power set
    	$result = powerSet($input);

        //Make sure the outputs are correct
    	$this->assertContains(array(), $result);
    	$this->assertContains(array("A"), $result);
    	$this->assertContains(array("B"), $result);
    	$this->assertContains(array("A", "B"), $result);
    }


    /*
        Function to test the jsonToStateArray function, and make sure it is outputting the right array
     */
    public function testJsonToStateArray(){
        require("app/json.php");

        //initialize input
        $json = '{"stateNames":["A","B","C"],"transitions":["a","b"],"states":[{"name":"A","adjacencyList":{"a":["B","C"],"b":[]}},{"name":"B","adjacencyList":{"a":["A"],"b":["B"]}},{"name":"C","adjacencyList":{"a":[],"b":["A","B"]}}]}';

        //decode JSON and extract the necessary data
        $obj = json_decode($json);

        $result = jsonToStateArray($obj->states);

        //initialize states to compare with the output of the function
        $aState = new NFAState("A");
        $aState->setTransition("a", array("B","C"));
        $aState->setTransition("b", []);

        $bState = new NFAState("B");
        $bState->setTransition("a", array("A"));
        $bState->setTransition("b", array("B"));
        
        $cState = new NFAState("C");
        $cState->setTransition("a", []);
        $cState->setTransition("b", array("A", "B"));

        // can't do assert contains on an array of objects apparently
        $this->assertEquals($aState, $result["A"]);
        $this->assertEquals($bState, $result["B"]);
        $this->assertEquals($cState, $result["C"]);
    }

    /*
        Function to test the tranformTODFA function, and make sure it is outputting the right array
     */
    public function testTransformToDFA(){
        //initizlize input
        $json = '{"stateNames":["A","B","C"],"transitions":["0","1"],"states":[{"name":"A","adjacencyList":{"0":["A","B"],"1":["C"]}},{"name":"B","adjacencyList":{"0":["C"],"1":[]}},{"name":"C","adjacencyList":{"0":[],"1":["B","C"]}}]}';
        
        //decode JSON and extract contents
        $obj = json_decode($json);
        $stateNames = $obj->stateNames;
        $transitions = $obj->transitions;
        $nfaStates = jsonToStateArray($obj->states);

        //transform it
        $output = transformToDfa($stateNames, $transitions, $nfaStates  );

        //Make sure all elements are the right expected output
        $this->assertEquals("ABC", $output["ABC"]->adjacencyList["0"]);
        $this->assertEquals("BC", $output["ABC"]->adjacencyList["1"]);

        $this->assertEquals("C", $output["BC"]->adjacencyList["0"]);
        $this->assertEquals("BC", $output["BC"]->adjacencyList["1"]);

        $this->assertEquals("@", $output["C"]->adjacencyList["0"]);
        $this->assertEquals("BC", $output["C"]->adjacencyList["1"]);

        $this->assertEquals("ABC", $output["AB"]->adjacencyList["0"]);
        $this->assertEquals("C", $output["AB"]->adjacencyList["1"]);

        $this->assertEquals("AB", $output["A"]->adjacencyList["0"]);
        $this->assertEquals("C", $output["A"]->adjacencyList["1"]);

        $this->assertEquals("@", $output["@"]->adjacencyList["0"]);
        $this->assertEquals("@", $output["@"]->adjacencyList["1"]);



    }



}