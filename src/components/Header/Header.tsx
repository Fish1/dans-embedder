interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <header
      className="
      flex justify-center
      bg-orange-200 dark:bg-orange-700
      text-gray-600 dark:text-gray-300
      p-3 shadow-md font-serif
      "
    >
      <h1
        className="text-3xl font-bold text-center"
      >
        { title }
      </h1>
    </header>
  );
}

export default Header;
