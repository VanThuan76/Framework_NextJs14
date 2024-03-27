import { useQuery } from '@tanstack/react-query';
import { NextRouter, useRouter } from 'next/router';
import { useDebugValue } from 'react';
import { Filter, ISearchParams, ConditionItem, PAGINATION } from '@/core/setting';

type Props<T> = {
  apiFn: (_params?: ISearchParams) => Promise<T>;
  defaultParams?: Partial<ISearchParams>;
  queryKey?: any;
};

const pageKey = PAGINATION.PAGEKEY;
const sizeKey = PAGINATION.SIZEKEY;

function parseURLSearch(querySearch: string) {
  if (!querySearch) return [];
  try {
    return querySearch.split('&').map(str => JSON.parse(decodeURIComponent(str)));
  } catch (e) {
    return [];
  }
}
function stringifyArrayObj(param: object[]) {
  return param.map(obj => encodeURIComponent(JSON.stringify(obj))).join('&');
}

export default function usePagination<T>({ queryKey, apiFn, defaultParams }: Props<T>) {
  const router = useRouter();
  const pageIndex = parseInt(router.query[pageKey] as string) || defaultParams?.page || 0;
  const pageSize = parseInt(router.query[sizeKey] as string) || defaultParams?.size || PAGINATION.DEFAULT_PAGE_SIZE;
  const sorts: ISearchParams['sorts'] = defaultParams?.sorts || [];
  const filters: ISearchParams['filters'] = parseURLSearch(router.query.search as string);

  /**
   *
   * @param key : propertyName to search
   * @returns an array | null
   */
  function getFieldValueOnSearchParam(key: string) {
    let oldFilterArr = [];
    try {
      oldFilterArr = parseURLSearch(router.query.search as string);
    } catch (e) {
      console.log(e);
    }
    return oldFilterArr.find(item => item.field === key) ? [oldFilterArr.find(item => item.field === key).value] : null;
  }
  /**
   *
   * @param key : propertyName to search
   * @returns string| null
   */
  function getFieldValueOnSearchParam2(key: string) {
    let oldFilterArr = [];
    try {
      oldFilterArr = parseURLSearch(router.query.search as string);
    } catch (e) {
      console.log(e);
    }
    return oldFilterArr.find(item => item.field === key) ? oldFilterArr.find(item => item.field === key).value : null;
  }

  function onChangeParams(param: (any & 'page') | 'size', value: any) {
    const oldQuery = router.query;
    if (value === undefined) {
      delete oldQuery[param];
    } else {
      oldQuery[param] = value;
    }
    // reset to first page
    if (param !== 'page') {
      oldQuery.page = '0';
    }
    router.push({
      pathname: router.pathname,
      query: oldQuery,
    });
  }
  function onChangeParamsObj(paramsToUpdate: { [key: string]: any }) {
    const oldQuery = router.query;

    for (const param in paramsToUpdate) {
      const value = paramsToUpdate[param];
      if (value === undefined) {
        delete oldQuery[param];
      } else {
        oldQuery[param] = value;
      }
    }

    router.push({
      pathname: router.pathname,
      query: oldQuery,
    });
  }
  /**
   *
   * @description : get filter param then parse to JSON after that update parameter "search" in URL
   */
  function onChangeSearchParams(value: Filter) {
    const oldQuery = router.query;
    const oldFilterArr = parseURLSearch(oldQuery.search as string);
    let newFilterArr = [];
    if (oldFilterArr.length > 0) {
      const alreadyFilter = oldFilterArr.find(item => item.field === value.field);
      if (alreadyFilter) {
        newFilterArr = oldFilterArr.map(item => (item.field === value.field ? { ...item, value: value.value } : item));
      } else {
        newFilterArr = [...oldFilterArr, value];
      }
    } else {
      newFilterArr = [value];
    }
    const newFilterArrJson = stringifyArrayObj(newFilterArr.filter(item => item.value !== undefined));
    const newQuery = { ...oldQuery, page: 0, search: newFilterArrJson };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  }

  function onChangeSearchArrayParams(newFilters: Filter[]) {
    const oldQuery = router.query;
    const oldFilterArr = parseURLSearch(oldQuery.search as string);
    let updatedFilterArr = [...oldFilterArr];
    for (const newFilter of newFilters) {
      const existingFilterIndex = updatedFilterArr.findIndex(item => item.field === newFilter.field);
      if (existingFilterIndex !== -1) {
        updatedFilterArr[existingFilterIndex] = { ...updatedFilterArr[existingFilterIndex], value: newFilter.value };
      } else {
        updatedFilterArr.push(newFilter);
      }
    }
    const newFilterArrJson = stringifyArrayObj(updatedFilterArr.filter(item => item.value !== undefined));
    const newQuery = { ...oldQuery, page: 0, search: newFilterArrJson };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  }
  /**
   * @description parse from filters to URL then if filters already exist it will replace old value
   * @param filters: ConditionItem[]
   * @return void
   *
   */
  function onChangeMultiSearchParams(filters: ConditionItem[]) {
    const oldQuery = router.query;
    const oldFilterArr = parseURLSearch(oldQuery.search as string);

    let newFilterArr: ConditionItem[] = [];

    filters.forEach(newFilter => {
      const existingFilterIndex = oldFilterArr.findIndex(oldFilter => oldFilter.property === newFilter.property);
      if (existingFilterIndex !== -1) {
        if (newFilter.value !== undefined && newFilter.value !== null && newFilter.value !== '') {
          newFilterArr.push({ ...newFilter, value: newFilter.value });
        }
        oldFilterArr.splice(existingFilterIndex, 1); // Remove the matched filter from the old array
      } else if (newFilter.value !== undefined && newFilter.value !== null && newFilter.value !== '') {
        newFilterArr.push(newFilter);
      }
    });

    newFilterArr = [...newFilterArr, ...oldFilterArr]; // Add any remaining old filters

    const newFilterArrJson = stringifyArrayObj(newFilterArr.filter(item => item.value !== undefined));
    const newQuery = { ...oldQuery, page: 0, search: newFilterArrJson };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  }

  const finalFilter = defaultParams?.filters ? [...filters, ...defaultParams.filters] : filters;
  const { data, isLoading, refetch } = useQuery({
    queryKey: [...queryKey, router],
    queryFn: () =>
      apiFn({ ...defaultParams, ...router.query, page: pageIndex, size: pageSize, filters: finalFilter, sorts: sorts }),
    enabled: router.isReady,
  });
  const tableConfig = {
    pageSize: pageSize,
    pageIndex: pageIndex,
    isLoading,
    //@ts-ignore
    pageCount: data?.totalPages,
    handChangePagination: (value: number, type: 'Page_change' | 'Size_change') => {
      if (type === 'Page_change') {
        onChangeParams(PAGINATION.PAGEKEY, value);
      } else {
        onChangeParams(PAGINATION.SIZEKEY, value);
      }
    },
  };
  useDebugValue(filters);
  return {
    data,
    tableConfig,
    isLoading,
    refetch,
    pageIndex,
    pageSize,
    filters,
    sorts,
    params: router.query,
    defaultParams,
    onChangeParams,
    onChangeParamsObj,
    onChangeSearchParams,
    onChangeSearchArrayParams,
    getFieldValueOnSearchParam,
    getFieldValueOnSearchParam2,
    onChangeMultiSearchParams,
  };
}

/**
 * @description get value of search params in  params 'search'
 */
export function getFieldValueOnSearchParamServerSide(key: string, query: NextRouter['query']) {
  let oldFilterArr = [];
  try {
    oldFilterArr = parseURLSearch(query.search as string);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  if (oldFilterArr.filter(item => item.property === key).length > 0) {
    if (oldFilterArr.filter(item => item.property === key).length === 1)
      return oldFilterArr.find(item => item.property === key).value;
    else return oldFilterArr.filter(item => item.property === key).map(item => item.value);
  }
  return null;
}
