
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
		required: "2D, Canvas, Color",
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
	
	Crafty.c("BackgroundStars", {
		required: "2D, Canvas, Color"
		,init:function() {
			var numStars = 30;
			var starSize = 0.01*GraphicsRatio;
			var gameSize = InternalGameSize;
			
			for (var i=0; i < numStars; i++) {
				var x = Math.random()*gameSize - gameSize/2;
				var y = Math.random()*gameSize - gameSize/2;
				x = 0; y = 0;
				var nEnt = Crafty.e("2D, Canvas, Color");
				nEnt.color("#F2F2F1");
				nEnt.w = starSize;
				nEnt.h = nEnt.w;
				var attrObj = convertToGraphicsCoord(x, y);
				this.attr(attrObj);
				//graphicsObj.setEntityGraphicsCoords(nEnt, x, y);
				this.attach(nEnt);
			}
		}
	});
	Crafty.background('#081848');
	Crafty.e("BackgroundStars");
	Crafty.bind("EnterFrame", function() {
		this.updateUniverse();
		Crafty.trigger("UpdateFromUniverse");
		//debugger;
	}.bind(unitarityClient));

      //Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 200}).color('#F00');
}
UnitarityGraphics.prototype.addScalar = function(universe, particleNumber) {
	var obj = Crafty.e("Particle").setUniverse(universe).setParticleNum(particleNumber);
	if (particleNumber == 0 && !this.nomorereds) {
		obj.color("red");
		this.nomorereds = true;
	}
	//debugger;
	return obj;
}
UnitarityGraphics.prototype.removeObj = function(obj) {
	obj.destroy();
}
UnitarityGraphics.prototype.resetRed = function() {
	this.nomorereds = undefined;
}
