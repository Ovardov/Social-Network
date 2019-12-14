import React from 'react';
import renderer from 'react-test-renderer';
import PublicHomePage from '../../components/HomePage/PublicHomePage/PublicHomePage';

jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('PublicHomePage component', () => {
    test('should render correctly if user is not logged', () => {

        const component = renderer.create(
            <PublicHomePage />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

});