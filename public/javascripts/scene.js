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
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0,0,5), scene);

    // Add some objects
    var sun = BABYLON.Mesh.CreateSphere("sun", 10.0, 3.0, scene);
    var planet1 = BABYLON.Mesh.CreateSphere("planet1", 10.0, 3.0, scene);
    var planet2 = BABYLON.Mesh.CreateSphere("planet2", 10.0, 3.0, scene);
    var planet3 = BABYLON.Mesh.CreateSphere("planet3", 10.0, 3.0, scene);

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

    // Change the position
    planet1.position = new BABYLON.Vector3(10,0,0);
    planet2.position = new BABYLON.Vector3(30,0,0);
    planet3.position = new BABYLON.Vector3(60,0,0);
    sun.position = new BABYLON.Vector3(0,0,0);


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
    var rotatePlanet = new BABYLON.Animation(
	"rotatePlanet",
	"rotation.y",
	30,
	BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
    
    var keys = [];

    //At the animation key 0, the value of scaling is "1"
    keys.push({
	frame: 0,
	value: 1
    });

    keys.push({
	frame: 200,
	value: 5
    });

    rotatePlanet.setKeys(keys);
    sun.animations.push(rotatePlanet);
//    planet2.animations.push(rotatePlanet);
 //   planet3.animations.push(rotatePlanet);

    scene.beginAnimation(sun, 0, 100, true);
//    scene.beginAnimation(planet2, 0, 100, true);
//    scene.beginAnimation(planet3, 0, 100, true);
    return scene;
}
