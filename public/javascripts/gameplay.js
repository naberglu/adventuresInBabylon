function gameplayScene(engine) {
    //Creation of the scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = [0,0,0];

    // Unbind the click event for the main menu
    $(window).off('click');

    var bounds = 1000;
    var starfield = new BABYLON.ParticleSystem("particles", 2000, scene);
    starfield.particleTexture = new BABYLON.Texture("/images/star.png", scene);
    starfield.minSize = 0.8;
    starfield.maxSize = 1.0;
    starfield.minLifeTime = 1.0;
    starfield.maxLifeTime = 2.0;
    starfield.minEmitPower = 4.0;
    starfield.maxEmitPower = 4.0;
    starfield.emitRate = 2000;
    starfield.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    starfield.minEmitBox = new BABYLON.Vector3((-1) * bounds, 0, (-1) * bounds);
    starfield.maxEmitBox = new BABYLON.Vector3(bounds, 0, bounds);
    starfield.direction1 = new BABYLON.Vector3(0, 0, 0);
    starfield.direction2 = new BABYLON.Vector3(0, 0, 0);
    starfield.emitter = new BABYLON.Vector3(0, -2, 0);
    starfield.start();

    //Adding of the Camera
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 3, 410, new BABYLON.Vector3(0, 0, 0), scene);
    camera.lowerRadiusLimit = 70;
    camera.upperRadiusLimit = 500;

    // Let there be light
    var hlight0 = new BABYLON.HemisphericLight("Hlight0", new BABYLON.Vector3(0, 50, 0), scene);
    // Sky color
    hlight0.diffuse = new BABYLON.Color3(1, 1, 1);
    // Spot of light that apppears on objects
    hlight0.specular = new BABYLON.Color3(1, 0, 0);
    // Ground color
    hlight0.groundColor = new BABYLON.Color3(0, 0, 0);
    hlight0.intensity = 0.2;

    var light0 = new BABYLON.PointLight("light0", new BABYLON.Vector3(0, -0, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 0);
    light0.specular = new BABYLON.Color3(1, 1, 0);
    light0.intensity = 1;

    // Create the ether
    var ether = BABYLON.Mesh.CreatePlane("ether", 2 * bounds, scene);
    ether.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI, 0);

    // Add some planets
    var planet1Radius = 10.0;
    var sun = BABYLON.Mesh.CreateSphere("sun", 20.0, 60.0, scene);
    var planet1 = BABYLON.Mesh.CreateSphere("planet1", 20.0, planet1Radius, scene);
    var planet2 = BABYLON.Mesh.CreateSphere("planet2", 20.0, 15.0, scene);
    var planet3 = BABYLON.Mesh.CreateSphere("planet3", 20.0, 20.0, scene);
    var moon1 = BABYLON.Mesh.CreateSphere("moon1", 20.0, 2.0, scene);
    // Load the ships
    BABYLON.SceneLoader.ImportMesh("", "/scenes/", "ship1.babylon", scene, function (newMeshes, particleSystems) {
	var materialShip = new BABYLON.StandardMaterial("ship", scene);
	materialShip.diffuseColor = new BABYLON.Color3(1, 0, 0);
	newMeshes[0].material = materialShip;
    });


    // Change the position
    var planet1Position = 50;
    var planet2Position = 100;
    var planet3Position = 150;
    var moon1Position = planet1Position - 10;
    sun.position = new BABYLON.Vector3(0,0,0);
    planet1.position = new BABYLON.Vector3(planet1Position,0,0);
    planet2.position = new BABYLON.Vector3(planet2Position,0,0);
    planet3.position = new BABYLON.Vector3(planet3Position,0,0);
    moon1.position = new BABYLON.Vector3(moon1Position,0,0);

    // Create new materials
    var materialSun = new BABYLON.StandardMaterial("sun", scene);
    var materialGas1 = new BABYLON.StandardMaterial("gas1", scene);
    var materialPlanet2 = new BABYLON.StandardMaterial("planet2", scene);
    var materialPlanet3 = new BABYLON.StandardMaterial("planet3", scene);


    materialSun.diffuseTexture = new BABYLON.Texture("/images/sun.png", scene);
    materialGas1.diffuseTexture = new BABYLON.Texture("/images/gas1.png", scene);
    materialPlanet2.diffuseTexture = new BABYLON.Texture("/images/planet2.png", scene);
    materialPlanet3.diffuseTexture = new BABYLON.Texture("/images/planet3.png", scene);
    materialSun.ambientColor = new BABYLON.Color3(1, 1, 0);
    materialSun.emissiveColor = new BABYLON.Color3(1, 1, 0);
    materialSun.specularPower = 5000;

    // Put the materials on the meshes
    sun.material = materialSun;
    planet1.material = materialGas1;
    planet2.material = materialPlanet2;
    planet3.material = materialPlanet3;

    // Ether material
    var materialEther = new BABYLON.StandardMaterial("ether", scene);
    materialEther.alpha = 0.0;
    ether.material = materialEther;

    var angle = 0.0;
    var speedy = 0.0;
    var sunRotationSpeed = 0.01;
    var planet1RotationSpeed = 0.03;
    var planet2RotationSpeed = 0.05;
    var planet3RotationSpeed = 0.07;
    function rotatePlanets() {
	sun.rotation.y -= sunRotationSpeed;

        // Planet 1 orbit
	planet1.position = new BABYLON.Vector3(planet1Position * Math.cos(angle), 
					       (planet1Position * 0.18) * Math.cos(angle),
					       planet1Position * Math.sin(angle));
	planet1.rotation.y += planet1RotationSpeed;

	// Moon 1 orbit
	moon1.position = new BABYLON.Vector3(planet1.position.x + (planet1Position - moon1Position) * Math.cos(speedy),
					     planet1.position.y,
					     planet1.position.z + (planet1Position - moon1Position) * Math.sin(speedy));

	// Planet 2 orbit
	planet2.position = new BABYLON.Vector3((planet2Position * 2) * Math.cos(angle) + 100, 
					       planet2.position.y, 
					       planet2Position * Math.sin(angle));
	planet2.rotation.y += planet2RotationSpeed;

	// Planet 3 orbit
	planet3.position = new BABYLON.Vector3((planet3Position * 1.8412451651) * Math.cos(angle),
					       planet3.position.y,
					       planet3Position * Math.sin(angle));
	planet3.rotation.y += planet3RotationSpeed;

	angle += 0.01;
	speedy += 0.1;
    }

    function limitCamera(camera) {
	if (camera.target.x > bounds) {
	    camera.target.x = bounds;
	} else if (camera.target.x < ((-1) * bounds)) {
	    camera.target.x = (-1) * bounds;
	}

	if (camera.target.z > bounds) {
	    camera.target.z = bounds;
	} else if (camera.target.z < ((-1) * bounds)) {
	    camera.target.z = (-1) * bounds;
	}
    }

    scene.beforeRender = function() {
	rotatePlanets();
	limitCamera(camera);
    };

    // Move the camera around when the user's mouse is near the edge
    var interval = 1;
    var speed = 5;
    $('#topBorder').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.z -= speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });

    $('#bottomBorder').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.z += speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });

    $('#leftBorder').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.x += speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });

    $('#rightBorder').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.x -= speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });


    $('#trDiag').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.z -= speed;
	    scene.activeCamera.target.x -= speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });
    $('#tlDiag').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.z -= speed;
	    scene.activeCamera.target.x += speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });
    $('#blDiag').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.z += speed;
	    scene.activeCamera.target.x += speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });
    $('#brDiag').on('mouseenter', function() {
	this.iid = setInterval(function() {
	    scene.activeCamera.target.z += speed;
	    scene.activeCamera.target.x -= speed;
	}, interval);
    }).on('mouseleave', function(){
	this.iid && clearInterval(this.iid);
    });

    // Add right mouse button event
    $('canvas').mousedown(function(event) {
	switch(event.which) {
	    case 3:
	        event.preventDefault();
	    	var pickResult = scene.pick(event.clientX, event.clientY);
	        if (pickResult.hit && pickResult.pickedMesh.id === "ether") {
		    var ship = scene.getMeshByID("ship");
		    var point = pickResult.pickedPoint;
		    var deltaZ = ship.position.z - point.z;
		    var deltaX = ship.position.x - point.x;

		    var angle = Math.atan2(deltaX,deltaZ);
		    ship.rotation.y = angle + (3 * Math.PI) / 2;

		    var jump = 2;
		    var dv = point.subtract(ship.position);
		    var mag = dv.length();
		    dv.x = (dv.x / mag) * jump;
		    dv.y = (dv.y / mag) * jump;
		    dv.z = (dv.z / mag) * jump;

		    scene.beforeRender = function() {
			rotatePlanets();
			limitCamera(camera);
			if (Math.abs(ship.position.x - point.x) > jump || (Math.abs(ship.position.z - point.z) > jump)) {
			    ship.position = ship.position.add(dv);
			}
		    }
		}
	        break;
	}
    });

    // Scroll the camera in and out
    $('canvas').on('mousewheel', function(event, delta, deltaX, deltaY) {
	scene.activeCamera.radius -= 10 * delta;
    });

    // Set the size of the borders given the windows width/height
    borderResize();

    return scene;
}
