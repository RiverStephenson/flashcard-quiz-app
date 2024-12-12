import db from '../config/connection.js';
import { User, Card } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' assert { type: 'json' };
import cardData from './cards.json' assert { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await User.create(userData);
    await Card.create(cardData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
