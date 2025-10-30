# ArenaX Backend

Node.js + Express + MongoDB backend for ArenaX eSports Tournament Management Platform.

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`
2. Update MongoDB connection string
3. Set JWT secret and other environment variables

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Admin login
- GET `/api/auth/profile` - Get admin profile
- POST `/api/auth/2fa/setup` - Setup 2FA
- POST `/api/auth/2fa/verify` - Verify 2FA
- POST `/api/auth/2fa/disable` - Disable 2FA

### Users
- GET `/api/users` - Get all users
- GET `/api/users/stats` - Get user statistics
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id/status` - Update user status
- POST `/api/users/:id/coins` - Adjust user coins

### Tournaments
- GET `/api/tournaments` - Get all tournaments
- GET `/api/tournaments/stats` - Get tournament statistics
- GET `/api/tournaments/:id` - Get tournament by ID
- PUT `/api/tournaments/:id/status` - Update tournament status
- POST `/api/tournaments/verify-result` - Verify participant result
- DELETE `/api/tournaments/:id` - Delete tournament

### Transactions
- GET `/api/transactions` - Get all transactions
- GET `/api/transactions/stats` - Get transaction statistics
- GET `/api/transactions/wallet/overview` - Get wallet overview

### Notifications
- POST `/api/notifications` - Create notification
- GET `/api/notifications` - Get all notifications
- GET `/api/notifications/stats` - Get notification statistics
- POST `/api/notifications/:id/send` - Send notification
- DELETE `/api/notifications/:id` - Delete notification

### Settings
- GET `/api/settings` - Get all settings
- GET `/api/settings/:key` - Get setting by key
- POST `/api/settings` - Create setting
- PUT `/api/settings/:key` - Update setting
- DELETE `/api/settings/:key` - Delete setting

### Dashboard
- GET `/api/dashboard/stats` - Get dashboard statistics

## Database Schema

### Admin
- username, email, password, role, twoFactorSecret, twoFactorEnabled, isActive, lastLogin

### User
- username, email, password, fullName, phoneNumber, userType, coinBalance, totalCoinsEarned, totalCoinsSpent, accountStatus, profileImage, gameStats

### Tournament
- title, description, gameType, organizer, entryFee, prizePool, maxParticipants, currentParticipants, participants, prizeDistribution, status, scheduledDate, roomDetails, rules, rejectionReason

### Transaction
- userId, transactionType, amount, balanceBefore, balanceAfter, category, description, relatedTournament, paymentMethod, paymentReference, processedBy, status

### Notification
- title, message, type, targetAudience, specificUsers, relatedTournament, isScheduled, scheduledFor, sentAt, status, createdBy

### Settings
- settingKey, settingValue, description, category, lastModifiedBy
