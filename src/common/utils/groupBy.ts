type MapFunc<T = any> = (val: T, index?: number, arr?: T[]) => T;

const groupBy = <T = any>(arr: T[], fn: MapFunc<T> | string): { [key: string]: T[] } =>
    arr.map(typeof fn === 'string' ? (val: any) => val[fn] : fn).reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
    }, {});

export default groupBy;
