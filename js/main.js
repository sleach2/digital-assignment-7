window.onload = function() {
    "use strict";
    
    var game = new Phaser.Game( 400, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image('bkg','assets/veins3.png');
    }
    
    var bkg;
    
    function create() {
        bkg=game.add.sprite(0,0,'bkg');
    }
    
    function update() {
        
    }
};
