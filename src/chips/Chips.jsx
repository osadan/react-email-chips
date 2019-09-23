import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ChipsList from './ChipsList';
import './chips.scss';

class Chips extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chips: [],
			KEY: {
				backspace: 8,
				tab: 9,
				enter: 13
			}
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.chips.length === 0) {
			return { chips: nextProps.chips };
		}
		return null;
	}

	focusInput(event) {
		let children = event.target.children;

		if (children.length) {
			children[children.length - 1].focus();
		}
	}

	componentDidMount() {
		this.setChips(this.props.chips, false);
	}

	setChips(chips, save) {
		if (chips && chips.length) {
			this.setState({ chips });
			if (save) {
				this.props.save(this.getValidChips(chips));
			}
		}
	}

	getValidChips(chips) {
		return chips.filter(chip => chip.valid);
	}

	onKeyDown(event) {
		const keyPressed = event.which;
		this.clearRequiredValidation();
		if (
			keyPressed === this.state.KEY.enter ||
			(keyPressed === this.state.KEY.tab && event.target.value)
		) {
			event.preventDefault();
			this.updateChips(event);
		} else if (keyPressed === this.state.KEY.backspace) {
			const chips = this.state.chips;

			if (!event.target.value && chips.length) {
				this.deleteChip(chips[chips.length - 1]);
			}
		}
	}

	clearRequiredValidation() {
		this.setState({
			requiredValidation: false
		});
	}

	deleteChip(removedChip) {
		if (!removedChip) {
			return;
		}
		if (this.props.required && removedChip.valid && this.isOnlyOneValidChip()) {
			this.setState({
				requiredValidation: true
			});
			return;
		}

		const chips = this.state.chips.filter(chip => chip.key !== removedChip.key);

		this.setChips(chips, removedChip.valid);
		return true;
	}

	isOnlyOneValidChip() {
		return this.getValidChips(this.state.chips).length <= 1;
	}

	updateChips(event) {
		const value = event.target.value;

		if (!value) {
			return;
		}

		const chipValue = value.trim().toLowerCase();

		// check if it is already exists
		const [chipExists] = this.state.chips.filter(chip => chip.value === chipValue);

		if (chipExists) {
			// @todo maybe get/set it on state
			event.target.value = '';
			return;
		}

		const valid = this.props.pattern ? this.props.pattern.test(chipValue) : true;
		const chips = this.state.chips.concat([{ email: chipValue, valid, key: Date.now() }]);

		this.setChips(chips, valid);

		event.target.value = '';
	}

	render() {
		let placeholder =
			!this.props.max || this.state.chips.length < this.props.max ? this.props.placeholder : '';

		return (
			<div>
				<div className="chips-header">
					<span className="chips-title">{this.props.title}</span>
					<span
						className={classNames({
							'chips-required-validation-message': true,
							visible: this.state.requiredValidation,
							hidden: !this.state.requiredValidation
						})}
					>
						{this.props.requiredMessage}
					</span>
				</div>
				<div className="chips" onClick={e => this.focusInput(e)}>
					<ChipsList chips={this.state.chips} onChipClick={chip => this.deleteChip(chip)} />
					<input
						type="text"
						className="chips-input"
						onFocus={() => this.clearRequiredValidation()}
						placeholder={placeholder}
						onKeyDown={e => this.onKeyDown(e)}
					/>
				</div>
			</div>
		);
	}
}

Chips.propTypes = {
	chips: PropTypes.array,
	title: PropTypes.string,
	save: PropTypes.func,
	placeholder: PropTypes.string,
	pattern: PropTypes.instanceOf(RegExp),
	required: PropTypes.bool,
	requiredMessage: PropTypes.string
};

export default Chips;
