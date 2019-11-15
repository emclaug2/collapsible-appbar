import React from 'react';
import renderer from 'react-test-renderer';

import {Content} from '../App';

describe('App Tests ', function () {
    it('App Renders', () => {
        const tree = renderer.create(
            <Content />
        ).toJSON();
        console.log("tree", tree)
        expect(tree).toMatchSnapshot();
    });
});
