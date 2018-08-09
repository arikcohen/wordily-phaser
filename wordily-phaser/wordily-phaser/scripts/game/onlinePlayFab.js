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
            var facebookIGLoginRequest = {
                FacebookInstantGamesSignature: Wordily.Game.FacebookSignature,
                CreateAccount: true,
                InfoRequestParameters: {
                    GetPlayerProfile: true,
                    GetUserData: true,
                    GetPlayerStatistics: true,
                    GetCharacterInventories: false, GetCharacterList: false, GetTitleData: true, GetUserAccountInfo: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false,
                    ProfileConstraints: {
                        "ShowDisplayName": true,
                        "ShowAvatarUrl": true
                    }
                }
            };
            PlayFabClientSDK.LoginWithFacebookInstantGamesID(facebookIGLoginRequest, Online.loginCallback);
            //let loginRequest: PlayFabClientModels.LoginWithCustomIDRequest = {
            //    CustomId: user,
            //    CreateAccount: true,
            //    InfoRequestParameters: {
            //        GetPlayerProfile: true, GetUserData: true, GetPlayerStatistics: true, GetCharacterInventories: false, GetCharacterList: false, GetTitleData: true, GetUserAccountInfo: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false,
            //        ProfileConstraints: {
            //            "ShowDisplayName": true,
            //            "ShowAvatarUrl": true
            //        }
            //    }
            //};
            //PlayFabClientSDK.LoginWithCustomID(loginRequest, Online.loginCallback);
        };
        Online.logPlayerEvent = function (eventName, data) {
            if (Online.isLoggedIn) {
                var playerEventRequest = {
                    EventName: eventName,
                    Body: data
                };
                PlayFabClientSDK.WritePlayerEvent(playerEventRequest, Online.playerEventResponse);
            }
        };
        Online.UpdateDisplayNameAndAvatar = function (displayName, avatarURL) {
            if (displayName) {
                var displayRequest = {
                    DisplayName: displayName
                };
                PlayFabClientSDK.UpdateUserTitleDisplayName(displayRequest, null);
            }
            if (avatarURL) {
                var avatarRequest = {
                    ImageUrl: avatarURL
                };
                PlayFabClientSDK.UpdateAvatarUrl(avatarRequest, null);
            }
        };
        Online.loginCallback = function (result, error) {
            if (result !== null) {
                Online.updatePlayerInfo(result.data.InfoResultPayload);
                if (result.data.NewlyCreated) {
                    if (Wordily.Game.isFacebookInstantGame) {
                        Online.logPlayerEvent("facebook_new_user_data", {
                            facebook_id: Wordily.Game.FacebookId,
                            facebook_display_name: Wordily.Game.FacebookDisplayName,
                            facebook_signature: Wordily.Game.FacebookSignature,
                            facebook_photo: Wordily.Game.FacebookPhoto
                        });
                        Online.UpdateDisplayNameAndAvatar(Wordily.Game.FacebookDisplayName, Wordily.Game.FacebookPhoto);
                    }
                    else {
                        Online.UpdateDisplayNameAndAvatar(null, "https://api.adorable.io/avatars/200/" + result.data.PlayFabId);
                    }
                }
            }
            else {
                console.error("Error logging into PlayFab: " + error.errorCode + ":" + error.errorMessage);
            }
        };
        Online.playerEventResponse = function (result, error) {
            if (result !== null) {
                if (Wordily.Game.isDebug) {
                    console.debug("Successfully sent event " + result.request);
                }
            }
            else {
                console.error("Error logging event:" + +error.errorCode + ":" + error.errorMessage);
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
                    InfoRequestParameters: {
                        GetPlayerProfile: true, GetUserData: true, GetPlayerStatistics: true, GetCharacterInventories: false, GetCharacterList: false, GetTitleData: true, GetUserAccountInfo: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false
                    }
                };
                PlayFabClientSDK.GetPlayerCombinedInfo(getPlayerRequest, Online.getPlayerCombinedInfoCallback);
            }
            else {
                console.error("Error sending game result" + error.errorCode + ":" + error.errorMessage);
            }
        };
        Online.updatePlayerInfo = function (info) {
            if (info) {
                if (info.PlayerProfile) {
                    Online.CurrentPlayer.haveProfileData = true;
                    Online.CurrentPlayer.DisplayName = info.PlayerProfile.DisplayName;
                    Online.CurrentPlayer.AvatarURL = info.PlayerProfile.AvatarUrl;
                    Online.CurrentPlayer.PlayFabId = info.PlayerProfile.PlayerId;
                    console.log('Player profile:   DisplayName:' + info.PlayerProfile.DisplayName + " AvatarUrl:" + info.PlayerProfile.AvatarUrl);
                }
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
        Online.CurrentPlayer = {
            haveProfileData: false,
            DisplayName: "",
            AvatarURL: "",
            PlayFabId: ""
        };
        Online.numPlayed = 0;
        Online.bestSolitaireScore = 0;
        Online.bestSolitaireWordScore = 0;
        return Online;
    }());
    Wordily.Online = Online;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=onlinePlayFab.js.map