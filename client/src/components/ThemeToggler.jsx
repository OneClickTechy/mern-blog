import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import {FaMoon, FaSun} from "react-icons/fa"

const ToggleTheme = () => {
  const defaultTheme = "light";
  const [theme, setTheme] = useState(() => {
    const findTheme = localStorage.getItem("theme") || defaultTheme;
    return findTheme;
  });
  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  return (
    <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={handleToggleTheme} >
    {theme==='dark' ? <FaMoon /> : <FaSun />}
</Button>
  );
};

export default ToggleTheme;
