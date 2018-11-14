export const caseSelectorBuilder = (
	name,
	selector,
	expected,
	defaultValue = undefined,
	hasID = true
) => ({
	name,
	selector,
	expected,
	defaultValue,
	hasID,
});

export const testOnSelectors = (tests, stateWithCurrent, stateWithDefault, memoized = false) =>
	tests.forEach(({ name, selector, expected, defaultValue, hasID }) => {
		describe(name, () => {
			const id = 'id';
			it('should return the current value', () => {
				const args = hasID ? [stateWithCurrent, id] : [stateWithCurrent];
				const computed = memoized ? selector()(...args) : selector(...args);
				expect(computed).toBe(expected);
			});
			it('should return the default Value', () => {
				const args = hasID ? [stateWithDefault, id] : [stateWithDefault];
				const computed = memoized ? selector()(...args) : selector(...args);
				expect(computed).toEqual(defaultValue);
			});
		});
	});

export const caseInstanceBuilder = (name, instanceSelector, expectedValue) => ({
	name,
	instanceSelector,
	expectedValue,
});
export const testOnInstancesSelectors = (tests, expectedCurrent) =>
	tests.forEach(({ name, instanceSelector, expectedValue }) => {
		describe(name, () => {
			it('should return the current value', () => {
				const computed = instanceSelector(expectedCurrent);
				expect(computed).toEqual(expectedValue);
			});
		});
	});

export const testSelectorInstance = (
	name,
	selector,
	stateWithCurrent,
	stateWithDefault,
	expectedCurrent,
	defaultInstanceValue = {}
) => {
	const id = 'id';
	describe(name, () => {
		it('should return the current instance', () => {
			const computed = selector(stateWithCurrent, id);
			expect(computed).toEqual(expectedCurrent);
		});
		it('should return the default value of instance', () => {
			const computed = selector(stateWithDefault, 'wrongTestID');
			expect(computed).toEqual(defaultInstanceValue);
		});
	});
};
