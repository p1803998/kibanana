/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { EuiCodeEditor } from '@elastic/eui';

import 'brace/theme/textmate';

export class ShowJson extends React.PureComponent {
  componentWillMount() {
    this.props.loadIndexData(this.props);
  }
  componentWillUpdate(newProps) {
    const { data, loadIndexData } = newProps;
    if (!data) {
      loadIndexData(newProps);
    }
  }
  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const json = JSON.stringify(data, null, 2);
    return (
      <EuiCodeEditor
        mode="json"
        theme="textmate"
        isReadOnly
        setOptions={{ maxLines: Infinity }}
        value={json}
        editorProps={{
          $blockScrolling: Infinity,
        }}
      />
    );
  }
}
