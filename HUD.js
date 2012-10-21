function HUD() {

    this.self = this;
    this.healthBar, this.healthBarBackground, this.healthBarHeader;
    this.manaBar, this.manaBarBackground, this.manaBarHeader;
    this.healthManaBackground, this.statBackground;
    this.gameTimer;
    this.star, this.starCount;
    this.coin, this.coinCount;

    //Health Mana Background
    healthManaBackground = new CL3D.Overlay2DSceneNode(engine);
    scene.getRootSceneNode().addChild(healthManaBackground);
    healthManaBackground.set2DPosition(0, 0, 165, 120);
    healthManaBackground.setShowBackgroundColor(true, CL3D.createColor(75, 255, 255, 255));

    //Stat Background
    statBackground = new CL3D.Overlay2DSceneNode(engine);
    scene.getRootSceneNode().addChild(statBackground);
    statBackground.set2DPosition(screenWidth - 100, 0, 100, 130);
    statBackground.setShowBackgroundColor(true, CL3D.createColor(75, 255, 255, 255));

    //Health Bar 
    healthBarBackground = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(healthBarBackground);
	healthBarBackground.set2DPosition(5, 25, 155, 30);
	healthBarBackground.setShowBackgroundColor(true, CL3D.createColor(150, 0, 0, 0));

	healthBarHeader = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(healthBarHeader);
	healthBarHeader.set2DPosition(5, 5, 150, 20);
	healthBarHeader.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	healthBarHeader.FontName = "12;default;arial;normal;bold;true";
	healthBarHeader.setText("Health");

	healthBar = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(healthBar);
	healthBar.set2DPosition(7.5, 27.5, 150, 25);
	healthBar.setShowBackgroundColor(true, CL3D.createColor(150, 255, 25, 25));

    //Mana Bar
	manaBarBackground = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(manaBarBackground);
	manaBarBackground.set2DPosition(5, 85, 155, 30);
	manaBarBackground.setShowBackgroundColor(true, CL3D.createColor(150, 0, 0, 0));

	manaBarHeader = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(manaBarHeader);
	manaBarHeader.set2DPosition(5, 60, 150, 20);
	manaBarHeader.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	manaBarHeader.FontName = "12;default;arial;normal;bold;true";
	manaBarHeader.setText("Mana");

	manaBar = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(manaBar);
	manaBar.set2DPosition(7.5, 87.5, 150, 25);
	manaBar.setShowBackgroundColor(true, CL3D.createColor(150, 25, 25, 255));

    //Timer
	gameTimer = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(gameTimer);
	gameTimer.set2DPosition(screenWidth - 100, 5, 95, 20);
	gameTimer.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	gameTimer.FontName = "24;default;arial;normal;bold;true";
	gameTimer.setText("00:00");

	//Star 
	star = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(star);
	star.set2DPosition(screenWidth - 45, 40, 40, 40);
	star.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	star.setShowImage(engine.getTextureManager().getTexture("star.png", true));

	starCount = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(starCount);
	starCount.set2DPosition(screenWidth - 80, 50, 25, 20);
	starCount.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	starCount.FontName = "24;default;arial;normal;bold;true";
	starCount.setText("0");

	//Coin 
	coin = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(coin);
	coin.set2DPosition(screenWidth - 45, 85, 40, 40);
	coin.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	coin.setShowImage(engine.getTextureManager().getTexture("coins.png", true));

	coinCount = new CL3D.Overlay2DSceneNode(engine);
	scene.getRootSceneNode().addChild(coinCount);
	coinCount.set2DPosition(screenWidth - 80, 95, 25, 20);
	coinCount.setShowBackgroundColor(true, CL3D.createColor(0, 0, 0, 0));
	coinCount.FontName = "24;default;arial;normal;bold;true";
	coinCount.setText("0");


	this.update = function () {
	    self.healthBar.set2DPosition(7.5, 27.5, (player.health * 1.5), 25);
	    self.manaBar.set2DPosition(7.5, 87.5, (player.mana * 1.5), 25);
	    self.coinCount.setText(player.coins + "");
	    self.starCount.setText(player.stars + "");
	    var convertTime = worldTimer / 1000;
	    convertTime = Math.floor(convertTime);
	    var timeToDisplay;
	    if (convertTime < 10) {
	        timeToDisplay = "0" + convertTime;
	    } else {
	        timeToDisplay = "" + convertTime;
	    } 
        
	    self.gameTimer.setText(timeToDisplay + "");
	}
}
