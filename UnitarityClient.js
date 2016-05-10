var sq2 = Math.sqrt(2)/2;
var sq3 = 1/Math.sqrt(3);
var s3 = 1/(1.5*Math.sqrt(3));

var f0 = 0.02;
var A0 = 1;
var S0 = 1;

var Sf = 0.1;
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
/*
[[1,1,1], 1, [sq3/1.9, 0]],
[[1,0,0], 0, [sq3/4, 0]],
[[0,1,0], 0, [sq3/4, Math.PI/3]]
*/

[[1,1], f0, [A0, 0]],
[[0,1], 0, [S0, 0]],
[[0,1], Sf, [S0, 0.25]],
[[0,1], 3*Sf, [S0/3, 0.25]],
[[0,1], 5*Sf, [S0/5, 0.25]]

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
function makeBaseUniverse() {
	var data = [
		[[1], f0, [A0,0]]
	];
	return data;
}
function makeParticleUniverse(p) {

var rp = Math.random();
//var rt = Math.random() * Sf;
//var rt = p*0.1;
var rt = Math.random()/10;
//rt = 0;
console.log(rt);
//if (p != 0) rt = 0; else rt = .5;
	var data = [

	[[1], f0, [A0, 0]],
[[1], 0, [S0, 0+rp]],
[[1], Sf, [S0, 0.25+rp - rt]],
[[1], 3*Sf, [S0/3, 0.25+rp - rt*3]],
[[1], 5*Sf, [S0/5, 0.25+rp - rt*5]]

	];
	return data;
}
function makeMultiverse() {
	var ret = [];
	ret.push(makeBaseUniverse());
	var pnum = 20;
	for (var i=0; i < pnum; i++) {
		ret.push(makeParticleUniverse(i));
	}
	return ret;
}
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
function UnitarityClient() {  
	this.graphics = new UnitarityGraphics(this);
	var inputState = makeMultiverse();
	//var returnedState = inputState || makeStateFromData(stateData);
	//var returnedState = inputState || makeStateFromData(makeMultiverse());
	this.multiverse = [];
	for (var i=0; i < inputState.length; i++) {

		var returnedState = makeStateFromData(inputState[i]);
		var state = returnedState[0];
		var initialState = returnedState[1];
		//debugger;
		
		var universe = new Universe(state, initialState);
		var l = state[0].realComponents.length; //fix for multiple dims
		for (var k=0; k < l; k++) {
			this.graphics.addScalar(universe, k);

		this.multiverse.push(universe);
	}
	}
	this.startTime = new Date().getTime();
}
UnitarityClient.prototype.updateUniverse = function() {
	var t = new Date().getTime() - this.startTime;
	t = t/1000;

	for (var i=0; i < this.multiverse.length; i++) {
		var universe = this.multiverse[i];
		universe.setTime(t);
	}
	//debugger;
	//this.universe.setTime(t);
}