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
            _this.state.add.text(0, 0, name, null, _this);
            _this.state.add.text(0, 100, "(" + _this.x.toFixed(0) + "," + _this.y.toFixed(0) + ")", null, _this);
            _this.cards = initialCards;
            for (var _i = 0, _a = _this.cards; _i < _a.length; _i++) {
                var c = _a[_i];
                _this.add(c);
                c.prevStack = c.curStack;
                c.curStack = _this;
            }
            _this.updateCardLocations(0);
            return _this;
        }
        Stack.prototype.update = function () {
            if (this.length > 0) {
                this.dropSlot.renderable = false;
            }
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
        Stack.prototype.addCard = function (card, index, fAnimateIn) {
            if (fAnimateIn === void 0) { fAnimateIn = false; }
            if (index) {
                this.cards.push(card);
                this.addAt(card, index);
                this.updateCardLocations(index);
            }
            else {
                this.cards.push(card);
                this.updateCardLocations(this.cards.length - 1);
                this.add(card);
            }
            card.prevStack = card.curStack;
            card.curStack = this;
        };
        Stack.prototype.updateCardLocations = function (startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            console.debug("Updating Card locations for: " + this.name + " starting at location: " + startIndex + " total Cards: " + this.cards.length);
            var prevCard;
            if (startIndex > 0) {
                prevCard = this.cards[startIndex - 1];
            }
            for (var c = startIndex; c < this.length; c++) {
                var x = void 0;
                var y = void 0;
                var card = this.cards[c];
                switch (this.orientation) {
                    case StackOrientation.Deck: {
                        x = 0;
                        y = 0;
                        break;
                    }
                    case StackOrientation.HorizontalFull: {
                        x = c * (this.dropSlot.width + Stack.offsetHorizonatal);
                        y = 0;
                        break;
                    }
                    case StackOrientation.HorizontalDisplay: {
                        x = c * (Stack.offsetHorizonatalDisplay);
                        y = 0;
                        break;
                    }
                    case StackOrientation.HorizontalStack: {
                        x = c * (Stack.offsetHorizonatal);
                        y = 0;
                        break;
                    }
                    case StackOrientation.VerticalStack: {
                        x = 0;
                        if (prevCard) {
                            if (prevCard.isFaceUp) {
                                y = prevCard.y + (Stack.offsetVerticalFaceUp);
                            }
                            else {
                                y = prevCard.y + (Stack.offsetVertical);
                            }
                        }
                        else {
                            y = 0;
                        }
                        break;
                    }
                }
                if (card.x != x || card.y != y) {
                    card.x = x;
                    card.y = y;
                    console.debug("Stack: " + this.name + " updated card location " + c + " " + card.name + " (" + x + ", " + y + ")");
                }
            }
        };
        Stack.prototype.cardTapped = function (card, doubleTapped) {
            console.debug("Card Tapped on stack: " + this.name + " card: " + card.name + " doubleTap: " + doubleTapped);
            this.onCardTapped.dispatch(this, card, doubleTapped);
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