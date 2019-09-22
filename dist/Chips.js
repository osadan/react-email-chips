'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ChipsList = require('./ChipsList');

var _ChipsList2 = _interopRequireDefault(_ChipsList);

require('./chips.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chips = function (_Component) {
	_inherits(Chips, _Component);

	function Chips(props) {
		_classCallCheck(this, Chips);

		var _this = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, props));

		_this.state = {
			chips: [],
			KEY: {
				backspace: 8,
				tab: 9,
				enter: 13
			}
		};
		return _this;
	}

	_createClass(Chips, [{
		key: 'focusInput',
		value: function focusInput(event) {
			var children = event.target.children;

			if (children.length) {
				children[children.length - 1].focus();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setChips(this.props.chips, false);
		}
	}, {
		key: 'setChips',
		value: function setChips(chips, save) {
			if (chips && chips.length) {
				this.setState({ chips: chips });
				if (save) {
					this.props.save(this.getValidChips(chips));
				}
			}
		}
	}, {
		key: 'getValidChips',
		value: function getValidChips(chips) {
			return chips.filter(function (chip) {
				return chip.valid;
			});
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(event) {
			var keyPressed = event.which;
			this.clearRequiredValidation();
			if (keyPressed === this.state.KEY.enter || keyPressed === this.state.KEY.tab && event.target.value) {
				event.preventDefault();
				this.updateChips(event);
			} else if (keyPressed === this.state.KEY.backspace) {
				var chips = this.state.chips;

				if (!event.target.value && chips.length) {
					this.deleteChip(chips[chips.length - 1]);
				}
			}
		}
	}, {
		key: 'clearRequiredValidation',
		value: function clearRequiredValidation() {
			this.setState({
				requiredValidation: false
			});
		}
	}, {
		key: 'deleteChip',
		value: function deleteChip(removedChip) {
			if (!removedChip) {
				return;
			}
			if (this.props.required && removedChip.valid && this.isOnlyOneValidChip()) {
				this.setState({
					requiredValidation: true
				});
				return;
			}

			var chips = this.state.chips.filter(function (chip) {
				return chip.key !== removedChip.key;
			});

			this.setChips(chips, removedChip.valid);
			return true;
		}
	}, {
		key: 'isOnlyOneValidChip',
		value: function isOnlyOneValidChip() {
			return this.getValidChips(this.state.chips).length <= 1;
		}
	}, {
		key: 'updateChips',
		value: function updateChips(event) {
			var value = event.target.value;

			if (!value) {
				return;
			}

			var chipValue = value.trim().toLowerCase();

			// check if it is already exists

			var _state$chips$filter = this.state.chips.filter(function (chip) {
				return chip.value === chipValue;
			}),
			    _state$chips$filter2 = _slicedToArray(_state$chips$filter, 1),
			    chipExists = _state$chips$filter2[0];

			if (chipExists) {
				// @todo maybe get/set it on state
				event.target.value = '';
				return;
			}

			var valid = this.props.pattern ? this.props.pattern.test(chipValue) : true;
			var chips = this.state.chips.concat([{ email: chipValue, valid: valid, key: Date.now() }]);

			this.setChips(chips, valid);

			event.target.value = '';
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var placeholder = !this.props.max || this.state.chips.length < this.props.max ? this.props.placeholder : '';

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'chips-header' },
					_react2.default.createElement(
						'span',
						{ className: 'chips-title' },
						this.props.title
					),
					_react2.default.createElement(
						'span',
						{
							className: (0, _classnames2.default)({
								'chips-required-validation-message': true,
								visible: this.state.requiredValidation,
								hidden: !this.state.requiredValidation
							})
						},
						'* At least one valid email is required'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'chips', onClick: function onClick(e) {
							return _this2.focusInput(e);
						} },
					_react2.default.createElement(_ChipsList2.default, { chips: this.state.chips, onChipClick: function onChipClick(chip) {
							return _this2.deleteChip(chip);
						} }),
					_react2.default.createElement('input', {
						type: 'text',
						className: 'chips-input',
						onFocus: function onFocus() {
							return _this2.clearRequiredValidation();
						},
						placeholder: placeholder,
						onKeyDown: function onKeyDown(e) {
							return _this2.onKeyDown(e);
						}
					})
				)
			);
		}
	}]);

	return Chips;
}(_react.Component);

Chips.propTypes = {
	chips: _propTypes2.default.array,
	title: _propTypes2.default.string,
	save: _propTypes2.default.func,
	placeholder: _propTypes2.default.string,
	pattern: _propTypes2.default.instanceOf(RegExp)
};

exports.default = Chips;