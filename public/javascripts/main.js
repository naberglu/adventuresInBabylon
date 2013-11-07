
window.onload = function(){
    var canvas = document.getElementById("renderCanvas");
    var scene;

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);

	// Load the main menu
        scene = gameplayScene(engine);
	scene.executeWhenReady(function () {

            // Once the scene is loaded, just register a render loop to render it
            engine.runRenderLoop(function () {
		scene.render();
            });

	    // Move the camera around when the user's mouse is near the edge
	    var interval = 10;
	    var speed = 15;
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


            // Resize event
            window.addEventListener("resize", function () {
		engine.resize();
            });
        });
	
	/*
        // Load the gameplay scene
        scene = gameplayScene(engine);
	scene.executeWhenReady(function () {
            scene.activeCamera.attachControl(canvas);
            // Once the scene is loaded, just register a render loop to render it
            engine.runRenderLoop(function () {
		scene.render();
            });
            // Resize
            window.addEventListener("resize", function () {
		engine.resize();
            });
        });*/
    } 
};
