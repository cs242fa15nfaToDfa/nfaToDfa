function validate_nodes() {
	console.log("Hello World!");
	return true;
}

function getNumNodes(input_string) {
	input_string = input_string.toUpperCase();
	var arr = input_string.split(",");
	for (var i = 0; i < arr.length; i++) {
		var elem = arr[i];

		if (elem.length != 1) {
			console.log("Please only single letters.")
			return -1;
		}
	};
	return arr.length;
}