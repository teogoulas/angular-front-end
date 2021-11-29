export function getRequestParams(params: any, page: number, rowsPerPage: number, asc: boolean, by: string): any {
  if (page) {
    params[`page`] = page;
  }

  if (rowsPerPage) {
    params[`rowsPerPage`] = rowsPerPage;
  } else {
    params[`rowsPerPage`] = 20
  }

  if (asc !== null) {
    params[`asc`] = asc
  } else {
    params[`asc`] = false
  }

  if (by) {
    params[`by`] = by
  } else {
    params[`by`] = 'countryId'
  }

  return params;
}

export function range(start: number, end: number) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
