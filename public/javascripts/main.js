window.onload = function(){
    var canvas = document.getElementById("renderCanvas");
    var scene;

    // Set the size of the borders given the windows width/height

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);
	
	// Set the size of the borders given the windows width/height
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
	borderResize();
	// Load the main menu
        scene = gameplayScene(engine);
	scene.executeWhenReady(function () {

            // Once the scene is loaded, just register a render loop to render it
            engine.runRenderLoop(function () {
		scene.render();
            });

	    // Move the camera around when the user's mouse is near the edge
	    var interval = 10;
	    var speed = 10;
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
		borderResize();
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
