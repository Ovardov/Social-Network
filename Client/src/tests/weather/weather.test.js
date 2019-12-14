import React from 'react'
import renderer from 'react-test-renderer';
import Weather from '../../components/Weather/Weather';

jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('Weather component', () => {
    test('should render weather for Sofia', () => {
        const component = renderer.create(
            <Weather />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
})
