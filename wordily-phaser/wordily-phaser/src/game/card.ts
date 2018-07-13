﻿namespace Wordily {
    export class Card extends Phaser.Group{
        name: string;
        value: number;

        private cardFront: Phaser.Sprite;
        private cardBack: Phaser.Sprite;        
                

        private _isSelected: boolean = false;
        private _isFaceUp: boolean = true;

        get isFaceUp(): boolean {
            return this._isFaceUp;
        }
        set isFaceUp(value: boolean) {
            this._isFaceUp = value;
            this.cardFront.renderable = this.isFaceUp;
            this.cardBack.renderable = !this.isFaceUp;
        }

        isAnimating: boolean = false;

        private _scaleFactor: number = Game.ScaleFactor;
        get scaleFactor(): number {
            return this._scaleFactor;
        }
        set scaleFactor(value: number) {
            this._scaleFactor = value;
            this.scale.setTo(this.scaleFactor, this.scaleFactor);
        }

        curStack: Stack = null;
        prevStack: Stack = null;

        constructor(cardName: string, overrideValue?: number, x?:number, y?:number, parent?:PIXI.DisplayObjectContainer, state?:Phaser.State) {
            super(Game.getInstance(),parent, cardName);            
            this.name = cardName;
            this.scale.setTo(this.scaleFactor, this.scaleFactor);
            if (overrideValue) {
                this.value = overrideValue;
            }
            else {
                this.value = 2;
            }
            
            if (x) {
                this.x = x;
            }
            if (y) {
                this.y = y;
            }

            
            if (state) {                            
               
            }
            else {
                state = Game.getInstance().state.getCurrentState();
               
            }

            //this.isSelected = false;
            
            this.cardFront = state.add.sprite(0, 0, "cards", this.name, this);            
            this.cardBack = state.add.sprite(0, 0, "cards", "cardBackground", this);            
            this.isFaceUp = true;
        }

        toString() {
            return this.name + "[" + this.value + "]";
        }        
    }

}