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

import { repeat } from 'lodash';
import { i18n } from '@kbn/i18n';

const endOfInputText = i18n.translate('kbnESQuery.kql.errors.endOfInputText', {
  defaultMessage: 'end of input',
});

export class KQLSyntaxError extends Error {
  constructor(error, expression) {
    const grammarRuleTranslations = {
      fieldName: i18n.translate('kbnESQuery.kql.errors.fieldNameText', {
        defaultMessage: 'field name',
      }),
      value: i18n.translate('kbnESQuery.kql.errors.valueText', {
        defaultMessage: 'value',
      }),
      literal: i18n.translate('kbnESQuery.kql.errors.literalText', {
        defaultMessage: 'literal',
      }),
      whitespace: i18n.translate('kbnESQuery.kql.errors.whitespaceText', {
        defaultMessage: 'whitespace',
      }),
    };

    const translatedExpectations = error.expected.map(expected => {
      return grammarRuleTranslations[expected.description] || expected.description;
    });

    const translatedExpectationText = translatedExpectations.join(', ');

    const message = i18n.translate('kbnESQuery.kql.errors.syntaxError', {
      defaultMessage: 'Expected {expectedList} but {foundInput} found.',
      values: {
        expectedList: translatedExpectationText,
        foundInput: error.found ? `"${error.found}"` : endOfInputText,
      },
    });

    const fullMessage = [message, expression, repeat('-', error.location.start.offset) + '^'].join(
      '\n'
    );

    super(fullMessage);
    this.name = 'KQLSyntaxError';
    this.shortMessage = message;
  }
}
