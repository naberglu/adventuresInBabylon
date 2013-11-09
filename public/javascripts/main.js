window.onload = function(){
    var canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);
	
	// Load the main menu first
	loadScene(engine, 0);
	scene.executeWhenReady(function () {
            // Once the scene is loaded, just register a render loop to render it
            engine.runRenderLoop(function () {
		scene.render();
            });

            // Resize event
            window.addEventListener("resize", function () {
		engine.resize();
		borderResize();
            });
        });	
    } 
};
