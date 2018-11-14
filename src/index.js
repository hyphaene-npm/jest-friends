import { createActionID, createAction, createActionCase, testActionCases } from './testAction';
import {
	getSnap,
	testSnapMatching,
	testMapDispatchToProps,
	testMapStateToProps,
	testMapStateToPropsFactory,
	testWillMountOnly,
	returnNewComponent,
	testWillMountAndUnMount,
} from './testComponent';

import {
	createReducerCase,
	testReducerCases,
	testInitialState,
	testDestroyInstance,
	otherInstance,
	getInstanceID,
} from './testReducer';

import {
	createCaseSelector,
	testSelectorsWithStates,
	createCaseInstance,
	testSelectors,
	testSelectorInstance,
} from './testSelector';

export {
	createActionID,
	createAction,
	createActionCase,
	testActionCases,
	getSnap,
	testSnapMatching,
	testMapDispatchToProps,
	testMapStateToProps,
	testMapStateToPropsFactory,
	testWillMountOnly,
	returnNewComponent,
	testWillMountAndUnMount,
	createReducerCase,
	testReducerCases,
	testInitialState,
	testDestroyInstance,
	otherInstance,
	getInstanceID,
	createCaseSelector,
	testSelectorsWithStates,
	createCaseInstance,
	testSelectors,
	testSelectorInstance,
};
