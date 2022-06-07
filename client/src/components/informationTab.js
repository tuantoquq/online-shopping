import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { Link } from 'react-router-dom';

export default function InformationTab() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>


      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý đơn hàng" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>



      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <Link to='/shopper/accept-order' style={{ textDecoration: 'none' ,color:'black'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn chờ xác nhận" />
            </ListItemButton>
          </Link>

          <Link to='/shopper/delivering-order' style={{ textDecoration: 'none',color:'black' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn đang giao" />
            </ListItemButton>
          </Link>

          <Link to='/shopper/delivered-order' style={{ textDecoration: 'none',color:'black' }}>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FactCheckIcon />
              </ListItemIcon>
              <ListItemText primary="Đã giao" />
            </ListItemButton>
          </Link>

          <Link to='/shopper/reject-order' style={{ textDecoration: 'none' ,color:'black'}}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BookmarkRemoveIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn từ chối" />
            </ListItemButton>

          </Link>

        </List>
      </Collapse>
    </List>
  );
}
