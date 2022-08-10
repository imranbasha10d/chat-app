export const getQueryIds = (ids: string[]) => ("'" + ids.join("', '") + "'");

export const getLimitAndOffsetFromQuery = (query: any) => {
    const { limit: queryLimit, offset: queryOffset } = query;
    const limit = (queryLimit != undefined) ? Number(queryLimit) : 10;
    const offset = (queryOffset != undefined) ? Number(queryOffset) : 0;

    return { limit, offset }
}