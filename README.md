# EstateCheck

A professional estate assessment and reporting platform built with Next.js 14, React 18, and Tailwind CSS.

## Features

- 📸 **Property Snapshots**: Create detailed property assessments with valuation, condition, and features
- 📊 **Analytics**: Track property value trends and condition changes over time
- 📄 **Reports**: Generate comprehensive reports for documentation and analysis
- 🎨 **Modern UI**: Built with Tailwind CSS and Lucide React icons
- 📱 **Responsive Design**: Fully responsive across all devices
- ⚡ **Type-Safe**: Full TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/camelio8578/EstateCheck.git
cd EstateCheck
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── api/                 # API routes
│   │   ├── snapshot/        # Snapshot endpoints
│   │   └── report/          # Report endpoints
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SnapshotForm.tsx
│   │   ├── ReportView.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Utility functions
│   └── styles/
│       └── globals.css      # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14.2.0** - React framework
- **React 18.2.0** - UI library
- **TypeScript 5.3.0** - Type safety
- **Tailwind CSS 3.4.0** - Styling
- **Lucide React 0.300.0** - Icons
- **ESLint 8.0.0** - Code linting

## Features in Detail

### Property Snapshots
Create comprehensive property assessments including:
- Property address and location
- Current market valuation
- Condition rating (Excellent, Good, Fair, Poor)
- Property features and amenities
- Additional notes and observations

### Estate Reports
Generate professional reports containing:
- Multiple property snapshots
- Summary analysis
- Downloadable reports in text format
- Chronological tracking

## API Endpoints

### Snapshots
- `POST /api/snapshot` - Create new snapshot
- `GET /api/snapshot` - Retrieve all snapshots

### Reports
- `POST /api/report` - Create new report
- `GET /api/report` - Retrieve all reports

## Development

### Adding New Components

1. Create a new `.tsx` file in `src/app/components/`
2. Mark as 'use client' for client-side components
3. Import and use in your pages

### Adding New API Routes

1. Create a new directory under `src/app/api/`
2. Add a `route.ts` file with your handlers
3. Use Next.js route handlers pattern

## Deployment

Easily deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or deploy to other providers:
- AWS Amplify
- Netlify
- Docker
- Traditional Node.js servers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open a GitHub issue.

## Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] User authentication
- [ ] Advanced analytics and charts
- [ ] Image upload for properties
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Mobile app

---

**EstateCheck** - Professional Estate Assessment & Reporting
