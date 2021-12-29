import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import SpaceHolder from './components/SpaceHolder/SpaceHolder';
import componentStyles from './components/component.module.css';
import styles from './app.module.css';
import './themes/warmBlack.css';
import './App.css';

function App() {
    return (
        <div className={componentStyles.xyCenterStartChildren}>
            <SpaceHolder className={styles.spaceHolder} text="There's so much room for activities!" />
            <TransactionHistory />
        </div>
    );
}

export default App;
