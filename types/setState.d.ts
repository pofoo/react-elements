import { Dispatch, SetStateAction } from 'react';

// React setState function event
type SetState<T extends unknown = any> = Dispatch<SetStateAction<T>>;

export default SetState;