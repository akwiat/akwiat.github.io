
function UnitarityGraphics(unitarityClient) {
	var InternalGameSize = 6.7;
	var ParticleWidth = .07;
	/*
	var ShipWidth = 25;
	var ShipAspect = 2;
	var ShipFrontAspect = .5;

	var BulletWidth = 20;
	var BulletAspect = 1;
	*/
	this.size = Math.min(window.innerWidth, window.innerHeight);
	this.ratio = this.size/InternalGameSize;
	var GraphicsRatio = this.ratio;
	var GraphicsSize = this.size;
	
	Crafty.sprite("circle3.png", {particlecircle:[0,0,50,50]})

	//var PlayersSupported = 2;
	var convertToGameCoord = function(graphicsCoordX, graphicsCoordY) {
		var ret = {};
		ret.x = graphicsCoordX/GraphicsRatio;
		ret.y = (GraphicsSize - graphicsCoordY)/GraphicsRatio;
		return ret;
	}
	var convertToGraphicsCoord = function(gameCoordX, gameCoordY) {
		var ret = {};
		//gameCoordX = -1.5;
		//gameCoordY = 1.5;
		gameCoordX -= ParticleWidth/2;
		gameCoordY += ParticleWidth/2;
		ret.x = gameCoordX * GraphicsRatio + GraphicsSize/2;
		ret.y = (InternalGameSize/2 - gameCoordY) * GraphicsRatio;

		//ret.x -= ParticleWidth/2*GraphicsRatio;
		//ret.y
		return ret;
		//return {1,1}
	}

	//var stageElem
	Crafty.init(this.size, this.size, document.getElementById('game'));
	Crafty.background('#DFDFDF');
	
	Crafty.c("Particle", {
		required: "2D, Canvas, Color, particlecircle",
		setUniverse: function(universe) {
			this.universe = universe;
			return this;
		},
		setParticleNum: function(num) {
			this.particleNum = num;
			return this;
		},
		events: { 
			"UpdateFromUniverse": function() {
				var params = this.universe.getCoordinates(this.particleNum);
				var attrObj = convertToGraphicsCoord(params[0], params[1]);
				this.attr(attrObj);
				//debugger;
			}
		},
		init: function() {
			this.color("black");
			this.origin("center");
			//this.origin(10,10);
			this.w = ParticleWidth * GraphicsRatio;
			this.h = this.w;
			//this.x = 100;
			//this.y = 100;
		}
	});
	Crafty.bind("EnterFrame", function() {
		this.updateUniverse();
		Crafty.trigger("UpdateFromUniverse");
		//debugger;
	}.bind(unitarityClient));

      //Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 200}).color('#F00');
}
UnitarityGraphics.prototype.addScalar = function(universe, particleNumber) {
	var obj = Crafty.e("Particle").setUniverse(universe).setParticleNum(particleNumber);
	/*
	if (particleNumber == 0 && !this.nomorereds) {
		obj.color("red");
		this.nomorereds = true;
	}
	*/
	//debugger;
	return obj;
}
UnitarityGraphics.prototype.removeObj = function(obj) {
	obj.destroy();
}
UnitarityGraphics.prototype.resetRed = function() {
	this.nomorereds = undefined;
}
