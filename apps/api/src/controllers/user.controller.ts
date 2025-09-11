import { Request, Response } from 'express';
import User from '../models/User.model';
import crypto from 'crypto';

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (Admin)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Invite a new user
// @route   POST /api/v1/users/invite
// @access  Private (Admin)
export const inviteUser = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // For the purpose of this story, we'll generate a simple random password.
    // A real implementation would use a more secure, one-time registration token.
    const password = crypto.randomBytes(8).toString('hex');

    const user = new User({
      name: email.split('@')[0], // Default name from email
      email,
      role,
      password,
      status: 'Invited',
    });

    await user.save();

    // In a real app, you'd email an invitation link with a registration token.
    // For now, we log it for testing.
    console.log(`Invitation for ${email}. Registration token/password: ${password}`)

    res.status(201).json({ message: 'User invited successfully.' });

  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Revoke user access
// @route   POST /api/v1/users/:id/revoke
// @access  Private (Admin)
export const revokeUserAccess = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = 'Revoked';
    await user.save();

    res.json({ message: 'User access has been revoked.' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
