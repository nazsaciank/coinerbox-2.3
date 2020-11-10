import { shallow } from 'enzyme';
import * as React from 'react';
import { IntlProps } from '../../index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../modules';
import { RestrictedScreen } from '../RestrictedScreen';

const store = createStore(rootReducer);

const setup = (props: Partial<IntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <RestrictedScreen />
        </Provider>,
    );

describe('RestrictedScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
