import React from 'react'
import renderer from 'react-test-renderer';
import SocialAnalytics from '../../components/SocialAnalytics/SocialAnalytics';

jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('SocialAnalytics component', () => {
    test('should render 0 likes and 0 comments', () => {
        const component = renderer.create(
            <SocialAnalytics likes={[]} comments={[]} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render 5 likes and 0 comments', () => {
        const component = renderer.create(
            <SocialAnalytics likes={['first', 'second', 'third', 'fourth', 'fifth']} comments={[]} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render 0 likes and 5 comments', () => {
        const component = renderer.create(
            <SocialAnalytics likes={[]} comments={['first', 'second', 'third', 'fourth', 'fifth']} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });


    test('should render 5 likes and 5 comments', () => {
        const component = renderer.create(
            <SocialAnalytics
                likes={['first', 'second', 'third', 'fourth', 'fifth']}
                comments={['first', 'second', 'third', 'fourth', 'fifth']} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
})
