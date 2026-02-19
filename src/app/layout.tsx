import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="min-h-screen bg-palette-white">
      <main className="mx-auto max-w-container px-container pt-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
