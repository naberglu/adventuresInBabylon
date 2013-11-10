function gameplayScene(engine) {
    //Creation of the scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = [0,0,0];

    // Unbind the click event for the main menu
    $(window).off('click');

    var starfield = new BABYLON.ParticleSystem("particles", 1000, scene);
    starfield.particleTexture = new BABYLON.Texture("/images/star.png", scene);
    starfield.minAngularSpeed = -4.5;
    starfield.maxAngularSpeed = 4.5;
    starfield.minSize = 0.5;
    starfield.maxSize = 0.7;
    starfield.minLifeTime = 1.0;
    starfield.maxLifeTime = 2.0;
    starfield.minEmitPower = 0.5;
    starfield.maxEmitPower = 2.0;
    starfield.emitRate = 10000;
    starfield.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    starfield.minEmitBox = new BABYLON.Vector3(-250, -250, -250);
    starfield.maxEmitBox = new BABYLON.Vector3(250, 250, 250);
    starfield.direction1 = new BABYLON.Vector3(0, 0, 0);
    starfield.direction2 = new BABYLON.Vector3(0, 0, 0);
    starfield.color1 = new BABYLON.Color4(1, 1, 1, 1);
    starfield.color2 = new BABYLON.Color4(1, 1, 1, 1);
    starfield.gravity = new BABYLON.Vector3(0, 0, 0);
    starfield.emitter = new BABYLON.Vector3(0, -2, 0);
    starfield.start();

    //Adding of the Camera
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 3, 410, new BABYLON.Vector3(0, 0, 0), scene);

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

    // Add some planets
    var planet1Radius = 10.0;
    var sun = BABYLON.Mesh.CreateSphere("sun", 20.0, 60.0, scene);
    var planet1 = BABYLON.Mesh.CreateSphere("planet1", 20.0, planet1Radius, scene);
    var planet2 = BABYLON.Mesh.CreateSphere("planet2", 20.0, 15.0, scene);
    var planet3 = BABYLON.Mesh.CreateSphere("planet3", 20.0, 20.0, scene);
    var moon1 = BABYLON.Mesh.CreateSphere("moon1", 20.0, 2.0, scene);
    // Load the ships
    BABYLON.SceneLoader.ImportMesh("", "/scenes/", "ship1.babylon", scene, function (newMeshes, particleSystems) {
	newMeshes[0].position = new BABYLON.Vector3(80, 80, 0);
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

     // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0);
    shadowGenerator.getShadowMap().renderList.push(moon1);
    planet1.receiveShadows = true;
    
    var angle = 0.0;
    var speedy = 0.0;
    var sunRotationSpeed = 0.01;
    var planet1RotationSpeed = 0.03;
    var planet2RotationSpeed = 0.05;
    var planet3RotationSpeed = 0.07;
    scene.beforeRender = function() {
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

    // Set the size of the borders given the windows width/height
    borderResize();

    return scene;
}
