


module Wordily {

    export class Guid {
        static newGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }


       
    declare var FBInstant: any;

    window.onload = () => {
        if (typeof FBInstant != 'undefined') {
            console.debug("starting fb instant game");
            FBInstant.initializeAsync().then(function () {
                FBInstant.setLoadingProgress(100);
                FBInstant.startGameAsync().then(function () {

                    Game.initializeFacebookInstantGame();
                    
                    var activeGame = new Game();
                    
                })
            });
        }
        else {
            console.debug("Not running as Facebook Instant Game");
            Game.isFacebookInstantGame = false;
            var activeGame = new Game();            
        }
    };
}