function borderResize() {
    var width = $(window).width();
    var height = $(window).height();
    // Set top and bottom height
    var percentage = 0.05;
    $('#topBorder').css('height',height * percentage);
    $('#bottomBorder').css('height',height * percentage);
    $('#leftBorder').css('width',width * percentage);
    $('#rightBorder').css('width',width * percentage);
};

function loadScene(engine, id) {
    var scene;
    // Load the specific scene
    switch(id) {
    case 0:
	scene = mainMenu(engine);
	break;
    case 1:
	scene = gameplayScene(engine);
	break;
    }

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
};

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
    } 
};
