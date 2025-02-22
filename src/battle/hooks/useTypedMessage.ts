import { useEffect, useState } from 'react';
import { wait } from '../shared/helpers';

export const useTypedMessage = (message: string) => {
    const [typedMessage, setTypedMessage] = useState('');

    useEffect(() => {
        setTypedMessage('');

        if (message.length) {
            void (async () => {
                let visibleMessage = '';
                for (let i = 0; i < message.length; i++) {
                    await wait(25);

                    visibleMessage = visibleMessage + message[i];

                    setTypedMessage(visibleMessage);
                }
            })();
        }
        return () => {};
    }, [message]);

    return typedMessage;
};
