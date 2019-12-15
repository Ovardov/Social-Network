import React from 'react'
import renderer from 'react-test-renderer';
import GalleryCard from '../../components/Gallery/GalleryCard/GalleryCard';

jest.mock("react-router-dom", () => ({
    Link: "Link"
}));

describe('GalleryCard component', () => {
    test('should render correcly with given data', () => {
        const component = renderer.create(
            <GalleryCard
                image="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576368427/cxfz26hn4gxeg36cv56q.jpg"
                describe="Aleksandar Ovardov"
            />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

});