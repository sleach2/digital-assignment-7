window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 205, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image('bkg','assets/veins4.png');
        game.load.image('ship', 'assets/ship2.png');
    }
    
    var bkg;
    var player;
    var music;
    var cursors;
    
    function create() {
        //music=game.add.audio('bks');
        //music.play('',0,0.5,true);

        //game.world.setBounds(0,0,2000,2000);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bkg=game.add.sprite(0,0,'bkg');

        player = game.add.sprite(0, game.world.height-50, 'ship');
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
