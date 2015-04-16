
QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});



QUnit.test( "testStateConstructor", function( assert ) {
	var testState = new State("test");
	assert.equal(testState.name == "test", true);
});


QUnit.test( "testSetTransitionFunction", function ( assert ) {
	var testState = new State("test");
	var transitionStates = ["i", "j"];
	testState.setTransition("n", transitionStates);
	console.log(testState.adjacencyList["n"]);
	assert.equal(testState.adjacencyList["n"][0] == "i" && testState.adjacencyList["n"][1] == "j", true);
});