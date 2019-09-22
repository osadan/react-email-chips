'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChipsList = function (_Component) {
	_inherits(ChipsList, _Component);

	function ChipsList() {
		_classCallCheck(this, ChipsList);

		return _possibleConstructorReturn(this, (ChipsList.__proto__ || Object.getPrototypeOf(ChipsList)).apply(this, arguments));
	}

	_createClass(ChipsList, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return this.props.chips.length !== nextProps.chips.length;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return this.props.chips.map(function (chip) {
				return _react2.default.createElement(
					'span',
					{ className: (0, _classnames2.default)({ chip: true, "not-valid": !chip.valid }), key: chip.key },
					_react2.default.createElement(
						'span',
						{ className: 'chip-value' },
						chip.email
					),
					_react2.default.createElement(
						'button',
						{ type: 'button',
							className: (0, _classnames2.default)({ "chip-delete-button": true }),
							onClick: function onClick() {
								return _this2.props.onChipClick(chip);
							} },
						_react2.default.createElement(
							'span',
							null,
							'x'
						)
					)
				);
			});
		}
	}]);

	return ChipsList;
}(_react.Component);

exports.default = ChipsList;