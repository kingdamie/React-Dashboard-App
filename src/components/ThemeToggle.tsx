
import { Switch } from '@mui/material';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm dark:text-amber-50">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <Switch checked={theme === 'dark'} onChange={toggleTheme} />
    </div>
  );
};

export default ThemeToggle;
