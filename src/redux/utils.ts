export type requestType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export const convertParamsToRequestParams = (params: Record<string, any>) => {
  const arr = Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc.push(`${key}=${value}`);
    }
    return acc;
  }, [] as string[]);
  return arr.join('&');
}

export const convertRequestParamsToParams = (queryString: string) => {
  const query: Record<string, any> = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
