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
    	$this->assertContains(array("A","B"), $result);
    }


    public function testJsonToStateArray(){
        require("app/json.php");
        require("app/state.php");
        $json = '{"nodes":[{"name":"A","adjacencyList":{"a":["B","C"],"b":[]}},{"name":"B","adjacencyList":{"a":["A"],"b":["B"]}},{"name":"C","adjacencyList":{"a":[],"b":["A","B"]}}]}';

        $input = json_decode($json);

        $result = array();

        $aState = new State("A");
        $aState->setTransition("a", ["B","C"]);
        $aState->setTransition("b", []);
        $result = $aState;

        $bState = new State("B");
        $bState->setTransition("a", ["A"]);
        $bState->setTransition()
        

            $array[] = $newState;





    }






}