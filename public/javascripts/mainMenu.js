function mainMenu(engine) {
    //Creation of the scene 
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = [0,0,0];
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 3, 410, new BABYLON.Vector3(0, 0, 0), scene);

    // Add click event to handle clicking options
    $(window).on('click', function(event) {
	var pickResult = scene.pick(event.clientX, event.clientY);
	console.log(pickResult);
	loadScene(engine, 1);
    });

    return scene;
}
