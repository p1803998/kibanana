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

import expect from '@kbn/expect';
import { convertGeoPolygon } from '../geo_polygon';

describe('filter to kuery migration', function() {
  describe('geo_polygon filter', function() {
    it('should return a kuery node equivalent to the given filter', function() {
      const filter = {
        meta: {
          type: 'geo_polygon',
          key: 'foo',
          params: {
            points: [
              {
                lat: 10,
                lon: 20,
              },
              {
                lat: 30,
                lon: 40,
              },
            ],
          },
        },
      };
      const result = convertGeoPolygon(filter);

      expect(result).to.have.property('type', 'function');
      expect(result).to.have.property('function', 'geoPolygon');

      const {
        arguments: [{ value: fieldName }, ...args],
      } = result;
      expect(fieldName).to.be('foo');

      expect(args[0].value).to.be('10, 20');
      expect(args[1].value).to.be('30, 40');
    });

    it('should throw an exception if the given filter is not of type "geo_polygon"', function() {
      const filter = {
        meta: {
          type: 'foo',
        },
      };

      expect(convertGeoPolygon)
        .withArgs(filter)
        .to.throwException(/Expected filter of type "geo_polygon", got "foo"/);
    });
  });
});
