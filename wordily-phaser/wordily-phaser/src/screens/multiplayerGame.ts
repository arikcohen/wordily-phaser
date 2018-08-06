module Wordily {

    export class MultiplayerScreen extends Phaser.State {

        background: Phaser.TileSprite;

        board: MultiplayerBoard;


        init(id:string) {
            this.board = new MultiplayerBoard(id);
        }

        create() {            
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');                                               
        }
        
    }

    class MultiplayerBoard {
        gameId: string;
        players: string[];
        curPlayer: string;
        isGameStarted: boolean = false;
        gameRound: number;
        gameDeck: Card[];
        drawIndex: number;
        discardCard: Card;
        playerHands: number[][];

        constructor(gameId: string) {
            this.gameId = gameId;
            this.gameDeck = Deck.CreateDeck(true, gameId, false, 0, 'deck-full');
        }

        toString(): string {
            return JSON.stringify(this);
        }
    }

    class MultiplayerPlayer {
        playerId: string;
        cardsInHand: Card[] = [];
        localHand: Card[][] = [];
    }


}