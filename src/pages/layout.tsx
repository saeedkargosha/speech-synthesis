import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <main className='px-8 py-4'>
      <h1 className='text-4xl mb-12'>{'Text to speech'}</h1>
      <Outlet />
    </main>
  );
}
