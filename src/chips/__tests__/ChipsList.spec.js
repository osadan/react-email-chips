import React from 'react';
import { shallow } from 'enzyme';
import ChipsList from '../ChipsList';

const chipsList = [
	{
		email:'tmp@example.com',
		valid:true,
		key:'1'
	},
	{
		email:'tmp-2@example.com',
		valid:true,
		key:'2'
	},
	{
		email:'bad-email-value',
		valid:false,
		key:'3'
	},
]
describe('ChipsList', () => {
	test('should render', () => {
		expect(shallow(<ChipsList chips={chipsList} />)).toHaveLength(1);
	})
	
	test('should set valid / invalid email', () => {
		const wrapper = shallow(<ChipsList chips={chipsList} />);
		expect(wrapper.find('.chip').at(0).find('.not-valid')).toHaveLength(0);
		expect(wrapper.find('.chip').at(1).find('.not-valid')).toHaveLength(0);
		expect(wrapper.find('.chip').at(2).find('.not-valid')).toHaveLength(1);
	})

	test('should respond to click with chip', () => {
		const callback = jest.fn();
		const wrapper = shallow(<ChipsList chips={chipsList} onChipClick={callback} />);
		wrapper.find('.chip').at(0).find('button').first().props().onClick();
		expect(callback).toHaveBeenCalled();
		expect(callback).toHaveBeenCalledWith(chipsList[0]);
	})

	test('component should not render when passing same props', () => {
		const spy = jest.spyOn(ChipsList.prototype, 'render');
		const wrapper = shallow(<ChipsList chips={chipsList} />);
		expect(wrapper.find('.chip')).toHaveLength(3);
		wrapper.setProps({chips: chipsList });
		expect(ChipsList.prototype.render).toHaveBeenCalled();
		spy.mockRestore();
	})

	test('component should render when passing different props', () => {
		const wrapper = shallow(<ChipsList chips={chipsList} />);
		const spy = jest.spyOn(ChipsList.prototype, 'render');
		expect(wrapper.find('.chip')).toHaveLength(3);
		wrapper.setProps({chips: chipsList.slice(0,1) });
		expect(ChipsList.prototype.render).toHaveBeenCalled();
		spy.mockRestore();
	})
})