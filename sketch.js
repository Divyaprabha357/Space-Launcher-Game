var wall1, wall2, earth1
var gameState='Start'
var chance=3
var score=0
var planet3
function preload(){
	space= loadImage("Images/SpaceBg.jpg");
	white= loadImage("Images/white.jpg");
	earth = loadImage("Images/earth.png")
	rocket_img = loadImage("Images/rocket.png")

	asteriodImg=loadImage("Images/Asteriod.png")
	starImg=loadImage("Images/star.jpg")

	retryImg= loadImage("Images/retry.png")
	youWinImg=loadImage("Images/You Win.png")
	youLoseImg= loadImage("Images/You Lose.png")
}

function setup(){
	canvas = createCanvas(1530, 715)

	ground = createSprite(715,307.5);
	ground.addImage("ground",space);




	planet= createSprite(740, 700, 1530, 200)
	planet.addImage(earth)
	planet.scale= 7

	rocket= createSprite(715, 550, 200, 200)
	rocket.addImage(rocket_img)
	rocket.scale =0.4

	wall1= createSprite(140,350.80)
	wall1.addImage(white)
	wall1.scale=1.4

	wall2= createSprite(1400,350.80)
	wall2.addImage(white)
	wall2.scale=1.4

	asteriodGroup= new Group();
	starGroup= new Group();



	retry=createSprite(750, 315)
	retry.addImage(retryImg)
	retry.scale=0.4
	retry.visible=false

	youWin=createSprite(750, 230)
	youWin.addImage(youWinImg)	
	youWin.visible=false

	youLose=createSprite(750, 230)
	youLose.addImage(youLoseImg)
	youLose.visible=false
	
}
function draw(){
	drawSprites();	
	rocket.collide(wall1)
	rocket.collide(wall2)

	if(gameState==='Start'){

		planet.visible= true
		youLose.visible=false
		youWin.visible=false
	
		

		if(keyDown("space")){
			gameState='Play'
		}
	}

	

	if(gameState==='Play'){
		score = score + Math.round(getFrameRate()/60);
		planet.visible= false
		rocket.y=500
		ground.velocityY=4


		if (ground.y >715){
			ground.y = 307.5
		
		  }
		if(keyDown(RIGHT_ARROW)){
			rocket.x=rocket.x+20

		}
		if(keyDown(LEFT_ARROW)){
			rocket.x=rocket.x-20

		}
		SpawnAsteriod();
		SpawnStars();

		if(asteriodGroup.isTouching(rocket)){
			asteriodGroup.destroyEach();
			chance= chance-1
		}
		if(starGroup.isTouching(rocket)&&chance<5){
			starGroup.destroyEach();
			chance= chance+1
		}
        if(chance===0){
			gameState='End'
		}
		if(score===3000){
			gameState='End'
		}
	}

	if(gameState==='End'&&chance===0){
        ground.velocityY=0	
		retry.visible=true;
		youLose.visible=true


		if(mousePressedOver(retry)) {
			reset();
		  
		}
	}

	if(gameState===	'End'&&score===3000){
        ground.velocityY=0
		retry.visible=true;
		youWin.visible=true
	}

	textSize(24)
	//text(mouseX + "," + mouseY,10, 45)
	textSize(30)
	fill("Yellow");
	stroke("Yellow")
	text("Life Remaining : "+chance,900, 40)
	text("Distance Covered : "+score+' Light Years',370, 40)

	textSize(40)
	fill("black")
	stroke("black")
	text('*Instructions*', 40, 51);
	text('*Instructions*', 1275, 51);

	fill("Black")
	stroke("lightblue")
	textSize(24)

	text("~Use the right and left", 20, 100)
	text("arrow keys to move", 20, 130)
	text("the rocket.", 20, 160)

	text("~Use the space key to", 20, 210)
	text("start the game.", 20, 240)

	text("~To restart the game", 20, 290)
	text("press Ctrl + R", 20, 320)

	text("~To reach Destination",20, 370)
	text("you have to dodge the", 20,400 )
	text("asteriods.", 20, 430 )

	text("~Every time you hit a  ",1250, 100)
	text("asteriod you lose one",1250,130)
	text("life.", 1250, 160 )

	text("~You need to collect the ",1250, 210)
	text("golden stars to increase", 1250, 240 )
	text("life.", 1250, 270 )	

	text("~Cover 3000 LightYears  ",1250, 320)
	text("to win the game.", 1250, 350 )

	text("~If you lose all your life ",1250, 400)
	text(" you lose.", 1250, 430 )

	text("~~~ALL  THE  BEST~~~", 13, 600)
    text("~~~ALL  THE  BEST~~~", 1250, 600)




}
function SpawnAsteriod(){
	if(frameCount%200 === 0){
		var asteriod = createSprite(600,0,40,10);
		asteriod .x = Math.round(random(350,1110));
		asteriod .addImage(asteriodImg);
		asteriod .scale = 0.25;
		asteriod .velocityY = 9;

		asteriod.lifeTime=1400
		asteriodGroup.add(asteriod);

		
	}
}
function SpawnStars(){
	if(frameCount%1136 === 0){
		var star = createSprite(600,0,40,10);
		star.x = Math.round(random(450,1050));
		star.addImage(starImg);
		star.scale = 0.1;
		star.velocityY = 2.9;
		
		star.lifeTime=1400
		starGroup.add(star);

		
	}
}
