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
        function Card(id, name, isFaceUp, value, x, y, parent, state) {
            if (id === void 0) { id = -1; }
            if (isFaceUp === void 0) { isFaceUp = true; }
            var _this = _super.call(this, Wordily.Game.getInstance(), parent, name) || this;
            _this._isFaceUp = true;
            _this._isSelected = false;
            _this._isSelectable = false;
            _this.isAnimating = false;
            _this._scaleFactor = Wordily.Game.ScaleFactor;
            _this.curStack = null;
            _this.prevStack = null;
            _this.name = name;
            _this.value = value;
            _this.scale.setTo(_this.scaleFactor, _this.scaleFactor);
            if (id != -1) {
                _this.id = id;
            }
            else {
                _this.id = Card.nextId++;
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
            _this.inputEnableChildren = true;
            _this.onChildInputDown.add(_this.onMouseDown, _this);
            _this.cardFront = state.add.sprite(0, 0, "cards", _this.name, _this);
            _this.cardBack = state.add.sprite(0, 0, "cards", "cardBackground", _this);
            _this.cardSelected = state.add.sprite(0, 0, "cards", "cardSelected", _this);
            _this.isFaceUp = isFaceUp;
            _this.isSelected = false;
            _this.isSelectable = false;
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
        Object.defineProperty(Card.prototype, "isSelected", {
            get: function () {
                return this._isSelected;
            },
            set: function (value) {
                if (value && !this.isSelectable) {
                    // can't actual select
                    return;
                }
                this._isSelected = value;
                this.cardSelected.renderable = this.isSelected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "isSelectable", {
            get: function () {
                return this._isSelectable;
            },
            set: function (value) {
                this._isSelectable = value;
                if (this.isSelectable) {
                    this.ignoreChildInput = false;
                    this.cardFront.input.draggable = true;
                    this.cardSelected.input.draggable = true;
                }
                else {
                    this.ignoreChildInput = true;
                    this.cardFront.input.draggable = false;
                    this.cardSelected.input.draggable = false;
                }
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
        Card.prototype.onMouseDown = function (sprite) {
            if (this.isSelectable) {
                this.curStack.cardTapped(this, false);
            }
        };
        Card.prototype.toString = function () {
            return this.name + "[" + this.value + "] " + this.id;
        };
        Card.nextId = 1000;
        return Card;
    }(Phaser.Group));
    Wordily.Card = Card;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=card.js.map