import { ActionItem } from './Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { APP_ROUTES } from '../../routes';

export const sidebarItems: ActionItem[] = [
  {
    type: 'Nav',
    id: 'start',
    icon: <HomeIcon />,
    text: 'Home',
    navigatesTo: APP_ROUTES.start,
  },
  {
    type: 'Nav',
    id: 'diary',
    icon: <MenuBookIcon />,
    text: 'Diary',
    navigatesTo: APP_ROUTES.diary,
  },
  {
    type: 'Nav',
    id: 'add',
    icon: <AddCircleIcon />,
    text: 'Add',
    navigatesTo: APP_ROUTES.add,
  },
];
