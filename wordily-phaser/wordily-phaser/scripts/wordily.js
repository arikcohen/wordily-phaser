var Wordily;
(function (Wordily) {
    var Guid = /** @class */ (function () {
        function Guid() {
        }
        Guid.newGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        return Guid;
    }());
    Wordily.Guid = Guid;
    window.onload = function () {
        try {
            FBInstant.initializeAsync().then(function () {
                FBInstant.setLoadingProgress(100);
                FBInstant.startGameAsync().then(function () {
                    Wordily.Game.isFacebookInstantGame = true;
                    var activeGame = new Wordily.Game();
                    console.debug(window.location.hostname);
                });
            });
        }
        catch (ex) {
            console.debug("Not running as Facebook Instant Game");
            Wordily.Game.isFacebookInstantGame = false;
            var activeGame = new Wordily.Game();
        }
    };
})(Wordily || (Wordily = {}));
//# sourceMappingURL=wordily.js.map