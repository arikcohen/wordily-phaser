


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
        try {

            FBInstant.initializeAsync().then(function () {
                FBInstant.setLoadingProgress(100);
                FBInstant.startGameAsync().then(function () {
                    Game.isFacebookInstantGame = true;
                    var activeGame = new Game();
                    console.debug(window.location.hostname);
                })
            });
        }
        catch (ex) {
            console.debug("Not running as Facebook Instant Game");
            Game.isFacebookInstantGame = false;
            var activeGame = new Game();            
        }
    };
}