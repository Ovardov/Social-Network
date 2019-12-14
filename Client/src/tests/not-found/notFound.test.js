import React from 'react'
import renderer from 'react-test-renderer';
import NotFound from '../../components/NotFound/NotFound';


jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('NotFound component', () => {
    test('should render correctly', () => {
        const component = renderer.create(
            <NotFound />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
})
