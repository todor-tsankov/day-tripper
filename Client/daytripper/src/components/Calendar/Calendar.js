import { Calendar as AntCalendar } from 'antd';
import styles from './Calendar.module.css';

function Calendar(props){
    return (
        <div className={styles.container}> 
            <AntCalendar style={{padding: '30px'}}/>
        </div>
    );
}

export default Calendar;