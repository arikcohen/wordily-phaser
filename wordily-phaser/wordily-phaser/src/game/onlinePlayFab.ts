namespace Wordily {

    export class Online {                
        static get isLoggedIn(): boolean {
            return PlayFab.ClientApi.IsClientLoggedIn();
        }

        static numPlayed:number  =0;
        static bestSolitaireScore: number = 0;
        static bestSolitaireWordScore: number = 0;

        static login(forceLogin:boolean = false):void {
            if (Online.isLoggedIn && !forceLogin) {
                return;
            }          

            let user = Game.AnonymousUser;
            if (Game.isFacebookInstantGame) {
                user = Game.FacebookId;
            }


            let loginRequest: PlayFabClientModels.LoginWithCustomIDRequest = {
                CustomId: user,
                CreateAccount: true,
                InfoRequestParameters: { GetPlayerProfile: true, GetUserData: true, GetPlayerStatistics: true, GetCharacterInventories: false, GetCharacterList: false,  GetTitleData: true, GetUserAccountInfo: false,  GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false }
            };

            PlayFabClientSDK.LoginWithCustomID(loginRequest, Online.loginCallback);
        }

        private static logPlayerEvent(eventName: string, data: object) {
            if (Online.isLoggedIn) {
                let playerEventRequest: PlayFabClientModels.WriteClientPlayerEventRequest = {
                    EventName: eventName,
                    Body: data
                }
                PlayFabClientSDK.WritePlayerEvent(playerEventRequest, Online.playerEventResponse);
            }            
        }

        private static UpdateDisplayNameAndAvatar(displayName?: string, avatarURL?: string) {

            if (displayName) {
                let displayRequest: PlayFabClientModels.UpdateUserTitleDisplayNameRequest = {
                    DisplayName: displayName
                };
                PlayFabClientSDK.UpdateUserTitleDisplayName(displayRequest, null);
            }

            if (avatarURL) {
                let avatarRequest: PlayFabClientModels.UpdateAvatarUrlRequest = {
                    ImageUrl: avatarURL
                };
                PlayFabClientSDK.UpdateAvatarUrl(avatarRequest, null);
            }

        }

        private static loginCallback(result: PlayFabModule.SuccessContainer<PlayFabClientModels.LoginResult>, error: PlayFabModule.IPlayFabError): void {
            if (result !== null) {
                Online.updatePlayerInfo(result.data.InfoResultPayload);                
                if (result.data.NewlyCreated) {
                    if (Game.isFacebookInstantGame) {
                        Online.logPlayerEvent("facebook_new_user_data", {
                            facebook_id: Game.FacebookId,
                            facebook_display_name: Game.FacebookDisplayName,
                            facebook_signature: Game.FacebookSignature,
                            facebook_photo: Game.FacebookPhoto
                        });
                        Online.UpdateDisplayNameAndAvatar(Game.FacebookDisplayName, Game.FacebookPhoto);
                    }
                    else {
                        Online.UpdateDisplayNameAndAvatar(null, "https://api.adorable.io/avatars/200/" + result.data.PlayFabId);
                    }
                }

            }
            else {
                console.error("Error logging into PlayFab: " + error.errorCode + ":" + error.errorMessage);
            }
        }

        private static playerEventResponse(result: PlayFabModule.SuccessContainer<PlayFabClientModels.WriteEventResponse>, error: PlayFabModule.IPlayFabError): void {
            if (result !== null) {
                if (Game.isDebug) {
                    console.debug("Successfully sent event " + result.request);
                }
            }
            else {
                console.error("Error logging event:" + + error.errorCode + ":" + error.errorMessage);
            }
        }

        static submitSolitaireGameResult(gameId: string, score: number, bestWord: string, bestWordScore: number) {
            if (Online.isLoggedIn) {
                let gameResultEventRequest: PlayFabClientModels.WriteClientPlayerEventRequest = {
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
        }


        private static solitaireGameResultCallback(result: PlayFabModule.SuccessContainer<PlayFabClientModels.WriteEventResponse>, error: PlayFabModule.IPlayFabError): void {
            if (result !== null) {
                //refresh player stats
                let getPlayerRequest: PlayFabClientModels.GetPlayerCombinedInfoRequest = {
                    InfoRequestParameters: { GetPlayerProfile: true, GetUserData: true, GetPlayerStatistics: true, GetCharacterInventories: false, GetCharacterList: false, GetTitleData: true, GetUserAccountInfo: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false }
                };

                PlayFabClientSDK.GetPlayerCombinedInfo(getPlayerRequest, Online.getPlayerCombinedInfoCallback);

            }
            else {
                console.error("Error sending game result" + error.errorCode + ":" + error.errorMessage);
            }
        }

        private static updatePlayerInfo(info: PlayFabClientModels.GetPlayerCombinedInfoResultPayload) {
            if (info) {
                if (info.PlayerStatistics) {
                    let bestSolitaireScoreStat = info.PlayerStatistics.filter(sv => { return sv.StatisticName == "SolitaireGamesBestScore"; });
                    if (bestSolitaireScoreStat.length == 1) {
                        if (bestSolitaireScoreStat[0].Value > Online.bestSolitaireScore) {
                            Online.bestSolitaireScore = bestSolitaireScoreStat[0].Value
                        }
                    }

                    let bestSolitaireWordScoreStat = info.PlayerStatistics.filter(sv => { return sv.StatisticName == "SolitaireGamesBestWordScore"; });
                    if (bestSolitaireWordScoreStat.length == 1) {
                        if (bestSolitaireWordScoreStat[0].Value > Online.bestSolitaireWordScore) {
                            Online.bestSolitaireWordScore = bestSolitaireWordScoreStat[0].Value
                        }
                    }
                }
            }
        }

        private static getPlayerCombinedInfoCallback(result: PlayFabModule.SuccessContainer<PlayFabClientModels.GetPlayerCombinedInfoResult>, error: PlayFabModule.IPlayFabError): void {
            if (result !== null) {
                Online.updatePlayerInfo(result.data.InfoResultPayload);
            }
            else {
                console.error("Error logging into PlayFab: " + error.errorCode + ":" + error.errorMessage);
            }
        }

    }
    

}