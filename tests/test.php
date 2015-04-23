<?php
// run phpunit on this file from the root of the git repository

class StateTest extends PHPUnit_Framework_TestCase
{
    public function testPowerSet()
    {
    	require("state.php");
    	$input = array("A", "B");

    	$result = powerSet($input);

    	$this->assertContains(array(), $result);
    	$this->assertContains(array("A"), $result);
    	$this->assertContains(array("B"), $result);
    	$this->assertContains(array("A","B"), $result);
    }
}