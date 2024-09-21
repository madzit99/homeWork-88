import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/users/usersThunks";
import { User } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit">
        Привет,  {user.username} 
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>
          <Typography   sx={{ textAlign: "center" }}>
            <Link to="/addNew">Создать новый пост</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
