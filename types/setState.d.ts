import { Dispatch, SetStateAction } from 'react';

// React setState function event
type SetState<T extends any = any> = Dispatch<SetStateAction<T>>;

export default SetState;