import { persistentAtom } from '@nanostores/persistent'

export const themeColor = persistentAtom<'dark' | 'light'>('themeColor', 'dark')
