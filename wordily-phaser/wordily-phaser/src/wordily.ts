module Wordily {        

    export class Guid {
        static newGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }

    export class Game extends Phaser.Game {
        
        static ScaleFactor: number = 0.75;
        static BaseCardWidth: number = 188;
        static BaseCardHeight: number = 225;

        static isDebug = false;

        static get AnonymousUser(): string
        {
            var user: string = localStorage.anonymousUser;
            if (!user) {
                localStorage.anonymousUser = Guid.newGuid();
            }
            return localStorage.anonymousUser;
        }

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
            super(1280, 720, Phaser.AUTO, 'content');
            
            
            

            this.state.add('Boot', Boot, false);
            this.state.add('SplashScreen', SplashScreen, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Solitaire', SolitaireGame, false);            
            this.state.add('MultiplayerLobby', MultiplayerLobby, false);
            this.state.add('MultiplayerGame', MultiplayerGame, false);
            this.state.start('Boot');

            PlayFab.settings.titleId = "9CB1";
            Game._instance = this;
        }        

        private static _validWords: string[][] = [];

        private static LoadWords() {
            if (Game._validWords.length == 0) {
                for (let c: number = 'A'.charCodeAt(0); c <= + 'Z'.charCodeAt(0); c++) {

                    let words: string[] = Game.getInstance().cache.getJSON('validWords-' + String.fromCharCode(c));
                    this._validWords.push(words);
                }
            }
        }

        static checkWord(wordToCheck: string): boolean {
            Game.LoadWords();

            if (wordToCheck.length < 2) {
                return false;
            }

            wordToCheck = wordToCheck.toLowerCase();

            let firstLetter: string = wordToCheck.charAt(0)
            //does the word start with a joker?
            if (wordToCheck.indexOf(".") != -1) {
                return true;
            }
            else {
                let index:number  = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
                return (Game._validWords[index].indexOf(wordToCheck) != -1)
            }
        }

    }

    

    window.onload = () => {

       var activeGame  = new Game();

    };
} 