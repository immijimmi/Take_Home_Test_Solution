import componentStyles from '../component.module.css';

interface SectionHeaderProps {
    text: string;
}

function SectionHeader({ text }: SectionHeaderProps) {
    let headerClassName = `${componentStyles.baseFont}`;
    headerClassName += ` ${componentStyles.mediumHeader}`;
    headerClassName += ` ${componentStyles.xyCenterChildren}`;

    return (
        <>
            <div className={headerClassName}>{text}</div>
            <hr className={componentStyles.mediumHr} />
        </>
    );
}

export default SectionHeader;
