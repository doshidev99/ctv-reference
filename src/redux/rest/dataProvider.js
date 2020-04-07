import { pick, keyBy } from 'lodash';
import { getValidData } from '../../utils/tools';

const formatFilterParams = params => {
  const formattedParams = {};
  Object.keys(params).forEach(key => {
    formattedParams[key] =
      params[key] && params[key].$likeLower
        ? { $likeLower: `%${params[key].$likeLower}%` }
        : params[key];
  });
  return formattedParams;
};

export const convertRequestParams = (type, params, resource, mappedBy) => {
  const requestParams = pick(params, ['limit', 'skip', params.include && 'include']);
  let query = {
    limit: requestParams.limit,
    offset: requestParams.skip,
  };
  if (params.filter) {
    query.filter = JSON.stringify(formatFilterParams(getValidData(params.filter)));
  }

  if (params.order) {
    query.orderBy = params.order;
  }

  if (params.include) {
    query.fields = JSON.stringify(params.include);
  }
  
  switch (type) {
    case 'getAll':
      return query;
    case 'getReference':
      query = {
        limit: 40,
        offset: 0,
        filter: JSON.stringify({
          [mappedBy || 'id']: {
            $in: params,
          },
        }),
      };
      return query;
    case 'editMulti':
      return {
        requests: params.map(record => {
          const newRecord = record;
          delete newRecord.createdAt;
          delete newRecord.updatedAt;
          return {
            method: 'PUT',
            path: `/Classes/${resource}/${newRecord.id}`,
            body: newRecord,
          };
        }),
      };
    case 'getOne':
      break;
    case 'del':
    case 'update':
    case 'create':
    default:
      return {};
  }
  return {};
};

export const convertResponseData = (type, response, mappedByKey = 'id') => {
  switch (type) {
    case 'getAll':
      return {
        results: keyBy(response.results, mappedByKey),
        ids: response.results.map(data => data[mappedByKey]),
        count: response.total,
      };
    case 'editMulti':
      return response.map(data => data.success);
    case 'getOne':
    case 'update':
    case 'create':
      return { ...response };
    case 'del':
    default:
      return response;
  }
};
