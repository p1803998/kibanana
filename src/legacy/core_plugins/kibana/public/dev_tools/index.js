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

import uiRoutes from 'ui/routes';
import { i18n } from '@kbn/i18n';
import { DevToolsRegistryProvider } from 'ui/registry/dev_tools';
import {
  FeatureCatalogueRegistryProvider,
  FeatureCatalogueCategory,
} from 'ui/registry/feature_catalogue';
import 'ui/directives/kbn_href';
import './directives/dev_tools_app';

uiRoutes.when('/dev_tools', {
  resolve: {
    redirect(Private, kbnUrl) {
      const items = Private(DevToolsRegistryProvider).inOrder;
      kbnUrl.redirect(items[0].url.substring(1));
    },
  },
});

uiRoutes.defaults(/^\/dev_tools(\/|$)/, {
  badge: uiCapabilities => {
    if (uiCapabilities.dev_tools.save) {
      return undefined;
    }

    return {
      text: i18n.translate('kbn.devTools.badge.readOnly.text', {
        defaultMessage: 'Read only',
      }),
      tooltip: i18n.translate('kbn.devTools.badge.readOnly.tooltip', {
        defaultMessage: 'Unable to save',
      }),
      iconType: 'glasses',
    };
  },
  k7Breadcrumbs: () => [
    {
      text: i18n.translate('kbn.devTools.k7BreadcrumbsDevToolsLabel', {
        defaultMessage: 'Dev Tools',
      }),
      href: '#/dev_tools',
    },
  ],
});

FeatureCatalogueRegistryProvider.register(() => {
  return {
    id: 'console',
    title: i18n.translate('kbn.devTools.consoleTitle', {
      defaultMessage: 'Console',
    }),
    description: i18n.translate('kbn.devTools.consoleDescription', {
      defaultMessage: 'Skip cURL and use this JSON interface to work with your data directly.',
    }),
    icon: 'consoleApp',
    path: '/app/kibana#/dev_tools/console',
    showOnHomePage: true,
    category: FeatureCatalogueCategory.ADMIN,
  };
});
