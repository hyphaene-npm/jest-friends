import renderer from 'react-test-renderer';
import React from 'react';
// usefull to get the snap and being able to combine different objects as props
// example : const specialSnap = getSnap(List, props, overridingProps)
export const getSnap = (Component, ...someProps) => {
	let props = {};
	if (someProps.length > 1) {
		someProps.reduce((accumulator, current) => Object.assign(accumulator, current), props);
	} else {
		[props] = someProps;
	}

	return renderer.create(<Component {...props} />).toJSON();
};

export const testSnapMatching = (...snaps) => {
	describe('Snap', () => {
		snaps.forEach(snap => {
			it('should match snapshot', () => {
				expect(snap).toMatchSnapshot();
			});
		});
	});
};

export const testMapDispatchToProps = (
	mockProps,
	propsFromDispatch,
	mapDispatchToProps,
	bindActionCreators
) =>
	describe('mapDispatchToProps', () => {
		describe('should call bindActionCreators', () => {
			const dispatch = 'dispatch';

			mapDispatchToProps(dispatch, propsFromDispatch);
			it('with proper mapping', () => {
				const [[call]] = bindActionCreators.mock.calls;
				expect(call).toMatchObject(mockProps);
			});
			it('with dispatch as second arg', () => {
				expect(bindActionCreators.mock.calls[0][1]).toBe(dispatch);
			});
		});
	});

export const testMapStateToProps = (
	mapStateToProps,
	selectors,
	propsKey = null,
	ownProps = {},
	memoized = false
) =>
	describe('mapStateToProps', () => {
		const id = 'id';
		const props = {
			...ownProps,
			id,
		};
		const state = {
			commons: {
				transitioners: {},
				DateRange: {
					[id]: {},
				},
			},
			auth: {
				profile: {
					localization: 'local',
					timezone: 'time',
				},
			},
			userProfile: {
				localizations: [],
				timezones: [],
				currentTimezone: 'time',
				currentLocalization: 'local',
			},
			layout: {
				toolbar: {},
			},
			adminPage: {},
			form: {},
		};
		const selectorKeysValues = Object.entries(selectors);
		mapStateToProps(state, props);
		const args = [state];
		if (propsKey) {
			args.push(props[propsKey]);
		}
		selectorKeysValues.forEach(([key, selector]) => {
			it(`should ${key} to have been called with state`, () => {
				if (memoized) {
					expect(selector).toHaveBeenCalled();
				} else {
					expect(selector).toHaveBeenCalledWith(...args);
				}
			});
		});
		if (memoized) {
			const memoizedKeysValues = Object.entries(memoized);
			memoizedKeysValues.forEach(([key, memoizedSelector]) => {
				it(`should ${key} to have been called with state`, () => {
					expect(memoizedSelector).toHaveBeenCalledWith(...args);
				});
			});
		}
	});

export const testMapStateToPropsFactory = mapStateToPropsFactory =>
	describe('mapStateToPropsFactory', () => {
		it('returns a function', () => {
			expect(mapStateToPropsFactory()).toBeInstanceOf(Function);
		});
	});

export const testWillMountOnly = (component, argForMount = null) => {
	describe('componentWillMount', () => {
		it('should call onInit ', () => {
			component.componentWillMount();
			if (argForMount) {
				expect(component.props.onInit).toHaveBeenCalledWith(argForMount);
			} else {
				expect(component.props.onInit).toHaveBeenCalled();
			}
		});
	});
};

export const returnNewComponent = (ComponentClass, props) =>
	Object.assign(new ComponentClass(), { props });

export const testWillMountAndUnMount = (
	component,
	hasID = true,
	argForMount = null,
	argForUnmount = null
) => {
	const id = 'id';
	const argsMount = [];
	const argsUnMount = [];
	if (hasID) {
		argsMount.push(id);
		argsUnMount.push(id);
	}
	if (argForMount) {
		argsMount.push(argForMount);
	}
	if (argForUnmount) {
		argsUnMount.push(argForUnmount);
	}

	describe('componentWillMount', () => {
		it('should call onInit ', () => {
			component.componentWillMount();
			if (argsMount.length) {
				expect(component.props.onInit).toHaveBeenCalledWith(...argsMount);
			} else {
				expect(component.props.onInit).toHaveBeenCalled();
			}
		});
	});

	describe('componentWillUnmount', () => {
		it('should call onDestroy', () => {
			component.componentWillUnmount();
			if (argsMount.length) {
				expect(component.props.onDestroy).toHaveBeenCalledWith(...argsUnMount);
			} else {
				expect(component.props.onDestroy).toHaveBeenCalled();
			}
		});
	});
};
