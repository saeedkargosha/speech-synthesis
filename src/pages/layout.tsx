import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <main>
      <header>{'Header'}</header>
      <Outlet />
      <footer>{'Footer'}</footer>
    </main>
  );
}
