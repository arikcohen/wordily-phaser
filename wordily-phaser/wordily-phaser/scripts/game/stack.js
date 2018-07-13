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
        function Stack(state, name, orientation, x, y) {
            var _this = _super.call(this, state.game, null, name, true, false, null) || this;
            _this.state = state;
            _this.orientation = orientation;
            _this.cards = [];
            if (x) {
                _this.x = x;
            }
            if (y) {
                _this.y = y;
            }
            //this.groupStack = state.add.group(null, name, true, false);                        
            _this.dropSlot = _this.state.add.sprite(0, 0, "cards", "card_Slot", _this);
            _this.dropSlot.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            _this.state.add.text(0, 0, name, null, _this);
            _this.state.add.text(0, 100, "(" + _this.x.toFixed(0) + "," + _this.y.toFixed(0) + ")", null, _this);
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
        Stack.prototype.addCard = function (card, index) {
            if (index) {
                this.cards.push(card);
                this.addAt(card, index);
            }
            else {
                this.cards.push(card);
                this.add(card);
            }
            this.updateCardLocations();
            card.prevStack = card.curStack;
            card.curStack = this;
        };
        Stack.prototype.updateCardLocations = function () {
            for (var c = 0; c < this.length; c++) {
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
                        y = c * (Stack.offsetVertical);
                        break;
                    }
                }
                if (card.x != x || card.y != y) {
                    card.x = x;
                    card.y = y;
                    console.debug("Updated Card Location " + card.name + " (" + x + ", " + y + ")");
                }
            }
        };
        Stack.offsetHorizonatal = 10;
        Stack.offsetHorizonatalDisplay = Wordily.Game.DefaultCardWidth * 0.4;
        Stack.offsetVertical = 20;
        return Stack;
    }(Phaser.Group));
    Wordily.Stack = Stack;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=stack.js.map