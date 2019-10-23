import React from 'react';
import { shallow } from 'enzyme';
import Chips from '../Chips';
import { wrap } from 'module';

describe('chips', () => {
	const saveCallback = jest.fn();
	const props = {
		chips: [],
		title: 'component title',
		save: saveCallback,
		placeholder: 'component input placeholder',
		pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
		required: true
	};

	const mockChips = [
		{ email: 'react@gmail.com', valid: true, key: '1' },
		{ email: 'javascript@gmail.com', valid: true, key: '2' },
		{ email: 'scss@gmail.com', valid: true, key: '3' }
	];

	test('should render', () => {
		expect(shallow(<Chips {...props} />)).toHaveLength(1);
	});

	describe('focus input', () => {
		test('should set focus on input when clicking inside chips container', () => {
			const wrapper = shallow(<Chips {...props} />);
			wrapper.instance().focusInput = jest.fn();
			wrapper
				.find('.chips')
				.at(0)
				.simulate('click');
			expect(wrapper.instance().focusInput).toHaveBeenCalled();
		});
	});

	describe('set chips', () => {
		test('should set chips when component renders', () => {
			const spy = jest.spyOn(Chips.prototype, 'setChips');
			const wrapper = shallow(<Chips {...props} chips={mockChips} />);
			expect(wrapper.instance().setChips).toHaveBeenCalledWith(mockChips, false);
			spy.mockRestore();
		});

		test('should set state and not call save callback', () => {
			const saveCallback = jest.fn();
			const wrapper = shallow(<Chips {...props} save={saveCallback} />);
			expect(wrapper.state('chips')).toHaveLength(0);
			wrapper.instance().setChips(mockChips);
			expect(wrapper.state('chips')).toHaveLength(3);
			expect(saveCallback).not.toHaveBeenCalled();
		});

		test('should set state and call save callback', () => {
			const saveCallback = jest.fn();
			const wrapper = shallow(<Chips {...props} save={saveCallback} />);
			expect(wrapper.state('chips')).toHaveLength(0);
			wrapper.instance().setChips(mockChips, true);
			expect(wrapper.state('chips')).toHaveLength(3);
			expect(saveCallback).toHaveBeenCalledTimes(1);
		});

		test('get valid chips', () => {
			const mock = mockChips.concat([{ email: 'fsdfsdfds', valid: false, key: 10 }]);
			const wrapper = shallow(<Chips {...props} />);
			const result = wrapper.instance().getValidChips(mock);
			expect(result).toHaveLength(3);
		});
	});

	describe('on key down', () => {
		let updateChipsSpy, deleteChipsSpy, wrapper;

		beforeAll(() => {
			updateChipsSpy = jest.spyOn(Chips.prototype, 'updateChips');
			deleteChipsSpy = jest.spyOn(Chips.prototype, 'deleteChip');
		});

		afterAll(() => {
			updateChipsSpy.mockRestore();
			deleteChipsSpy.mockRestore();
		});

		beforeEach(() => {
			wrapper = shallow(<Chips {...props} />);
		});
		afterEach(() => {
			updateChipsSpy.mockClear();
			deleteChipsSpy.mockClear();
		});

		test('clear required validation', () => {
			wrapper.setState({
				requiredValidation: true
			});
			expect(wrapper.state('requiredValidation')).toBe(true);
			wrapper.instance().clearRequiredValidation();
			expect(wrapper.state('requiredValidation')).toBe(false);
		});

		test('should clear required validation', () => {
			const event = { which: 64, target: { value: '' } };
			wrapper.instance().clearRequiredValidation = jest.fn();
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().clearRequiredValidation).toHaveBeenCalledTimes(1);
		});

		test('should call update chips with enter key', () => {
			const event = { which: 13, target: { value: '' }, preventDefault: jest.fn() };
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().updateChips).toHaveBeenCalledWith(event);
		});

		test('should call update chips with tab key', () => {
			const event = { which: 9, target: { value: 'tmp' }, preventDefault: jest.fn() };
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().updateChips).toHaveBeenCalledWith(event);
		});

		test('should not call update chips if tab key was pressed with no value', () => {
			const event = { which: 9, target: { value: '' }, preventDefault: jest.fn() };
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().updateChips).not.toHaveBeenCalled();
		});

		test('should call delete chip if backspace was clicked and there is chips and value is null', () => {
			const event = { which: 8, target: { value: '' } };
			wrapper.instance().setChips(mockChips);
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().deleteChip).toHaveBeenCalled();
		});

		test('should not call delete chip if backspace was clicked and value is not null', () => {
			const event = { which: 8, target: { value: 'value' } };
			wrapper.instance().setChips(mockChips);
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().deleteChip).not.toHaveBeenCalled();
		});

		test('should not call delete chip if backspace was clicked and there is no chips', () => {
			const event = { which: 8, target: { value: '' } };
			wrapper.instance().onKeyDown(event);
			expect(wrapper.instance().deleteChip).not.toHaveBeenCalled();
		});
	});

	describe('delete chip', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = shallow(<Chips {...props} />);
		});

		test('should return undefined if there no removedChip', () => {
			const result = wrapper.instance().deleteChip(undefined);
			expect(result).toBe(undefined);
		});

		test('should set requiredValidation if prop required and removed chip is valid and there is only one valid email', () => {
			wrapper.setState({ requiredValidation: false });
			wrapper.instance().setChips(mockChips.slice(2));
			wrapper.instance().deleteChip(mockChips[2]);
			expect(wrapper.state('requiredValidation')).toBe(true);
		});

		test('should not  set requiredValidation if prop required is false', () => {
			wrapper.setState({ requiredValidation: false });
			wrapper.setProps({ required: false });
			wrapper.instance().setChips(mockChips.slice(2));
			wrapper.instance().deleteChip(mockChips[2]);
			expect(wrapper.state('requiredValidation')).toBe(false);
		});

		test('should not set requiredValidation if email is not valid', () => {
			wrapper.setState({ requiredValidation: false });
			const chips = mockChips.map((chip, index) => ({ ...chip, valid: Boolean(index % 2) }));
			wrapper.setState({ requiredValidation: false });
			wrapper.instance().setChips(chips);
			wrapper.instance().deleteChip(chips[0]);
			expect(wrapper.state('requiredValidation')).toBe(false);
		});

		test('should not set requiredValidation if there is more then one email', () => {
			wrapper.setState({ requiredValidation: false });
			const chips = mockChips.map((chip, index) => ({ ...chip, valid: Boolean(!(index % 2)) }));

			wrapper.instance().setChips(chips);
			wrapper.instance().deleteChip(chips[0]);
			expect(wrapper.state('requiredValidation')).toBe(false);
		});

		test('should call setChips with the new list and save flag true', () => {
			wrapper.instance().setChips(mockChips);
			wrapper.instance().setChips = jest.fn();
			wrapper.instance().deleteChip(mockChips[0]);

			expect(wrapper.instance().setChips).toHaveBeenCalledWith(mockChips.slice(1), true);
		});

		test('should call setChips with the new list and save flag false', () => {
			const newMockChips = [...mockChips];
			newMockChips[0] = { ...newMockChips[0], valid: false };
			wrapper.instance().setChips(newMockChips);
			wrapper.instance().setChips = jest.fn();
			wrapper.instance().deleteChip(newMockChips[0]);

			expect(wrapper.instance().setChips).toHaveBeenCalledWith(newMockChips.slice(1), false);
		});
	});

	describe('is only one valid chip', () => {
		test('should return true when only one chip is valid', () => {
			const wrapper = shallow(<Chips {...props} />);
			const chips = mockChips.map((chip, index) => ({ ...chip, valid: Boolean(index % 2) }));
			wrapper.instance().setChips(chips);
			const result = wrapper.instance().isOnlyOneValidChip();
			expect(result).toBe(true);
		});

		test('should return false when more then  one chip is valid', () => {
			const wrapper = shallow(<Chips {...props} />);
			const chips = mockChips.map((chip, index) => ({ ...chip, valid: Boolean(!(index % 2)) }));
			wrapper.instance().setChips(chips);
			const result = wrapper.instance().isOnlyOneValidChip();
			expect(result).toBe(false);
		});
	});

	describe('updateChips', () => {
		let instance;
		beforeEach(() => {
			instance = shallow(<Chips {...props} chips={mockChips} />).instance();
			instance.setChips = jest.fn();
		});

		test('should return undefined when value is empty', () => {
			const event = { target: { value: '' } };
			const result = instance.updateChips(event);
			expect(result).toBe(undefined);
		});

		test('should return undefined if chip already exists', () => {
			const event = { target: { value: 'react@gmail.com' } };
			const result = instance.updateChips(event);
			expect(result).toBe(undefined);
		});

		test('should set valid as true when props.pattern is undefined', () => {
			const event = { target: { value: 'tmpexamplecom' } };
			const newProps = { ...props };
			delete newProps.pattern;
			instance = shallow(<Chips {...newProps} chips={mockChips} />).instance();
			instance.setChips = jest.fn();

			instance.updateChips(event);
			const [[lastCall]] = instance.setChips.mock.calls.slice(-1);

			const [chip] = lastCall.slice(-1);
			expect(chip.email).toEqual('tmpexamplecom');
			expect(chip.valid).toBe(true);
			expect(true).toBe(true);
		});

		test('should add new valid chip ', () => {
			const event = { target: { value: 'tmp@example.com' } };
			instance.updateChips(event);
			const [[lastCall]] = instance.setChips.mock.calls.slice(-1);

			const [chip] = lastCall.slice(-1);
			expect(chip.email).toEqual('tmp@example.com');
			expect(chip.valid).toBe(true);
		});

		test('should add new invalid chip', () => {
			const event = { target: { value: 'tmpexamplecom' } };
			instance.updateChips(event);
			const [[lastCall]] = instance.setChips.mock.calls.slice(-1);

			const [chip] = lastCall.slice(-1);

			expect(chip.email).toEqual('tmpexamplecom');
			expect(chip.valid).toBe(false);
		});
	});
});
