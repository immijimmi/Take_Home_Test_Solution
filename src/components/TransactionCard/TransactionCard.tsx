import config from '../../config.json';
import { Constants } from '../constants';
import { TransactionDetails } from '../interfaces';
import CopyableText from '../CopyableText/CopyableText';
import CurrencyExchange from '../CurrencyExchange/CurrencyExchange';
import componentStyles from '../component.module.css';
import styles from './transactionCard.module.css';

interface TransactionCardProps {
    className?: string;
    transaction: TransactionDetails;
}

function TransactionCard({ className, transaction }: TransactionCardProps) {
    let containerClassName = `${componentStyles.smallBorderRadius}`;
    containerClassName += ` ${componentStyles.lightHighlight}`;
    containerClassName += ` ${componentStyles.smallSpacedChildren}`;
    containerClassName += ` ${transaction.isComplete ? styles.complete : styles.notComplete}`;
    containerClassName += ` ${className}`;

    let sectionClassName = `${componentStyles.flex}`;
    sectionClassName += ` ${componentStyles.smallSpacedItem}`;

    let footerSectionClassName = sectionClassName;
    footerSectionClassName += ` ${componentStyles.xRightChildren}`;

    let dividerClassName = `${componentStyles.mediumSpacedItem}`;
    dividerClassName += ` ${componentStyles.tinyFadedHr}`;

    let itemBoxClassName = `${componentStyles.smallSpacedChildren}`;
    itemBoxClassName += ` ${componentStyles.baseFont}`;
    itemBoxClassName += ` ${componentStyles.smallSpacedItem}`;
    itemBoxClassName += ` ${componentStyles.xyCenterChildren}`;

    let stretchItemBoxClassName = `${itemBoxClassName}`;
    stretchItemBoxClassName += ` ${componentStyles.stretchToFit}`;

    let textBoxClassName = `${itemBoxClassName}`;
    textBoxClassName += ` ${componentStyles.mediumBorderRadius}`;
    textBoxClassName += ` ${componentStyles.mediumHighlight}`;

    let pendingBoxClassName = `${textBoxClassName}`;
    pendingBoxClassName += ` ${styles.pendingBox}`;

    const maxStringLength = 18;

    return (
        <div className={containerClassName}>
            <div className={sectionClassName}>
                <div className={textBoxClassName}>{transaction.createdAt}</div>
                {!transaction.isComplete && <div className={pendingBoxClassName}>{'PENDING'}</div>}
            </div>
            {transaction.from && transaction.to && (
                <>
                    <hr className={dividerClassName} />
                    <div className={sectionClassName}>
                        <CopyableText
                            className={textBoxClassName}
                            text={transaction.from}
                            charLimit={maxStringLength}
                            height={Constants.INLINE_ICON_HEIGHT}
                        />
                        <div className={stretchItemBoxClassName}>
                            <img
                                alt=""
                                src={config.resources.icons.arrow.medium.right}
                                height={Constants.INLINE_ICON_HEIGHT}
                            />
                        </div>
                        <CopyableText
                            className={textBoxClassName}
                            text={transaction.to}
                            charLimit={maxStringLength}
                            height={Constants.INLINE_ICON_HEIGHT}
                        />
                    </div>
                </>
            )}
            <hr className={dividerClassName} />
            <div className={footerSectionClassName}>
                <CurrencyExchange className={itemBoxClassName} data={transaction} />
            </div>
        </div>
    );
}

export default TransactionCard;
