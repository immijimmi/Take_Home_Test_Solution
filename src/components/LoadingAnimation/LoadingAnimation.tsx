import { LoadingAnimationType } from './enums';
import styles from './loadingAnimation.module.css';
import componentStyles from '../component.module.css';

interface LoadingAnimationProps {
    type: string;
}

function LoadingAnimation({ type }: LoadingAnimationProps) {
    let animationClassName;
    switch (type) {
        case LoadingAnimationType.WEIGHTED_WHEEL:
            animationClassName = `${styles.weightedWheel}`;
            break;
    }

    return (
        <div className={componentStyles.xCenterChildren}>
            <div className={animationClassName} />
        </div>
    );
}

export default LoadingAnimation;
