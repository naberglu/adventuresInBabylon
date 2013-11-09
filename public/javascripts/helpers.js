
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
    // Cleanup time
    if (scene) {
        scene.dispose();
        scene = null;
    }

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
