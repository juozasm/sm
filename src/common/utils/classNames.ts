const notFalsy = <TValue>(value: TValue | null | undefined | false): value is TValue => {
    return !!value;
};

const classNames = (...classes: (string | null | undefined | false)[]): string => classes.filter(notFalsy).join(' ');

export default classNames;
