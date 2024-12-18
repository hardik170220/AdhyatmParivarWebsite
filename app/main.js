import Footer from './layouts/Footer';
import { useGlobalProvider } from './context/GlobalContext'

const Main = ({ children }) => {
  const { isSidebarHide } = useGlobalProvider();

  return (
    <div>
      <main
        className={`flex-1 mt-40 md:mt-10 transition-all duration-500 ease-in-out ${isSidebarHide ? 'lg:ml-0' : 'lg:ml-64'}`}
        style={{ transitionProperty: 'margin-left' }}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Main;
