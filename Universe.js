function convertToCartesian(cyl) {
	var ret = [];

	var halflength = cyl.length/2;
	for (var i=0 ; i < halflength; i++) {

		var r = cyl[i];
		var theta = cyl[i + 1];

		var x = r * Math.cos(theta);
		var y = r * Math.sin(theta);

		ret.push(x);
		ret.push(y);
	}
	//debugger;
	return ret;
}
function Universe(state, initialState) {
	this.phaseSpaceDimension = 2;
	this.state = state || []; //indexes the columns, each of which is a stationary vec
	this.curTimeState = []; //just the state at the current time;
	this.initialState = initialState || [];
}
Universe.prototype.setTime = function(time) {
	while (this.curTimeState.length > 0) this.curTimeState.pop();
	var l = this.state.length;
	for (var i=0; i < l; i++) {
		var cur = this.state[i];
		var initial = this.initialState.comps[i];
		this.curTimeState.push(cur.timeEvolve(time, initial));
	}
}
Universe.prototype.sumAcross = function(rowIndex) {
	var retReal = 0.0;
	var retIm = 0.0;
	
	var l = this.curTimeState.length;

	for (var i=0; i < l; i++) {
		var curStateVector = this.curTimeState[i];
		var curScalar = curStateVector.comps[rowIndex];
		retReal += curScalar.real;
		retIm += curScalar.imaginary;
	}
	//var ret = [retReal, retIm]
	var ret = new ComplexScalar(retReal, retIm);
	return ret;
	/*
	var ret = 0.0;
	var l = this.curTimeState.length;
	for (var i=0; i < l; i++) {
		ret += this.curTimeState[i][rowIndex];
	}
	return ret;
	*/
}
Universe.prototype.getCoordinates = function(particleNum) {
	//var ret = [];
	var timeEvolution = this.sumAcross(particleNum);
	return [timeEvolution.real, timeEvolution.imaginary];
	//var initial = this.initialState.comps[particleNum];
	//return [timeEvolution.real + initial.real, timeEvolution.imaginary + initial.imaginary];
	/*
	var ret = [];
	var startIndex = particleNum*this.phaseSpaceDimension;
	for (var i=0; i < this.phaseSpaceDimension; i++) {
		var next = this.sumAcross(i + startIndex);

		if (next === NaN)
			debugger;
		ret.push(next);

	}

	return ret;
	*/
}