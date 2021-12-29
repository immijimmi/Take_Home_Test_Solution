import config from '../../config.json';
import componentStyles from '../component.module.css';
import styles from './copyableText.module.css';
import { Methods } from '../methods';

interface CopyableTextProps {
    className?: string;
    text: string;
    charLimit?: number;
    height?: string;
    width?: string;
}

function CopyableText({ className, text, charLimit, height, width }: CopyableTextProps) {
    let containerClassName = `${componentStyles.xyCenterChildren}`;
    containerClassName += ` ${componentStyles.smallSpacedChildren}`;
    containerClassName += ` ${className}`;

    let itemClassName = `${componentStyles.xyCenterChildren}`;

    let buttonBoxClassName = `${itemClassName}`;
    buttonBoxClassName += ` ${componentStyles.mediumBorderRadius}`;
    buttonBoxClassName += ` ${componentStyles.mediumHighlight}`;
    buttonBoxClassName += ` ${styles.buttonBox}`;

    let buttonBoxActiveClassName = `${itemClassName}`;
    buttonBoxActiveClassName += ` ${componentStyles.mediumBorderRadius}`;
    buttonBoxActiveClassName += ` ${componentStyles.smallSpacedChildren}`;
    buttonBoxActiveClassName += ` ${styles.buttonBoxActive}`;

    let textBoxClassName = `${itemClassName}`;
    containerClassName += ` ${componentStyles.baseFont}`;

    const copyIconUrl = config.resources.icons.copy;

    return (
        <div className={containerClassName}>
            <div className={textBoxClassName}>{charLimit ? Methods.truncateString(text, charLimit) : text}</div>
            <div className={componentStyles.xMediumSeparator} />
            <div className={buttonBoxClassName}>
                <div className={buttonBoxActiveClassName}>
                    <img
                        alt="Copy to clipboard"
                        src={copyIconUrl}
                        height={height}
                        width={width}
                        onClick={() => navigator.clipboard.writeText(text)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CopyableText;
