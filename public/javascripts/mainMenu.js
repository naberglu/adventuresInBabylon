function mainMenu(engine) {
    //Creation of the scene 
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = [0,0,0];
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
    var singlePlayer = BABYLON.Mesh.CreateBox("singlePlayer", 1.0, scene);
    var multiPlayer = BABYLON.Mesh.CreateBox("multiPlayer", 1.0, scene);
    var settings = BABYLON.Mesh.CreateBox("settings", 1.0, scene);
    var credits = BABYLON.Mesh.CreateBox("credits", 1.0, scene);

    var titleDimensions = new BABYLON.Vector3(5, 0.0001, 50);
    title.position.x = -14;
    title.scaling = titleDimensions;

    var dimensions = new BABYLON.Vector3(4, 0.00001, 30);
    singlePlayer.position.x = -4;
    singlePlayer.scaling = dimensions;

    multiPlayer.position.x = 2;
    multiPlayer.scaling = dimensions;

    settings.position.x = 8;
    settings.scaling = dimensions

    credits.position.x = 14;
    credits.scaling = dimensions

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
