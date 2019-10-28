import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('App Tests ', function () {
    it('App Renders', () => {
        const tree = renderer.create(
            <App />
        ).toJSON();
        console.log("tree", tree)
        expect(tree).toMatchSnapshot();
    });
});
