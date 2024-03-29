/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

jest.mock('../../../kibana_services', () => ({}));

import React from 'react';
import { shallow } from 'enzyme';

import { UpdateSourceEditor } from './update_source_editor';

const defaultProps = {
  indexPatternId: 'indexPattern1',
  onChange: () => {},
  filterByMapBounds: true,
  tooltipProperties: [],
  sortOrder: 'DESC',
  useTopHits: false,
  topHitsSplitField: 'trackId',
  topHitsSize: 1,
};

test('should render update source editor', async () => {
  const component = shallow(<UpdateSourceEditor {...defaultProps} />);

  expect(component).toMatchSnapshot();
});

test('should enable sort order select when sort field provided', async () => {
  const component = shallow(<UpdateSourceEditor {...defaultProps} sortField="@timestamp" />);

  expect(component).toMatchSnapshot();
});

test('should render top hits form when useTopHits is true', async () => {
  const component = shallow(<UpdateSourceEditor {...defaultProps} useTopHits={true} />);

  expect(component).toMatchSnapshot();
});
