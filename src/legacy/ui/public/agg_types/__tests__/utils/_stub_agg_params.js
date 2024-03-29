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

import _ from 'lodash';
import sinon from 'sinon';
import { BaseParamType } from '../../param_types/base';
import { FieldParamType } from '../../param_types/field';
import { OptionedParamType } from '../../param_types/optioned';
import { createLegacyClass } from '../../../utils/legacy_class';

function ParamClassStub(parent, body) {
  const stub = sinon.spy(
    body ||
      function() {
        stub.Super && stub.Super.call(this);
      }
  );
  if (parent) createLegacyClass(stub).inherits(parent);
  return stub;
}

/**
 * stub all of the param classes, but ensure that they still inherit properly.
 * This method should be passed directly to ngMock.inject();
 *
 * ```js
 * let stubParamClasses = require('./utils/_stub_agg_params');
 * describe('something', function () {
 *   beforeEach(ngMock.inject(stubParamClasses));
 * })
 * ```
 *
 * @param  {PrivateLoader} Private - The private module loader, inject by passing this function to ngMock.inject()
 * @return {undefined}
 */
// eslint-disable-next-line import/no-default-export
export default function stubParamClasses(Private) {
  const BaseAggParam = Private.stub(
    BaseParamType,
    new ParamClassStub(null, function(config) {
      _.assign(this, config);
    })
  );

  Private.stub(FieldParamType, new ParamClassStub(BaseAggParam));

  Private.stub(OptionedParamType, new ParamClassStub(BaseAggParam));
}
