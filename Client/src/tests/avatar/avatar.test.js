import React from 'react'
import renderer from 'react-test-renderer';
import Avatar from '../../components/Avatar/Avatar';

jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('Avatar component', () => {
    test('should render correcly with given image, name and username', () => {
        const component = renderer.create(
            <Avatar username="Ovardov" name="Aleksandar Ovardov" profilePicture="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576368427/cxfz26hn4gxeg36cv56q.jpg"/>
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
})
