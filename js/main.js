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
        game.load.image('bullet','assets/bullet2.png');
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
    var firebutton;
    var bulletTime=0;
    var speed=80;
    var timer;
    var score=0;
    
    function create() {
        music=game.add.audio('bks');
        music.play('',0,0.5,true);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        bkg=game.add.sprite(0,0,'bkg');

        player = game.add.sprite(0, game.world.height-90, 'ship');
        game.physics.arcade.enable(player);  
        player.body.collideWorldBounds = true;

        cursors = game.input.keyboard.createCursorKeys();
        firebutton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

        spawn();

        timer = game.time.create(false);
        timer.loop(1500,spawn,this);
        timer.start();
    }

    function update(){
        game.physics.arcade.overlap(bullets, redntl, kill, null, this);
        game.physics.arcade.overlap(bullets, whitentl, kill, null, this);
        game.physics.arcade.overlap(bullets, blackenemy, kill, null, this);
        player.body.velocity.x=0;
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
        }else if (cursors.right.isDown){
            player.body.velocity.x = 250;
        }
        if (firebutton.isDown){
            fire();
        }
        redntl.forEachAlive(function(enemy){enemy.body.velocity.y=speed;},this);
        whitentl.forEachAlive(function(enemy){enemy.body.velocity.y=speed;},this);
        blackenemy.forEachAlive(function(enemy){enemy.body.velocity.y=speed;},this);
    }

    function kill(b,e){
        b.kill()
        e.kill()
        timer.stop();
        redntl.forEachAlive(function(enemy){enemy.kill();},this);
        whitentl.forEachAlive(function(enemy){enemy.kill();},this);
        blackenemy.forEachAlive(function(enemy){enemy.kill();},this);
        game.input.disabled=true;
        game.add.text(50,350, 'Game\nOver\nScore: '+score, { fontSize: '64px', fill: '#FFFFFF' });
        //score+=10;
    }

    function fire(){
        if (game.time.now > bulletTime){
            var bullet = bullets.getFirstExists(false);
            if (bullet){
                bullet.reset(player.x+25, player.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    }

    function spawn(){
        var sp = game.rnd.integerInRange(0,100);
        if(sp>=0 && sp<=33){
            spawn1();
        }else if(sp>=34 && sp<=66){
            spawn2();
        }else if(sp>=67 && sp<=100){
            spawn3();
        }
    }

    function spawn1(){
        redntl.create(game.rnd.integerInRange(50,150),game.rnd.integerInRange(0,50),'rbc');
    }  

    function spawn2(){
        whitentl.create(game.rnd.integerInRange(50,150),game.rnd.integerInRange(0,50),'wbc');
    }

    function spawn3(){
        blackenemy.create(game.rnd.integerInRange(50,150),game.rnd.integerInRange(0,50),'bbc');
    }

};
