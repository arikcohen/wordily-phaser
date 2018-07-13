module Wordily {        

    export class Game extends Phaser.Game {
        
        static ScaleFactor: number = 0.8;
        static BaseCardWidth: number = 188;
        static BaseCardHeight: number = 225;



        static get DefaultCardWidth() : number {
            return Game.BaseCardWidth * Game.ScaleFactor;
        }

        static get DefaultCardHeight(): number {
            return Game.BaseCardHeight * Game.ScaleFactor;
        }


        private static _instance: Game;

        public static getInstance(): Game {
            return Game._instance;
        }
        constructor() {
            if (Game._instance) {
                throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
            }            
            super(1280, 720, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('SplashScreen', SplashScreen, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Solitaire', SolitaireGame, false);

            this.state.start('Boot');
            Game._instance = this;
        }        
    }

    

    window.onload = () => {

       var activeGame  = new Game();

    };
} 