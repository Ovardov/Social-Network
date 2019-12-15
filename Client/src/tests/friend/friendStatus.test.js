import React from 'react'
import renderer from 'react-test-renderer';
import FriendStatus from '../../components/FriendStatus/FriendStatus';

describe('FriendStatus component', () => {
    test('should render remove button if is friends', () => {
        const component = renderer.create(
            <FriendStatus isFriends={true} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render add button if is not friends', () => {
        const component = renderer.create(
            <FriendStatus isFriends={true} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
})
