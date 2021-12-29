import styles from './spaceHolder.module.css';
import componentStyles from '../component.module.css';

interface SpaceHolderProps {
    text?: string;
    className?: string;
}

function SpaceHolder({ text, className }: SpaceHolderProps) {
    /*
        This component is designed to take up empty space at the top level of the application
    */

    let containerClassName = `${componentStyles.baseFont}`;
    containerClassName += ` ${componentStyles.largeHeader}`;
    containerClassName += ` ${componentStyles.xyCenterChildren}`;
    containerClassName += ` ${componentStyles.justifiedText}`;
    containerClassName += ` ${componentStyles.mediumHighlight}`;
    containerClassName += ` ${styles.container}`;
    containerClassName += ` ${className}`;

    // Spacing is applied on a nested div to prevent it from increasing height/width past 100vh
    let spacingBoxClassName = `${componentStyles.largeSpacedItem}`;
    spacingBoxClassName += ` ${componentStyles.largeSpacedChildren}`;

    return (
        <div className={containerClassName}>
            <div className={spacingBoxClassName}>{text}</div>
        </div>
    );
}

export default SpaceHolder;
