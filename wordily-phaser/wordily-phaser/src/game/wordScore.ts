namespace Wordily {
    export class WordScore {
        word: string;
        baseScore: number;
        validWord: boolean;
        get bonus(): number {
            if (!this.validWord) {
                return 0;
            }
            if (this.word.length <= 3) {
                return 0;
            }
            else {
                if (this.word.length <= 5) {
                    return 5 * (this.word.length - 3);
                }
                else {
                    return 10 * (this.word.length - 5) + 5;
                }
            }

        }
        get totalScore(): number {
            return this.baseScore + this.bonus;
        }

        constructor(word:string, baseScore:number) {
            this.word = word;
            this.baseScore = baseScore;
            this.validWord = baseScore >= 0;
        }
    }
}