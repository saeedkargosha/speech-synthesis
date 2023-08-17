import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className='px-8 py-4 bg-slate-50 h-full'>
      <header className=''>
        <nav>
          <div className='container max-w-6xl'>
            <div className='flex justify-between'>
              <h1 className='text-2xl mb-12 text-slate-700'>{'Text to speech'}</h1>
              <a
                className='bg-blue-600 text-sm h-10 px-6 py-5 rounded-md text-white flex justify-center items-center'
                href='https://saeedkargosha.vercel.app'
              >
                {'My Profile'}
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className='container max-w-6xl'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
