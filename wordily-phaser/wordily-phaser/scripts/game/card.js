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
    var Card = /** @class */ (function (_super) {
        __extends(Card, _super);
        function Card(cardName, overrideValue, x, y, parent, state) {
            var _this = _super.call(this, Wordily.Game.getInstance(), parent, cardName) || this;
            _this._isSelected = false;
            _this._isFaceUp = true;
            _this.isAnimating = false;
            _this._scaleFactor = Wordily.Game.ScaleFactor;
            _this.curStack = null;
            _this.prevStack = null;
            _this.name = cardName;
            _this.scale.setTo(_this.scaleFactor, _this.scaleFactor);
            if (overrideValue) {
                _this.value = overrideValue;
            }
            else {
                _this.value = 2;
            }
            if (x) {
                _this.x = x;
            }
            if (y) {
                _this.y = y;
            }
            if (state) {
            }
            else {
                state = Wordily.Game.getInstance().state.getCurrentState();
            }
            //this.isSelected = false;
            _this.cardFront = state.add.sprite(0, 0, "cards", _this.name, _this);
            _this.cardBack = state.add.sprite(0, 0, "cards", "cardBackground", _this);
            _this.isFaceUp = true;
            return _this;
        }
        Object.defineProperty(Card.prototype, "isFaceUp", {
            get: function () {
                return this._isFaceUp;
            },
            set: function (value) {
                this._isFaceUp = value;
                this.cardFront.renderable = this.isFaceUp;
                this.cardBack.renderable = !this.isFaceUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "scaleFactor", {
            get: function () {
                return this._scaleFactor;
            },
            set: function (value) {
                this._scaleFactor = value;
                this.scale.setTo(this.scaleFactor, this.scaleFactor);
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.toString = function () {
            return this.name + "[" + this.value + "]";
        };
        return Card;
    }(Phaser.Group));
    Wordily.Card = Card;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=card.js.map