/* global expect */
export const createActionID = (type, id, payload = null) => {
	const meta = {
		id,
	};
	const expectedAction = {
		type,
		meta,
	};
	if (payload) {
		expectedAction.payload = payload;
	}
	return expectedAction;
};

export const createAction = (type, payload = null) => {
	const expectedAction = {
		type,
	};
	if (payload) {
		expectedAction.payload = payload;
	}
	return expectedAction;
};

export const createActionCase = (name, action, payload = undefined) => ({
	action,
	type: action().type,
	name,
	payload,
});

export const testActionCases = (types, casesToTests, isID = true) => {
	const id = 'id';

	casesToTests.forEach(({ action, type, name, payload = undefined }) => {
		const args = isID ? [id] : [];
		if (typeof payload !== 'undefined') {
			args.push(payload);
		}
		describe(name, () => {
			it(`should handle ${type}`, () => {
				const expectedAction = isID
					? createActionID(type, ...args)
					: createAction(type, ...args);
				expect(action(...args)).toEqual(expectedAction);
			});
		});
	});
};
