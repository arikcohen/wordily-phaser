namespace Wordily {
    export class Card {
        name: string;
        value: number;

        private cardFront: Phaser.Sprite;
        private cardBack: Phaser.Sprite;

        

        private _x: number = 0;
        get x(): number {
            return this._x;
        }
        set x(x: number) {
            this._x = x;
            this.cardFront.x = x;
            this.cardBack.x = x;
        }

        private _y: number = 0;
        get y(): number {
            return this._y;
        }
        set y(y: number) {
            this._y = y;
            this.cardFront.y = y;
            this.cardBack.y = y;
        }

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


        private _game: Game = Game.getInstance();

        private _scaleFactor: number = Game.ScaleFactor;
        get scaleFactor(): number {
            return this._scaleFactor;
        }
        set scaleFactor(value: number) {
            this._scaleFactor = value;
            this.cardBack.scale.setTo(value, value);
            this.cardFront.scale.setTo(value, value);
        }

        curStack: Stack = null;
        prevStack: Stack = null;

        constructor(cardName: string, overrideValue?: number, x?:number, y?:number, group?:Phaser.Group) {
            this.name = cardName;
            if (overrideValue) {
                this.value = overrideValue;
            }
            else {
                this.value = 2;
            }
            
            if (x) {
                this._x = x;
            }
            if (y) {
                this._y = y;
            }

            //this.isSelected = false;
            this.cardFront = this._game.add.sprite(this.x, this.y, "cards", this.name, group);
            this.cardFront.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.cardBack = this._game.add.sprite(this.x, this.y, "cards", "cardBackground", group);
            this.cardBack.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.isFaceUp = true;
        }

        toString() {
            return this.name + "[" + this.value + "]";
        }        
    }

}