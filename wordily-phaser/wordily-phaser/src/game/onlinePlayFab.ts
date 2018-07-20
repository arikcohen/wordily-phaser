namespace Wordily {
    export class Online {
        
        
        static get isLoggedIn(): boolean {
            return PlayFab.ClientApi.IsClientLoggedIn();
        }

        static login():void {
            let user = Game.AnonymousUser;

            let loginRequest: PlayFabClientModels.LoginWithCustomIDRequest = {
                CustomId: user,
                CreateAccount: true,
                InfoRequestParameters: { GetPlayerProfile: true, GetCharacterInventories: false, GetCharacterList: false, GetPlayerStatistics: false, GetTitleData: true, GetUserAccountInfo: false, GetUserData: false, GetUserInventory: false, GetUserReadOnlyData: false, GetUserVirtualCurrency: false }
            };

            PlayFabClientSDK.LoginWithCustomID(loginRequest, Online.loginCallback);
        }

        private static loginCallback(result: PlayFabModule.SuccessContainer<PlayFabClientModels.LoginResult>, error: PlayFabModule.IPlayFabError): void {
            if (result !== null) {
                //successful login
            }
            else {
                console.error("Error logging into PlayFab: " + error.errorCode + ":" + error.errorMessage);
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
                //successful gameLogged
            }
            else {
                console.error("Error sending game result" + error.errorCode + ":" + error.errorMessage);
            }
        }

    }

}