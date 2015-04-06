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
    }
    
    var bkg;
    var player;
    var music;
    var cursors;
    var music;
    
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
    }
    
    function update() {
        //game.physics.arcade.collide(player, platforms);
        player.body.velocity.x=0;
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
            //player.animations.play('left');
        }else if (cursors.right.isDown){
            player.body.velocity.x = 250;
            //player.animations.play('right');
        }
    }
};
