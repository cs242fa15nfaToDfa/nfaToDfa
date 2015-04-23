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






}