import { useMemo, useState } from 'react';
import { TransactionDetails } from '../interfaces';
import TransactionCard from '../TransactionCard/TransactionCard';
import styles from './transactionList.module.css';
import componentStyles from '../component.module.css';

interface TransactionListProps {
    transactions: TransactionDetails[];
    classNames?: {
        transactionsBox?: string;
        transaction?: string;
    };
    height: string;
}

function TransactionList({ transactions, classNames, height }: TransactionListProps) {
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<keyof TransactionDetails>('createdAt');

    function formatTransactions() {
        let result = transactions;
        if (search !== '') {
            result = result.filter((transaction) => transaction.match(search));
        }

        result = result.sort((transaction, otherTransaction) => {
            if (transaction[sort] === undefined && otherTransaction[sort] === undefined) return 0;
            if (otherTransaction[sort] === undefined) return 1;
            if (transaction[sort] === undefined) return -1;

            if (transaction[sort]! > otherTransaction[sort]!) return 1;
            if (transaction[sort]! < otherTransaction[sort]!) return -1;
            return 0;
        });

        return result;
    }
    const formattedTransactions = useMemo(formatTransactions, [transactions, search, sort]);

    let containerClassName = `${componentStyles.mediumGapChildren}`;
    containerClassName += ` ${componentStyles.columnChildren}`;

    let searchSortContainerClassName = `${componentStyles.rowChildren}`;
    searchSortContainerClassName += ` ${componentStyles.mediumGapChildren}`;

    let searchClassName = `${componentStyles.stretchToFit}`;
    searchClassName += ` ${componentStyles.baseFont}`;
    searchClassName += ` ${componentStyles.lightHighlight}`;
    searchClassName += ` ${componentStyles.smallBorder}`;
    searchClassName += ` ${componentStyles.baseOutline}`;

    let sortClassName = `${componentStyles.baseFont}`;
    sortClassName += ` ${componentStyles.baseBackground}`;
    sortClassName += ` ${componentStyles.smallBorder}`;
    sortClassName += ` ${componentStyles.baseOutline}`;

    let transactionsBoxClassName = `${componentStyles.ySmallScrollbar}`;
    transactionsBoxClassName += ` ${componentStyles.mediumGapChildren}`;
    transactionsBoxClassName += ` ${componentStyles.columnChildren}`;
    transactionsBoxClassName += ` ${styles.transactionsBox}`;
    transactionsBoxClassName += ` ${classNames?.transactionsBox}`;

    const transactionsItemsStyle = {
        height: height,
    };

    return (
        <div className={containerClassName}>
            <div className={searchSortContainerClassName}>
                <input
                    className={searchClassName}
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select
                    className={sortClassName}
                    value={sort}
                    onChange={(event) => setSort(event.target.value as keyof TransactionDetails)}
                >
                    <option value="createdAt">Datetime</option>
                    <option value="from">From</option>
                    <option value="to">To</option>
                    <option value="isComplete">Status</option>
                    <option value="usdAmount">Amount</option>
                </select>
            </div>
            <div className={transactionsBoxClassName} style={transactionsItemsStyle}>
                {formattedTransactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        className={classNames?.transaction}
                        transaction={transaction}
                    />
                ))}
            </div>
        </div>
    );
}

export default TransactionList;
