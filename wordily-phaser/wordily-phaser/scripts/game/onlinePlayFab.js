var Wordily;
(function (Wordily) {
    var Online = /** @class */ (function () {
        function Online() {
        }
        Object.defineProperty(Online, "isLoggedIn", {
            get: function () {
                return PlayFab.ClientApi.IsClientLoggedIn();
            },
            enumerable: true,
            configurable: true
        });
        Online.login = function () {
            var user = Wordily.Game.AnonymousUser;
            var loginRequest = {
                CustomId: user,
                CreateAccount: true,
                InfoRequestParameters: { GetPlayerProfile: true, GetCharacterInventories: false, GetCharacterList: false, GetPlayerStatistics: false, GetTitleData: true, GetUserAccountInfo: false, GetUserData: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false }
            };
            PlayFabClientSDK.LoginWithCustomID(loginRequest, Online.loginCallback);
        };
        Online.loginCallback = function (result, error) {
            if (result !== null) {
                //successful login
            }
            else {
                console.error("Error logging into PlayFab: " + error.errorCode + ":" + error.errorMessage);
            }
        };
        Online.submitSolitaireGameResult = function (gameId, score, bestWord, bestWordScore) {
            if (Online.isLoggedIn) {
                var gameResultEventRequest = {
                    EventName: "SolitaireGameResult",
                    Body: {
                        id: gameId,
                        score: score,
                        bestWord: bestWord,
                        bestWordScore: bestWordScore
                    }
                };
                PlayFabClientSDK.WritePlayerEvent(gameResultEventRequest, Online.solitaireGameResultCallback);
            }
        };
        Online.solitaireGameResultCallback = function (result, error) {
            if (result !== null) {
                //successful gameLogged
            }
            else {
                console.error("Error sending game result" + error.errorCode + ":" + error.errorMessage);
            }
        };
        return Online;
    }());
    Wordily.Online = Online;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=onlinePlayFab.js.map