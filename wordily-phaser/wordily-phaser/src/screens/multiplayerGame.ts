module Wordily {
    declare var FBInstant: any;

    export class MultiplayerScreen extends Phaser.State {

        background: Phaser.TileSprite;
        board: MultiplayerBoard;

        exit: Phaser.Sprite;
        

        init(contextId: string) {            

            console.log("initiailizing board for context [" + contextId + "]");
            this.board = new MultiplayerBoard(contextId, this);                
            FBInstant.context.getPlayersAsync()
                .then(players => {
                    this.updatePlayers(players);
                })
                .catch(function (error) {
                    console.log("error getting players: " + error);
                });
            
        }

        preload() {
            this.load.image('exit', 'assets/gameplay/exit.png');
        }

        create() {            
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');                                               

            this.exit = this.add.sprite(this.world.right, 0, 'exit');
            this.exit.anchor.setTo(1, 0);
            this.exit.width = 100;
            this.exit.height = 100;
            this.exit.inputEnabled = true;
            this.exit.events.onInputDown.add(this.switchToMainMenu, this);            

            this.board.create();
        }


        updatePlayers(players: any[]) {
            console.log("got " + players.length + " players for context " + this.board.gameId);
            for (let i = 0; i < players.length; i++) {
                let p: Player = {
                    DisplayName: players[i].getName(),
                    FacebookId: players[i].getID(),
                    Photo: players[i].getPhoto()
                };
                this.board.players.push(p);
            }
        }

        switchToMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }

    interface Player {
        PlayFabId?: string,
        FacebookId: string,
        DisplayName: string,
        Photo: string
    }

    class MultiplayerBoard {
        
        gameId: string;
        players: Player[];
        curPlayer: string;
        isGameStarted: boolean = false;
        gameRound: number;
        gameDeck: Card[];
        drawIndex: number;
        discardCard: Card;
        playerHands: number[][];


        state: Phaser.State;

        constructor(gameId: string, state:Phaser.State) {
            this.gameId = gameId;
            this.state = state;
            this.gameDeck = Deck.CreateDeck(true, gameId, false, 0, 'deck-full');
            this.updateFromPlayFabSharedData();
        }

        toString(): string {
            return JSON.stringify(this);
        }

        updateFromPlayFabSharedData() {
            
        }

        create() {
        }

    }

    class MultiplayerPlayer {
        playerId: string;
        cardsInHand: Card[] = [];
        localHand: Card[][] = [];
    }


}