/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

const indexManagementDataEnrichers = [];
export const addIndexManagementDataEnricher = enricher => {
  indexManagementDataEnrichers.push(enricher);
};
export const getIndexManagementDataEnrichers = () => {
  return indexManagementDataEnrichers;
};
