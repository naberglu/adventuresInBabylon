function mainMenu(engine) {
    //Creation of the scene 
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = [0,0,0];
    // Load the buttons
    BABYLON.SceneLoader.ImportMesh("", "/scenes/", "mainMenu.babylon", scene, function (newMeshes, particleSystems) {
	var materialSinglePlayer = new BABYLON.StandardMaterial("singlePlayer", scene);
	materialSinglePlayer.diffuseTexture = new BABYLON.Texture("/images/singlePlayer.png", scene);
	newMeshes[3].material = materialSinglePlayer;

	var materialMultiPlayer = new BABYLON.StandardMaterial("multiPlayer", scene);
	materialMultiPlayer.diffuseTexture = new BABYLON.Texture("/images/multiPlayer.png", scene);
	newMeshes[2].material = materialMultiPlayer;

	var materialSettings = new BABYLON.StandardMaterial("settings", scene);
	materialSettings.diffuseTexture = new BABYLON.Texture("/images/settings.png", scene);
	newMeshes[1].material = materialSettings;

	var materialCredits = new BABYLON.StandardMaterial("credits", scene);
	materialCredits.diffuseTexture = new BABYLON.Texture("/images/credits.png", scene);
	newMeshes[0].material = materialCredits;
    });

    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0.0, 0.0, 50, new BABYLON.Vector3(0, 0, 0), scene);

    // Let there be light
    var hlight0 = new BABYLON.HemisphericLight("Hlight0", new BABYLON.Vector3(0, 50, 0), scene);
    // Sky color
    hlight0.diffuse = new BABYLON.Color3(1, 1, 1);
    // Spot of light that apppears on objects
    hlight0.specular = new BABYLON.Color3(1, 0, 0);
    // Ground color
    hlight0.groundColor = new BABYLON.Color3(0, 0, 0);
    hlight0.intensity = 0.5;

    var title = BABYLON.Mesh.CreateBox("title", 1.0, scene);

    var titleDimensions = new BABYLON.Vector3(5, 0.0001, 50);
    title.position.x = -14;
    title.scaling = titleDimensions;

    // Add click event to handle clicking options
    $(window).on('click', function(event) {
	var pickResult = scene.pick(event.clientX, event.clientY);

	if (pickResult.hit) {
	    switch(pickResult.pickedMesh.id) {
		case "singlePlayer":
		    loadScene(engine, 1);
		    break;
		case "multiPlayer":
		case "settings":
		case "credits":
		    alert("Not implemented");
		    break;
	    }
	    
	}
	
    });

    return scene;
}
