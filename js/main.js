window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 400, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image('bkg','assets/veins3.png');
        game.load.image('ship', 'assets/ship.png');
    }
    
    var bkg;
    var player;
    var music;
    
    function create() {
        //music=game.add.audio('bks');
        //music.play('',0,0.5,true);

        //game.world.setBounds(0,0,2000,2000);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bkg=game.add.sprite(0,0,'bkg');

        player = game.add.sprite(0, game.world.height-130, 'player');
        game.physics.arcade.enable(player);  
        player.body.collideWorldBounds = true;
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
