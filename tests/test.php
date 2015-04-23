<?php
// This is a class to connect to the test database and check to see if my insertion functions are robust.

class StateTest extends PHPUnit_Framework_TestCase
{
    public function testComment()
    {
        require_once("app/comment.php");
        writeToDatabase("Comments_test", NULL, "earthToEcho");
        $comments = readFromDatabase("Comments_test");

        assertEqual("earthToEcho", $comments[0]->text);
        debug_clearDatabase();
    }

    public function testNestedComment()
    {
        require_once("app/comment.php");
        writeToDatabase("Comments_test", NULL, "parent");
        $comments = readFromDatabase("Comments_test");
        $id = $comments[0]->id;
        writeToDatabase("Comments_test", $id, "child");
        $comments = readFromDatabase("Commments_test");
        
        assertEqual("child", $comments[0]->children[0]->text);
        debug_clearDatabase();
    }

    public function testSQLInjection()
    {
        require_once("app/comment.php");
        writeToDatabase("Comments_test", NULL, "Robert'); DROP TABLE Comments; --");
        $comments = readFromDatabase("Comments_test");

        // assert that the database hasn't exploded
        assertEqual("Robert'); DROP TABLE Comments_test; --", $comments[0]->text);
        debug_clearDatabase();
    }


    public function testPowerSet()
    {
    	$input = array("A", "B");
    	$output =  array(array(), array("A"), array("B"), array("A","B"));

    	$result = powerSet($input);

    	assertContains(array(), $result);
    	assertContains(array("A"), $result);
    	assertContains(array("B"), $result);
    	assertContains(array("A,B"), $result);
    }


}