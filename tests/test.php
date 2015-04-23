<?php
// run phpunit on this file from the root of the git repository

class StateTest extends PHPUnit_Framework_TestCase
{
    public function testPowerSet(){
    	require("app/state.php");
    	$input = array("A", "B");

    	$result = powerSet($input);

    	$this->assertContains(array(), $result);
    	$this->assertContains(array("A"), $result);
    	$this->assertContains(array("B"), $result);
    	$this->assertContains(array("A", "B"), $result);
    }


    public function testJsonToStateArray(){
        require("app/json.php");
        // require("app/state.php");
        $json = '{"nodes":[{"name":"A","adjacencyList":{"a":["B","C"],"b":[]}},{"name":"B","adjacencyList":{"a":["A"],"b":["B"]}},{"name":"C","adjacencyList":{"a":[],"b":["A","B"]}}]}';

        $input = json_decode($json);

        $result = jsonToStateArray($input);


        $aState = new State("A");
        $aState->setTransition("a", array("B","C"));
        $aState->setTransition("b", []);

        $bState = new State("B");
        $bState->setTransition("a", array("A"));
        $bState->setTransition("b", array("B"));
        
        $cState = new State("C");
        $cState->setTransition("a", []);
        $cState->setTransition("b", array("A", "B"));

        // can't do assert contains on an array of objects apparently
        $this->assertEquals($aState, $result[0]);
        $this->assertEquals($bState, $result[1]);
        $this->assertEquals($cState, $result[2]);
    }


    public function testTransformToDFA(){
        
        $nfaStates = array();
        $transitions = array("0", "1");

        $aState = new State("A");
        $aState->setTransition("0", array("A","B"));
        $aState->setTransition("1", array("C"));
        $nfaStates[] = $aState;


        $bState = new State("B");
        $bState->setTransition("0", array("C"));
        $bState->setTransition("1", []);
        $nfaStates[] = $bState;

        
        $cState = new State("C");
        $cState->setTransition("0", []);
        $cState->setTransition("1", array("B", "C"));
        $nfaStates[] = $cState;

        $output = transformToDfa($nfaStates, $transitions);

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