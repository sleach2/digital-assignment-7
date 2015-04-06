window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 205, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image('bkg','assets/veins4.png');
        game.load.image('ship', 'assets/ship2.png');
        game.load.image('bbc', 'assets/blackcell.png');
        game.load.image('rbc', 'assets/redcell.png');
        game.load.audio('bks','assets/eerie.mp3');
        game.load.image('wbc', 'assets/whitecell.png');
        game.load.image('bullet','assets/bullet.png');
    }
    
    var bkg;
    var player;
    var music;
    var cursors;
    var music;
    var redntl;
    var whitentl;
    var blackenemy;
    var bullets;
    
    function create() {
        music=game.add.audio('bks');
        music.play('',0,0.5,true);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        bkg=game.add.sprite(0,0,'bkg');
        game.add.sprite(0,0,'bbc');
        game.add.sprite(0,100,'rbc');
        game.add.sprite(0,200,'wbc');

        player = game.add.sprite(0, game.world.height-90, 'ship');
        game.physics.arcade.enable(player);  
        player.body.collideWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        redntl=game.add.group();
        redntl.enableBody=true;
        redntl.setAll('outOfBoundsKill', true);
        redntl.setAll('checkWorldBounds', true);

        whitentl=game.add.group();
        whitentl.enableBody=true;
        whitentl.setAll('outOfBoundsKill', true);
        whitentl.setAll('checkWorldBounds', true);

        blackenemy=game.add.group();
        blackenemy.enableBody=true;
        blackenemy.setAll('outOfBoundsKill', true);
        blackenemy.setAll('checkWorldBounds', true);
    }




    /*for(var i=0; i<20; i++){
            var man = enemies.create(game.rnd.integerInRange(500,game.world.width),game.rnd.integerInRange(0,game.world.height-150),'man');
            man.body.gravity.y=350;
            man.animations.add('l',[0,1,2],10,true);
            man.animations.add('r',[4,5,6],10,true);
            man.frame=3;
            man.body.collideWorldBounds=true;
        }*/



    
    function update() {
        //game.physics.arcade.collide(player, platforms);
        player.body.velocity.x=0;

        if (cursors.left.isDown){
            player.body.velocity.x = -250;
        }else if (cursors.right.isDown){
            player.body.velocity.x = 250;
        }
        if (game.input.activePointer.isDown){
            fire();
        }
    }

    function fire () {
        if (game.time.now > nextFire && bullets.countDead() > 0){
            nextFire = game.time.now + fireRate;
            var bullet = bullets.getFirstExists(false);
            bullet.reset(player.x, player.y);
            bullet.body.velocity.y=-100
        }
    }
};
