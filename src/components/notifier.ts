import { ReactText } from 'react';
import { toast } from 'react-toastify';
import debounce from 'debounce-promise';

export const showNotification: (
  message: string,
  type?: 'success' | 'error',
  timeout?: number,
) => Promise<ReactText>
  = debounce((message: string, type: 'success' | 'error' = 'success', timeout: number = 5000): ReactText => toast(
      message, { type, autoClose: timeout },
    ), 300);

export const dismissNotification = (toastPromise: Promise<ReactText>) => toastPromise.then((toastId) => {
  toast.dismiss(toastId)
});
