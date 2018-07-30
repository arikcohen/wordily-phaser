


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
                console.debug("starting fb instant game - setting loading progress");
                FBInstant.setLoadingProgress(100);
                console.debug("starting fb instant game - starting game");
                FBInstant.startGameAsync().then(function () {
                    Game.isFacebookInstantGame = true;

                    var contextId = FBInstant.context.getID();
                    var contextType = FBInstant.context.getType();

                    var playerName = FBInstant.player.getName();
                    var playerPic = FBInstant.player.getPhoto();
                    var playerId = FBInstant.player.getID();

                    console.log(playerName);

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