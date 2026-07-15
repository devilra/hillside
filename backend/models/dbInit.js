import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Project from './Project.js';
import Lead from './Lead.js';

export const seedDatabase = async () => {
  try {
    // Synchronize all mapped models with the MySQL tables
    await sequelize.sync({ alter: true });
    console.log('[SEQUELIZE] Database tables successfully synchronized.');

    // Seed default admin user based on environment variables (no hardcoded credentials)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      const existingUser = await User.findOne({ where: { email: adminEmail } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
          email: adminEmail,
          password: hashedPassword
        });
        console.log(`[SEQUELIZE] Seeded default admin account from environment config: ${adminEmail}`);
      } else {
        // Compare password and update if they differ (Developer Password Sync)
        const isMatch = await bcrypt.compare(adminPassword, existingUser.password);
        if (!isMatch) {
          const newHashedPassword = await bcrypt.hash(adminPassword, 10);
          await existingUser.update({ password: newHashedPassword });
          console.log(`[SEQUELIZE] Admin password synchronized/updated in database to match environment config.`);
        } else {
          console.log('[SEQUELIZE] Admin account credentials verified against database records.');
        }
      }
    } else {
      console.warn('[SEQUELIZE] Seeding skipped: ADMIN_EMAIL or ADMIN_PASSWORD not configured in .env');
    }



    // Seed default projects if table is empty
    const projectCount = await Project.count();
    if (projectCount === 0) {
      const defaultProjects = [
        // Fast Moving Projects
        {
          type: 'fast_moving',
          title: 'Scenic Valley Plots',
          author: 'Hillsite Developers',
          location: 'Yelagiri Hills',
          routeSubpath: '/scenic-valley-plots',
          priceToken: '₹ 25 L Onwards',
          status: 'Ready to Move',
          possessionDate: 'Immediate',
          totalApts: '50 Plots',
          launchTimeline: 'Jan 2026',
          reraId: 'TN/RERA/001/2026',
          amenities: JSON.stringify(['Cafeteria', 'Children\'s Play Area', 'Club House', '24 X 7 Security']),
          description: 'Premium land parcels located amidst breathtaking natural surroundings. From panoramic hill views to lush green landscapes, every plot is carefully chosen to offer both aesthetic appeal and long-term investment value.',
          mainImage: '/hillside/Scenic-View.webp',
          galleryImages: JSON.stringify([])
        },
        {
          type: 'fast_moving',
          title: 'Eco Villa Retreats',
          author: 'Hillsite Developers',
          location: 'Yelagiri Hills',
          routeSubpath: '/eco-villa-retreats',
          priceToken: '₹ 1.5 Cr Onwards',
          status: 'Under Construction',
          possessionDate: 'Dec 2027',
          totalApts: '12 Villas',
          launchTimeline: 'Feb 2026',
          reraId: 'TN/RERA/002/2026',
          amenities: JSON.stringify(['Swimming Pool', 'Gymnasium', 'Sports Facility', 'Club House']),
          description: 'Every property listed with Hillsite undergoes thorough verification to ensure clear ownership, authentic documentation, and complete legal compliance. This gives buyers confidence and eliminates the risk of future disputes.',
          mainImage: '/hillside/Legal-Registration-Support.webp',
          galleryImages: JSON.stringify([])
        },
        // Latest Launches Projects
        {
          type: 'latest_launch',
          title: 'Athanavur Heights',
          author: 'L And T Realty',
          location: 'Yelagiri',
          routeSubpath: '/athanavur-heights',
          priceToken: '₹ 1.18 Cr Onward',
          status: 'New Launch',
          possessionDate: 'Dec 2028',
          totalApts: '80 Units',
          launchTimeline: 'Feb 2026',
          reraId: 'TN/RERA/003/2026',
          amenities: JSON.stringify(['Gymnasium', 'Swimming Pool', 'Club House']),
          description: 'Athanavur hill-facing premium residential land development. Safe gated community layout.',
          mainImage: '/hillside/img-2.jpeg',
          galleryImages: JSON.stringify([])
        },
        {
          type: 'latest_launch',
          title: 'Mangalam Premium Retreats',
          author: 'Rustomjee Builders',
          location: 'Yelagiri',
          routeSubpath: '/mangalam-premium-retreats',
          priceToken: '₹ 9.61 Cr Onwards',
          status: 'New Launch',
          possessionDate: 'Immediate',
          totalApts: '24 Units',
          launchTimeline: 'Jan 2026',
          reraId: 'TN/RERA/004/2026',
          amenities: JSON.stringify(['Indoor Games', 'Cafeteria', 'Swimming Pool']),
          description: 'Mangalam panoramic valley residential land. Luxury villa township with premium amenities.',
          mainImage: '/hillside/img-3.jpeg',
          galleryImages: JSON.stringify([])
        },
        // Exclusive Projects
        {
          type: 'exclusive',
          title: 'Today Citadel Juinagar',
          author: 'Hillsite Developers',
          location: 'Yelagiri Hills',
          routeSubpath: '/today-citadel-juinagar',
          priceToken: '₹ 1.80 Cr Onwards',
          status: 'Ready to Move',
          possessionDate: 'Immediate',
          totalApts: '10 plots',
          launchTimeline: 'Feb 2025',
          reraId: 'TN/RERA/005/2026',
          amenities: JSON.stringify(['Gymnasium', '24 X 7 Security', 'Club House']),
          description: 'Exclusive properties located at Yelagiri West. Scenic landscape layout.',
          mainImage: '/images/Centre-Park.jpg',
          galleryImages: JSON.stringify([])
        }
      ];
      await Project.bulkCreate(defaultProjects);
      console.log('[SEQUELIZE] Seeded default real estate projects.');
    }
  } catch (error) {
    console.error('[SEQUELIZE] Error syncing/seeding database:', error);
    throw error;
  }
};

