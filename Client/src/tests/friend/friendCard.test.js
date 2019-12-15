import React from 'react'
import renderer from 'react-test-renderer';
import FriendCard from '../../components/Friend/FriendCard/FriendCard';

jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('FriendCard component', () => {
    test('should render correcly with given data when is not in last friends', () => {
        const component = renderer.create(
            <FriendCard
                username="Ovardov"
                name="Aleksandar Ovardov"
                profilePicture="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576368427/cxfz26hn4gxeg36cv56q.jpg"
                home="Plovdiv"
                lastFriends={false}/>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render correcly with given data when is last friends', () => {
        const component = renderer.create(
            <FriendCard
                username="Ovardov"
                name="Aleksandar Ovardov"
                profilePicture="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576368427/cxfz26hn4gxeg36cv56q.jpg"
                home="Plovdiv"
                lastFriends={true}/>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render correcly with given data without home', () => {
        const component = renderer.create(
            <FriendCard
                username="Ovardov"
                name="Aleksandar Ovardov"
                profilePicture="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576368427/cxfz26hn4gxeg36cv56q.jpg"
                lastFriends={false}/>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
})
