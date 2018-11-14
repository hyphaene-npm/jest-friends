export const createReducerCase = (name, action, injectedPayload = {}, argsPayload = null) => ({
	name,
	action,
	type: action().type,
	injectedPayload,
	argsPayload,
});

export const testReducerCases = (
	reducer,
	cases,
	defaultState,
	defaultInstance,
	otherInstance,
	isID = true
) => {
	const id = 'id';
	cases.forEach(({ name, injectedPayload, action, argsPayload, type }) => {
		describe(name, () => {
			it(`should handle ${type}`, () => {
				const args = isID ? [id] : [];
				if (argsPayload) {
					args.push(argsPayload);
				}
				const resultWithID = {
					[id]: {
						...defaultInstance,
						...injectedPayload,
					},
					...otherInstance,
				};

				const resultWithoutID = {
					...defaultInstance,
					...injectedPayload,
				};
				const result = isID ? resultWithID : resultWithoutID;
				expect(reducer(defaultState, action(...args))).toEqual(result);
			});
		});
	});
};

export const testInitialState = reducer =>
	describe('initial state', () => {
		it('should match', () => {
			expect(reducer(undefined, {})).toEqual({});
		});
	});

export const testDestroyInstance = (reducer, defaultState, destroy, otherInstance) =>
	describe('destroy instance', () => {
		it('should detroy the key on the state', () => {
			const id = 'id';
			expect(reducer(defaultState, destroy(id))).toEqual(otherInstance);
		});
	});

export const otherInstance = { IDbis: {} };

export const getInstanceID = defaultInstance => ({ id: defaultInstance });
