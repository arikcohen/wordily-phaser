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
        Online.login = function (forceLogin) {
            if (forceLogin === void 0) { forceLogin = false; }
            if (Online.isLoggedIn && !forceLogin) {
                return;
            }
            var user = Wordily.Game.AnonymousUser;
            if (Wordily.Game.isFacebookInstantGame) {
                user = Wordily.Game.FacebookId;
            }
            var loginRequest = {
                CustomId: user,
                CreateAccount: true,
                InfoRequestParameters: { GetPlayerProfile: true, GetUserData: true, GetPlayerStatistics: true, GetCharacterInventories: false, GetCharacterList: false, GetTitleData: true, GetUserAccountInfo: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false }
            };
            PlayFabClientSDK.LoginWithCustomID(loginRequest, Online.loginCallback);
        };
        Online.loginCallback = function (result, error) {
            if (result !== null) {
                Online.updatePlayerInfo(result.data.InfoResultPayload);
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
                //refresh player stats
                var getPlayerRequest = {
                    InfoRequestParameters: { GetPlayerProfile: true, GetUserData: true, GetPlayerStatistics: true, GetCharacterInventories: false, GetCharacterList: false, GetTitleData: true, GetUserAccountInfo: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false }
                };
                PlayFabClientSDK.GetPlayerCombinedInfo(getPlayerRequest, Online.getPlayerCombinedInfoCallback);
            }
            else {
                console.error("Error sending game result" + error.errorCode + ":" + error.errorMessage);
            }
        };
        Online.updatePlayerInfo = function (info) {
            if (info) {
                if (info.PlayerStatistics) {
                    var bestSolitaireScoreStat = info.PlayerStatistics.filter(function (sv) { return sv.StatisticName == "SolitaireGamesBestScore"; });
                    if (bestSolitaireScoreStat.length == 1) {
                        if (bestSolitaireScoreStat[0].Value > Online.bestSolitaireScore) {
                            Online.bestSolitaireScore = bestSolitaireScoreStat[0].Value;
                        }
                    }
                    var bestSolitaireWordScoreStat = info.PlayerStatistics.filter(function (sv) { return sv.StatisticName == "SolitaireGamesBestWordScore"; });
                    if (bestSolitaireWordScoreStat.length == 1) {
                        if (bestSolitaireWordScoreStat[0].Value > Online.bestSolitaireWordScore) {
                            Online.bestSolitaireWordScore = bestSolitaireWordScoreStat[0].Value;
                        }
                    }
                }
            }
        };
        Online.getPlayerCombinedInfoCallback = function (result, error) {
            if (result !== null) {
                Online.updatePlayerInfo(result.data.InfoResultPayload);
            }
            else {
                console.error("Error logging into PlayFab: " + error.errorCode + ":" + error.errorMessage);
            }
        };
        Online.numPlayed = 0;
        Online.bestSolitaireScore = 0;
        Online.bestSolitaireWordScore = 0;
        return Online;
    }());
    Wordily.Online = Online;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=onlinePlayFab.js.map