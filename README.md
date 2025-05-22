# 3D Toys Store

A modern e-commerce website for selling 3D printed toys, built with React, TypeScript, and Redux.

## Features

- User authentication
- Product listing with filters
- Shopping cart functionality
- Responsive design
- Modern UI/UX

## Technologies Used

- React
- TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Styled Components for styling
- Axios for HTTP requests (mock data)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd toysstore
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

### Testing

To run the tests:
```bash
npm test
# or
yarn test
```

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── store/         # Redux store and slices
  ├── services/      # API services and mock data
  ├── styles/        # Global styles and theme
  ├── types/         # TypeScript type definitions
  └── utils/         # Utility functions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 