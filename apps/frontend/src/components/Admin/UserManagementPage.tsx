import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { api } from '../../utils/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openInvite, setOpenInvite] = useState(false);
  const [openRevoke, setOpenRevoke] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ email: '', role: 'Staff' });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInvite = async () => {
    try {
      await api.post('/users/invite', newUser);
      fetchUsers();
      handleCloseInvite();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevoke = async () => {
    if (!selectedUser) return;
    try {
      await api.post(`/users/${selectedUser._id}/revoke`);
      fetchUsers();
      handleCloseRevoke();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickOpenInvite = () => setOpenInvite(true);
  const handleCloseInvite = () => setOpenInvite(false);

  const handleClickOpenRevoke = (user: User) => {
    setSelectedUser(user);
    setOpenRevoke(true);
  };
  const handleCloseRevoke = () => {
    setOpenRevoke(false);
    setSelectedUser(null);
  };

  return (
    <Paper>
      <Button variant="contained" onClick={handleClickOpenInvite} sx={{ m: 2 }}>
        Invite User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleClickOpenRevoke(user)} disabled={user.status === 'Revoked'}>
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Invite Dialog */}
      <Dialog open={openInvite} onClose={handleCloseInvite}>
        <DialogTitle>Invite New User</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="standard" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={newUser.role} label="Role" onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <MenuItem value={'Staff'}>Staff</MenuItem>
              <MenuItem value={'Portal Administrator'}>Portal Administrator</MenuItem>
              <MenuItem value={'Director-General'}>Director-General</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvite}>Cancel</Button>
          <Button onClick={handleInvite}>Invite</Button>
        </DialogActions>
      </Dialog>

      {/* Revoke Dialog */}
      <Dialog open={openRevoke} onClose={handleCloseRevoke}>
        <DialogTitle>Revoke Access?</DialogTitle>
        <DialogContent>
          Are you sure you want to revoke access for {selectedUser?.email}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRevoke}>Cancel</Button>
          <Button onClick={handleRevoke} color="secondary">Revoke</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagementPage;
