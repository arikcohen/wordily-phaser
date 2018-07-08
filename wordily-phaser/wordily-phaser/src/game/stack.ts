namespace Wordily {
    export class Stack {
        cards: Card[];
        dropSlot: Phaser.Sprite;


        private _x: number = 0;
        get x(): number {
            return this._x;
        }
        set x(x: number) {
            this._x = x;
            this.dropSlot.x = x;
            
        }

        private _y: number = 0;
        get y(): number {
            return this._y;
        }
        set y(y: number) {
            this._y = y;
            this.dropSlot.y = y;            
        }

        constructor(x:number, y:number) {
            
        }

    }
}
