/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

jest.useFakeTimers();

import React from 'react';
import { render, mount } from 'enzyme';
import { VisualizationChart } from './visualization_chart';

let renderPromise;

class VisualizationStub {
  constructor(el, vis) {
    this.el = el;
    this.vis = vis;
  }

  render() {
    renderPromise = new Promise(resolve => {
      this.el.textContent = this.vis.params.markdown;
      resolve();
    });

    return renderPromise;
  }
}

describe('<VisualizationChart/>', () => {
  const vis = {
    type: {
      title: 'Test Visualization',
      visualization: VisualizationStub,
    },
    params: {
      markdown:
        'This is a test of the [markdown](http://daringfireball.net/projects/markdown) vis.',
    },
  };

  it('should render initial html', () => {
    const wrapper = render(<VisualizationChart vis={vis} listenOnChange={true} />);
    expect(wrapper.text()).toBe('Test Visualization visualization, not yet accessible');
  });

  it('should emit render start and render end', async () => {
    const renderStart = jest.fn();
    const renderComplete = jest.fn();
    const domNode = document.createElement('div');
    domNode.addEventListener('renderStart', renderStart);
    domNode.addEventListener('renderComplete', renderComplete);

    mount(<VisualizationChart vis={vis} />, {
      attachTo: domNode,
    });

    jest.runAllTimers();
    await renderPromise;
    expect(renderStart).toHaveBeenCalledTimes(1);
    expect(renderComplete).toHaveBeenCalledTimes(1);
  });

  it('should render visualization', async () => {
    const wrapper = mount(<VisualizationChart vis={vis} />);
    jest.runAllTimers();
    await renderPromise;
    expect(wrapper.find('.visChart').text()).toMatch(/markdown/);
  });

  it('should re-render on param change', async () => {
    const renderComplete = jest.fn();
    const wrapper = mount(<VisualizationChart vis={vis} />);
    const domNode = wrapper.getDOMNode();
    domNode.addEventListener('renderComplete', renderComplete);
    jest.runAllTimers();
    await renderPromise;
    expect(renderComplete).toHaveBeenCalledTimes(1);

    vis.params.markdown = 'new text';
    wrapper.setProps({ vis });
    jest.runAllTimers();
    await renderPromise;

    expect(wrapper.find('.visChart').text()).toBe('new text');
    expect(renderComplete).toHaveBeenCalledTimes(2);
  });
});
