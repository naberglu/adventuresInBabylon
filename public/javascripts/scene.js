function createSceneTuto(engine) {
    //Creation of the scene 
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = [0,0,0];
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
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, 0, 200, new BABYLON.Vector3(0, 0, 0), scene);

    // Let there be light
    var hlight0 = new BABYLON.HemisphericLight("Hlight0", new BABYLON.Vector3(0, 50, 0), scene);
    // Sky color
    hlight0.diffuse = new BABYLON.Color3(1, 1, 1);
    // Spot of light that apppears on objects
    hlight0.specular = new BABYLON.Color3(1, 0, 0);
    // Ground color
    hlight0.groundColor = new BABYLON.Color3(0, 0, 0);

    var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 0, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 0);
    light0.specular = new BABYLON.Color3(1, 1, 0);
    light0.intensity = 1;

    // Add some objects
    var planet1Radius = 10.0;
    var sun = BABYLON.Mesh.CreateSphere("sun", 20.0, 30.0, scene);
    var planet1 = BABYLON.Mesh.CreateSphere("planet1", 20.0, planet1Radius, scene);
    var planet2 = BABYLON.Mesh.CreateSphere("planet2", 20.0, 15.0, scene);
    var planet3 = BABYLON.Mesh.CreateSphere("planet3", 20.0, 20.0, scene);
    var moon1 = BABYLON.Mesh.CreateSphere("moon1", 20.0, 5.0, scene);

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

    // Animate the planets
    var rotateSun = new BABYLON.Animation(
	"rotateSun",
	"rotation.y",
	30,
	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    var rotatePlanet1 = new BABYLON.Animation(
	"rotatePlanet1",
	"rotation.y",
	30,
	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    var rotatePlanet2 = new BABYLON.Animation(
	"rotatePlanet2",
	"rotation.y",
	30,
	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    var rotatePlanet3 = new BABYLON.Animation(
	"rotatePlanet3",
	"rotation.y",
	30,
	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

    var sunKeys = [{frame: 0, value: 1}, {frame: 200, value: 1}];
    rotateSun.setKeys(sunKeys);
    sun.animations.push(rotateSun);
    scene.beginAnimation(sun, 0, 100, true);

    var planet1Keys = [{frame: 0, value: 1}, {frame: 200, value: 3}];
    rotatePlanet1.setKeys(planet1Keys);
    planet1.animations.push(rotatePlanet1);
    scene.beginAnimation(planet1, 0, 100, true);

    var angle = 0.0;
    var speedy = 0.0;
    scene.beforeRender = function() {
	planet1.position.x = planet1Position * Math.cos(angle);
	moon1.position.x = planet1.position.x + (planet1Position - moon1Position) * Math.cos(speedy);
	planet1.position.y = (planet1Position * 0.18) * Math.cos(angle);
	moon1.position.y = planet1.position.y;
	planet1.position.z = planet1Position * Math.sin(angle);
	moon1.position.z = planet1.position.z + (planet1Position - moon1Position) * Math.sin(speedy);
	angle += 0.01;
	speedy += 0.1;

	planet2.position.x = (planet2Position * 2) * Math.cos(angle) + 100;
	planet2.position.z = planet2Position * Math.sin(angle);

	planet3.position.x = (planet3Position * 1.8412451651) * Math.cos(angle);
	planet3.position.z = planet3Position * Math.sin(angle);
    };

    var planet2Keys = [{frame: 0, value: 1}, {frame: 200, value: 10}];
    rotatePlanet2.setKeys(planet2Keys);
    planet2.animations.push(rotatePlanet2);
    scene.beginAnimation(planet2, 0, 100, true);

    var planet3Keys = [{frame: 0, value: 1}, {frame: 200, value: 3}];
    rotatePlanet3.setKeys(planet3Keys);
    planet3.animations.push(rotatePlanet3);
    scene.beginAnimation(planet3, 0, 100, true);

    return scene;
}
