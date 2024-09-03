import { Toaster } from 'react-hot-toast';

export const PokeToaster = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      duration: 5000,
      style: {
        border: '1px solid darkblue',
        padding: '16px',
        minWidth: '300px',
        textTransform: 'capitalize',
      },
    }}
  />
);
