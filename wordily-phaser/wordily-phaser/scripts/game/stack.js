var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Wordily;
(function (Wordily) {
    var StackOrientation;
    (function (StackOrientation) {
        StackOrientation[StackOrientation["Deck"] = 0] = "Deck";
        StackOrientation[StackOrientation["HorizontalFull"] = 1] = "HorizontalFull";
        StackOrientation[StackOrientation["HorizontalStack"] = 2] = "HorizontalStack";
        StackOrientation[StackOrientation["VerticalStack"] = 3] = "VerticalStack";
        StackOrientation[StackOrientation["HorizontalDisplay"] = 4] = "HorizontalDisplay";
    })(StackOrientation = Wordily.StackOrientation || (Wordily.StackOrientation = {}));
    var Stack = /** @class */ (function (_super) {
        __extends(Stack, _super);
        function Stack(state, name, orientation, x, y, initialCards) {
            if (initialCards === void 0) { initialCards = []; }
            var _this = _super.call(this, state.game, null, name, true, false, null) || this;
            _this.onCardTapped = new Phaser.Signal();
            _this.onStackTapped = new Phaser.Signal();
            _this.state = state;
            _this.orientation = orientation;
            if (x) {
                _this.x = x;
            }
            if (y) {
                _this.y = y;
            }
            //this.groupStack = state.add.group(null, name, true, false);                        
            _this.dropSlot = _this.state.add.sprite(0, 0, "cards", "cardSlot", _this);
            _this.dropSlot.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            _this.cards = initialCards;
            for (var _i = 0, _a = _this.cards; _i < _a.length; _i++) {
                var c = _a[_i];
                c.prevStack = c.curStack;
                c.curStack = _this;
            }
            _this.updateCardLocations(0);
            if (Wordily.Game.isDebug) {
                _this.state.add.text(0, 0, name, null, _this);
                _this.state.add.text(0, 100, "(" + _this.x.toFixed(0) + "," + _this.y.toFixed(0) + ")", null, _this);
            }
            _this.dropSlot.inputEnabled = true;
            var stackInputPriority = -1000;
            if (_this.orientation == StackOrientation.Deck) {
                stackInputPriority = 1000;
            }
            _this.dropSlot.events.onInputDown.add(_this.stackTapped, _this, stackInputPriority);
            return _this;
        }
        Stack.prototype.update = function () {
            this.dropSlot.renderable = (this.length == 0);
            _super.prototype.update.call(this);
        };
        Object.defineProperty(Stack.prototype, "length", {
            get: function () {
                return this.cards.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stack.prototype, "topCard", {
            get: function () {
                if (this.cards.length == 0)
                    return null;
                else
                    return this.cards[length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Stack.prototype.removeTopCard = function () {
            if (this.cards.length == 0)
                return null;
            else
                return this.cards.pop();
        };
        Stack.prototype.removeCard = function (card) {
            var index = this.cards.indexOf(card);
            if (index != -1) {
                this.cards.splice(index, 1);
                return card;
            }
            else {
                return null;
            }
        };
        Stack.prototype.addCard = function (card, index, fAnimateIn, animateDuration, animateDelay) {
            if (fAnimateIn === void 0) { fAnimateIn = false; }
            if (animateDuration === void 0) { animateDuration = 300; }
            if (animateDelay === void 0) { animateDelay = 0; }
            if (fAnimateIn) {
                card.isAnimating = true;
            }
            if (index) {
                this.cards.push(card);
                //this.addAt(card, index);
                this.updateCardLocations(index, fAnimateIn);
            }
            else {
                this.cards.push(card);
                this.updateCardLocations(this.cards.length - 1, fAnimateIn);
                //this.add(card);
            }
            if (fAnimateIn) {
                console.debug("animating to stack " + this.name + " card " + card.name + "(" + card.animateFinalX + ", " + card.animateFinalY + ") from  stack " + card.curStack + "(" + card.x + ", " + card.y + ")");
                this.state.add.tween(card).to({ x: card.animateFinalX, y: card.animateFinalY }, animateDuration, Phaser.Easing.Linear.None, true, animateDelay);
            }
            card.prevStack = card.curStack;
            card.curStack = this;
        };
        Stack.prototype.getWord = function () {
            var word = "";
            for (var i = 0; i < this.cards.length; i++) {
                if (this.cards[i].name != "JOKER") {
                    word += this.cards[i].name;
                }
                else {
                    word += "*";
                }
            }
            return word;
        };
        Stack.prototype.getScore = function () {
            var score = 0;
            for (var i = 0; i < this.cards.length; i++) {
                console.debug(this.cards[i].value);
                score += this.cards[i].value;
            }
            return score;
        };
        Stack.prototype.cardFinalLocation = function (index) {
            var x;
            var y;
            var prevCard;
            if (index > 0) {
                prevCard = this.cards[index - 1];
            }
            var card = this.cards[index];
            switch (this.orientation) {
                case StackOrientation.Deck: {
                    x = this.x;
                    y = this.y;
                    break;
                }
                case StackOrientation.HorizontalFull: {
                    x = this.x + (index * (this.dropSlot.worldPosition.y + Stack.offsetHorizonatal));
                    y = this.y;
                    break;
                }
                case StackOrientation.HorizontalDisplay: {
                    x = this.x + (index * (Stack.offsetHorizonatalDisplay));
                    y = this.y;
                    break;
                }
                case StackOrientation.HorizontalStack: {
                    x = this.x + (index * (Stack.offsetHorizonatal));
                    y = this.y;
                    break;
                }
                case StackOrientation.VerticalStack: {
                    x = this.worldPosition.x;
                    if (prevCard) {
                        if (prevCard.isFaceUp) {
                            if (prevCard.isAnimating) {
                                y = prevCard.animateFinalY + (Stack.offsetVerticalFaceUp);
                            }
                            else {
                                y = prevCard.y + (Stack.offsetVerticalFaceUp);
                            }
                        }
                        else {
                            if (prevCard.isAnimating) {
                                y = prevCard.animateFinalY + (Stack.offsetVertical);
                            }
                            else {
                                y = prevCard.y + (Stack.offsetVertical);
                            }
                        }
                    }
                    else {
                        y = this.y;
                    }
                    break;
                }
            }
            return { x: x, y: y };
        };
        Stack.prototype.updateCardLocations = function (startIndex, fAnimate) {
            if (startIndex === void 0) { startIndex = 0; }
            if (fAnimate === void 0) { fAnimate = false; }
            console.debug("Updating Card locations for: " + this.name + " starting at location: " + startIndex + " total Cards: " + this.cards.length);
            for (var index = startIndex; index < this.length; index++) {
                var x = void 0;
                var y = void 0;
                var card = this.cards[index];
                var location_1 = this.cardFinalLocation(index);
                x = location_1.x;
                y = location_1.y;
                this.game.world.bringToTop(card);
                if (card.isAnimating) {
                    if (card.animateFinalX != x || card.animateFinalY != y) {
                        card.animateFinalX = x;
                        card.animateFinalY = y;
                        console.debug("Stack: " + this.name + " updated animated card location " + index + " " + card.name + " (" + x + ", " + y + ")");
                    }
                }
                else {
                    if (card.x != x || card.y != y) {
                        card.x = x;
                        card.y = y;
                        console.debug("Stack: " + this.name + " updated card location " + index + " " + card.name + " (" + x + ", " + y + ")");
                    }
                }
            }
        };
        Stack.prototype.enableTopCard = function () {
            if (this.length > 0) {
                var c = this.cards[this.length - 1];
                c.isFaceUp = true;
                c.isSelectable = true;
            }
        };
        Stack.prototype.cardTapped = function (card, doubleTapped) {
            console.debug("Card Tapped on stack: " + this.name + " card: " + card.name + " doubleTap: " + doubleTapped);
            this.onCardTapped.dispatch(this, card, doubleTapped);
        };
        Stack.prototype.stackTapped = function () {
            this.onStackTapped.dispatch(this);
        };
        Stack.offsetHorizonatal = 10;
        Stack.offsetHorizonatalDisplay = Wordily.Game.DefaultCardWidth * 0.4;
        Stack.offsetVertical = 15;
        Stack.offsetVerticalFaceUp = 32;
        return Stack;
    }(Phaser.Group));
    Wordily.Stack = Stack;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=stack.js.map