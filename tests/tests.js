
QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});



QUnit.test( "testStateConstructor", function( assert ) {
	var testState = new State("test");
	assert.equal(testState.name == "test", true);
});