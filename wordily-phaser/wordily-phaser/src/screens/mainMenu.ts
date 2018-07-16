﻿module Wordily {

    export class MainMenu extends Phaser.State {

        background: Phaser.TileSprite;
        cardW: Card;
        cardO: Card;
        cardR: Card;
        cardD: Card;
        cardI: Card;
        cardLY: Card;
        cardTitleGroup: Phaser.Group;

        solitaire: Phaser.Sprite;
        multiplayer: Phaser.Sprite;

        create() {
            

            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.cardTitleGroup = this.add.group();
            
            
            var wordilyStartX: number = 97.5+80;
            var wordilyStarty: number = 70;
            var constSeperation: number = 155;

            this.cardW = new Card("W", true, null, wordilyStartX, wordilyStarty, this.cardTitleGroup, this);
            this.cardO = new Card("O", true, null, wordilyStartX+ constSeperation * 1, wordilyStarty, this.cardTitleGroup, this);
            this.cardR = new Card("R", true, null, wordilyStartX+ constSeperation * 2, wordilyStarty, this.cardTitleGroup, this);
            this.cardD = new Card("D", true, null, wordilyStartX+ constSeperation * 3, wordilyStarty, this.cardTitleGroup, this);
            this.cardI = new Card("I", true, null, wordilyStartX+ constSeperation * 4, wordilyStarty, this.cardTitleGroup, this);
            this.cardLY = new Card("LY", true, null, wordilyStartX + constSeperation * 5, wordilyStarty, this.cardTitleGroup, this);            
            
            
            this.solitaire = this.add.sprite(this.world.width/3, this.world.centerY, "start_solitaire");
            this.solitaire.anchor.setTo(0.5, 0.5);
            this.solitaire.inputEnabled = true;
            this.solitaire.events.onInputDown.addOnce(this.startSolitaireGame, this);

            this.multiplayer = this.add.sprite(this.world.width / 3 * 2, this.world.centerY, "start_multiplayer");
            this.multiplayer.anchor.setTo(0.5, 0.5);
            this.multiplayer.inputEnabled = true;
            this.multiplayer.events.onInputDown.addOnce(this.startMultiplayerGame, this);

            
        }
        

        startSolitaireGame() {            
            this.game.state.start('Solitaire', true, false);
            

        }

        startMultiplayerGame() {

            alert('no muliplayer yet');

        }


    }

}