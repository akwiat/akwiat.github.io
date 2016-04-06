function ComplexScalar(real, im) {
	this.real = real || 0;
	this.imaginary = im || 0;
}
function StateVector(comps) {
	this.comps = comps || []
}
StateVector.prototype.addComponent = function(real, im) {
	this.comps.push(new ComplexScalar(real, im));
}
StateVector.prototype.getVectorSum = function(sv) {
	var ret = new StateVector();

	var l = this.comps.length;
	for (var i=0; i < l; i++) {
		var first = this.comps[i];
		var second = sv.comps[i];
		if (!second) debugger;
		ret.addComponent(first.real + second.real, first.imaginary + second.imaginary);
	}
	return ret;
}
function StationaryVector(comps, eval) {
	this.realComponents = comps || []; //real components
	this.eval = eval;
	//this.mag = mag;
}
StationaryVector.prototype.timeEvolve = function(time, initial) { //in seconds
	
	/*
	var cosTime = Math.cos(this.eval * time * 2 * Math.PI);
	var linTime = time * 2 * Math.PI * this.eval;
	var sinTime = Math.sin(this.eval * time * 2 * Math.PI);

	var time0 = Math.cos(this.eval[0] * time * 2 * Math.PI);
	var time1 = Math.sin(this.eval[1] * time * 2 * Math.PI);

	*/
	var initialTheta = initial.imaginary * 2 * Math.PI; //awful use of complex scalar obj, fix later
	var initialR = initial.real;
	var timeTheta = this.eval * time * 2 * Math.PI;


	var ret = new StateVector();

	var l = this.realComponents.length;
	for (var i=0; i < l; i++) {
		var c = this.realComponents[i];
		var tt = initialTheta + timeTheta;
		ret.addComponent(c * initialR * Math.cos(tt), c * initialR * Math.sin(tt));
		//ret.push(this.comps[i] * (time0 * this.mag[0] + time1 * this.mag[1] ));
		/*
		if ( i % 2 == 0 )
			ret.push(this.comps[i] * cosTime * this.mag);
		else
			ret.push(this.comps[i] * sinTime * this.mag);
		*/
	}
	//debugger;
	//var cartesian = convertToCartesian(ret);
	
	return ret;
}
