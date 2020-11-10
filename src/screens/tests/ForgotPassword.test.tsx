import { shallow } from 'enzyme';
import * as React from 'react';
import { IntlProps } from '../../index';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../modules';
import { ForgotPasswordScreen } from '../ForgotPassword';

const store = createStore(rootReducer);
const ForgotPassword = connect()(ForgotPasswordScreen);

const setup = (props: Partial<IntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <ForgotPassword />
        </Provider>,
    );

describe('ForgotPasswordScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
