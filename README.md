# TokenWise: Solana Token Holder & Activity Dashboard

TokenWise is a professional, modern dashboard for monitoring Solana token holders, real-time transactions, and protocol analytics. Built with React, Vite, TypeScript, and Tailwind CSS, it provides a beautiful and user-friendly interface for exploring token distribution and on-chain activity.

## Features

- **Dashboard Overview**: See total volume, active wallets, buy/sell ratio, and average transaction size at a glance.
- **Top Holders Table**: View the top 60 token holders with ranks, balances, and percentage of supply.
- **Real-Time Charts**: Visualize hourly trading activity and protocol distribution with interactive charts.
- **Latest Transactions**: Browse the most recent token transactions in a clean, sortable table.
- **Download Data**: Export dashboard data as JSON or CSV for further analysis.
- **Responsive UI**: Fully responsive, light-themed, and accessible design with professional polish.

## How It Works

1. **Mock Data**: The app uses mock data for holders, transactions, and analytics (see `src/utils/mockData.ts`).
2. **Navigation**: Use the sidebar to switch between Dashboard, Holders, and Transactions pages. The layout and header are consistent across all pages.
3. **Live Simulation**: The dashboard simulates real-time updates to analytics for demonstration purposes.
4. **Download**: Use the buttons at the top of the dashboard to download the current data in JSON or CSV format.

## Getting Started

1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Run the app locally**:
   ```sh
   npm run dev
   ```
3. **Open in your browser**:
   Visit [http://localhost:5173](http://localhost:5173)

## Customization

- To connect to real Solana data or a backend, replace the mock data and update the data fetching logic in the hooks/services.
- The UI is built with Tailwind CSS and is easy to customize for your brand or use case.

## Tech Stack
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Recharts (for charts)

## License
MIT

---

**TokenWise** is a template for building beautiful, production-ready blockchain dashboards. Contributions and suggestions are welcome!
