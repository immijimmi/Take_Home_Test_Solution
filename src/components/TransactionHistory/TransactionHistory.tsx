import { useState, useEffect } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import TransactionList from '../TransactionList/TransactionList';
import { TransactionDetails } from '../interfaces';
import { Methods } from './methods';
import { LoadingAnimationType } from '../LoadingAnimation/enums';
import componentStyles from '../component.module.css';
import styles from './transactionHistory.module.css';

function TransactionHistory() {
    const [transactions, setTransactions] = useState<TransactionDetails[] | null>(null);
    useEffect(() => {
        Methods.getTransactionHistory().then((result) => {
            setTransactions(result);
        });
    }, []);

    let containerClassName = `${componentStyles.mediumSpacedItem}`;
    containerClassName += ` ${componentStyles.mediumSpacedChildren}`;
    containerClassName += ` ${componentStyles.mediumBorder}`;
    containerClassName += ` ${styles.container}`;

    let sectionClassName = `${componentStyles.mediumSpacedItem}`;

    let noTranFoundClassName = `${componentStyles.baseFont}`;
    noTranFoundClassName += ` ${componentStyles.xCenterChildren}`;

    // TODO: This is a band-aid fix since 100% height does not work
    const transactionsListHeight = '87.6vh';

    return (
        <div className={containerClassName}>
            <div className={sectionClassName}>
                <SectionHeader text="Transaction History" />
            </div>
            <div className={sectionClassName}>
                {transactions === null && <LoadingAnimation type={LoadingAnimationType.WEIGHTED_WHEEL} />}
                {transactions && transactions.length > 0 && (
                    <TransactionList transactions={transactions} height={transactionsListHeight} />
                )}
                {transactions && transactions.length === 0 && (
                    <div className={noTranFoundClassName}>{'No transactions found.'}</div>
                )}
            </div>
        </div>
    );
}

export default TransactionHistory;
