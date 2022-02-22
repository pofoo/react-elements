import type { SetState } from '../../types';
import type { Props as TextInputProps } from './TextInput';
import type { UpdateCache } from 'components/types';
import type { FormData } from 'types';

type TextInputTypes = 'email' | 'username' | 'password' | 'text';

type FlexOnChange = SetState<any>;

interface Match {
    value: string;
    name: string;
}

interface InputCache {
    updateCache: UpdateCache;
    formData: FormData;
}

export type {
    TextInputTypes,
    TextInputProps,
    Match,
    FlexOnChange,
    InputCache,
}