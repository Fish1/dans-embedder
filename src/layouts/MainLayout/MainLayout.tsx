import Header from '../../components/Header/Header';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const { title, children } = props;
  return (
    <>
      <Header title={title} />
      { children }
    </>
  );
}

export default MainLayout;
