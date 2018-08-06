

namespace Wordily {
    declare var FBInstant: any;

    export class Game extends Phaser.Game {

        static ScaleFactor: number = 0.72;
        static BaseCardWidth: number = 187;
        static BaseCardHeight: number = 225;

        static isFacebookInstantGame: boolean = false;

        static isDebug = false;

        static get AnonymousUser(): string {
            var user: string = localStorage.anonymousUser;
            if (!user) {
                localStorage.anonymousUser = Guid.newGuid();
            }
            return localStorage.anonymousUser;
        }

        static FacebookId: string ;
        static FacebookSignature: string;
        static FacebookDisplayName: string;
        static FacebookPhoto: string;
        static FacebookContextId: string;
        static FacebookContextType: string;
        

        static get DefaultCardWidth(): number {
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

            let pixelW = window.innerWidth * window.devicePixelRatio;
            let pixelH = window.innerHeight * window.devicePixelRatio;

            super(pixelW, pixelH, Phaser.CANVAS, 'content');

            this.state.add('Boot', Boot, false);
            this.state.add('SplashScreen', SplashScreen, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Multiplayer', MultiplayerScreen, false);
            this.state.add('Solitaire', SolitaireGame, false);                        
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

            if (wordToCheck.indexOf("?") != -1) {
                let l: number = wordToCheck.indexOf("?");
                wordToCheck = wordToCheck.replace("?", ".");
                let regEx: RegExp = new RegExp("^" + wordToCheck + "$");
                for (; l < this._validWords.length; l++) {
                    for (let i: number = 0; i < this._validWords[l].length; i++) {

                        if (regEx.test(this._validWords[l][i])) {
                            console.log('found ' + this._validWords[l][i] + ' to match ' + wordToCheck);
                            return true;
                        }
                    }
                }
                return false;

            }
            else {
                let index: number = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
                return (Game._validWords[index].indexOf(wordToCheck) != -1)
            }
        }

        static initializeFacebookInstantGame(): void {                                    
            Game.isFacebookInstantGame = true;
            Game.FacebookId = FBInstant.player.getID();
            Game.FacebookDisplayName = FBInstant.player.getName();
            Game.FacebookPhoto = FBInstant.player.getPhoto();
            Game.FacebookContextId = FBInstant.context.getID();
            Game.FacebookContextType = FBInstant.context.getType();            
            FBInstant.player.getSignedPlayerInfoAsync(Game.FacebookId).then(function (result) {
                Game.FacebookSignature = result.getSignature();
            });


            //Online.CurrentPlayer.haveProfileData = true;
            //Online.CurrentPlayer.AvatarURL = Game.FacebookPhoto;
            //Online.CurrentPlayer.DisplayName = Game.FacebookDisplayName;            

            console.debug('here end');
        }

    }
}