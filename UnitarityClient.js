var sq2 = Math.sqrt(2)/2;
var sq3 = 1/Math.sqrt(3);
var s3 = 1/(1.5*Math.sqrt(3));
stateData = [ 
/*
[[1,1], .25, [sq2,0]],
[[1,-1], -1, [sq2/16,0]]
*/
/*
[[1,1,1], -.237, [sq3/1.9, 0]],
[[1,-1,0], .477, [sq2/1.9, 0]],
[[1,1,-2], -.889, [1/3.2, 0]]
*/

[[1,1,1], 1, [sq3/1.9, 0]],
[[1,0,0], 0, [sq3/4, 0]],
[[0,1,0], 0, [sq3/4, Math.PI/3]]

/*
[[1,1,1,1], -.65, [1/2/2, 0]],
[[1,-1,0,0], +.433, [sq2/2, 0]],
[[1,1,-2,0], -.479, [sq3/2/1.62, 0]],
[[1,1,1,-3], .573, [1/2/2, 0]]
*/
/*
[[1,0,0,0,0,0,1,0], [.5,0], [.3, 0.0]],
[[0,1,0,0,0,0,0,1], [0,.5], [0,.3]]

/*
[[1,0,1,0,0,0,0,0], [.1,0], [1.0, 0.0]],
[[0,1,0,1,0,0,0,0], [0,.1], [0.0,1.0]],

[[0,0,0,0,-1,0,0,0], [.1,0], [1.0, 0.0]],
[[0,0,0,0,0,-1,0,0], [0,.1], [0.0,1.0]],

[[0,0,.5,0,0,0,1,0], [1,0], [.30, 0.0]],
[[0,0,0,.5,0,0,0,1], [0,1], [0.0,.30]]
*/
];
function randomVector(length) {
	var result = [];
	for (var i=0; i < length; i++) {
		result.push(Math.random());
	}
	return result;
}
function generateState() {
	var result = [];
	var num = 20;
	for (var i=0; i < num; i++) {
		rndvec = randomVector(num);
		d = [rndvec, Math.random(), [5*Math.random()/num,0]];
		result.push(d);
	}
	return result;
}
function makeStateFromData(data) {
	var ret = [];
	var initStateVector = new StateVector();
	var l = data.length;
	for (var i=0; i < l; i++) {
		var cur = data[i];
		ret.push(new StationaryVector(cur[0],cur[1]));
		initStateVector.addComponent(cur[2][0],cur[2][1]);
	}
	return [ret,initStateVector];
}
function UnitarityClient(inputState) {
	//var returnedState = inputState || makeStateFromData(stateData);
	var returnedState = inputState || makeStateFromData(generateState());
	state = returnedState[0];
	initialState = returnedState[1];
	//debugger;
	this.graphics = new UnitarityGraphics(this);
	this.universe = new Universe(state, initialState);
	var l = state.length; //fix for multiple dims
	for (var i=0; i < l; i++) {
		this.graphics.addScalar(this.universe, i);
	}
	this.startTime = new Date().getTime();
}
UnitarityClient.prototype.updateUniverse = function() {
	var t = new Date().getTime() - this.startTime;
	t = t/1000;
	//debugger;
	this.universe.setTime(t);
}