import { useState } from 'react';
import { Popconfirm } from 'antd';

function Decline({ children, isVisible, num, first }) {
    const placement = {
        1: 'topLeft',
        2: 'top',
        3: 'topRight',
        4: 'rightTop',
        5: 'right',
        6: 'rightBottom',
        7: 'bottomRight',
        8: 'bottom',
        9: 'bottomLeft',
        10: 'leftBottom',
        11: 'left',
        12: 'leftTop',
    };

    if(!num){
        num = 1;
    }

    if (num > 12) {
        num = 1;
    }

    const [visible, setVisible] = useState(isVisible);
    const [visibleNext, setVisibleNext] = useState(false);

    const onConfirm = () =>  {
        setVisibleNext(true);
    };

    const onDecline = () => {
        if(!first){
            setVisible(false);
        }

        setVisibleNext(false);
    };

    return (
        <>
            <Popconfirm
                title={'Why, are you sure?'}
                okText="Yes"
                cancelText="No"
                visible={visible}
                onConfirm={onConfirm}
                onCancel={onDecline}
                placement={placement[num]}
            >
                {children}
            </Popconfirm>
            {visibleNext ? <Decline isVisible={visibleNext} num={num + 1}></Decline> : null}
        </>
    );
}

export default Decline;