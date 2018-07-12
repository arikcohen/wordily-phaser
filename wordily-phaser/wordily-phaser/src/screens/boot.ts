﻿module Wordily {
 
    export class Boot extends Phaser.State {

        preload() {

            
            this.game.load.image('background', 'assets/tiledBackground.png');
            this.game.load.atlasJSONHash('cards', 'assets/deck/deck.png', 'assets/deck/deck.json');
            this.game.load.image('playingArea', 'assets/gameplay/playingArea.png');

            
        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                
            }
            else {
                //  Same goes for mobile settings.
            }

            this.game.state.start('SplashScreen', true, false);

        }

    }

}