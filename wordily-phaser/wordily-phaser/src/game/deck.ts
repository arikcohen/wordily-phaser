﻿namespace Wordily {
    export class Deck {
        static CreateDeck(fShuffled: boolean = true, fShuffleSeed: number | string = -1, isFaceUp:boolean =false, numJokers : number = 0, deckName:string) {
            let cards: Card[] = [];
            var basicDeck:string = JSON.stringify(Game.getInstance().cache.getJSON(deckName));
            console.log("deck data: " + basicDeck);
            let deckData: object[] = JSON.parse(basicDeck);

            for (let num: number = 0; num < deckData.length; num++) {
                let c:object = deckData[num];
                for (let i: number = 0; i < c["count"]; i++) {
                    let newCard: Card = new Card(-1,c["name"], isFaceUp, c["value"]);
                    cards.push(newCard);
                }
            }

            for (let j: number = 0; j < numJokers; j++) {
                let newJoker: Card = new Card(-1, "JOKER", isFaceUp, 0);
                cards.push(newJoker);
            }

            if (fShuffled) {
                let rng = new Prando(fShuffleSeed);

                // shuffle the deck;
                let c: Card;
                for (let i: number = 0; i < cards.length; i++) {
                    let rnd = rng.nextInt(0,cards.length-1);
                    c = cards[i];
                    cards[i] = cards[rnd];
                    cards[rnd] = c;
                }
            }

            console.log("deck created with " + cards.length + " cards");

            
            return cards;
        }
    }
}