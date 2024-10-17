# Voice Portfolio - Marvin AI Assistant

This project is a Next.js application featuring Marvin, an AI assistant with a unique personality inspired by the character from "The Hitchhiker's Guide to the Galaxy". Marvin is designed to help showcase Roel Leenders' portfolio and assist in job searching.

## Features

- Voice-based interaction with Marvin
- Real-time audio processing and visualization
- Responsive design with animated avatar
- Integration with OpenAI's API for natural language processing

## Prerequisites

- Node.js (version 18 or later)
- npm or yarn package manager
- [The relay server](https://github.com/rcleend/voice-portfolio-relay)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/voice-portfolio.git
   cd voice-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

   ```
   RELAY_SERVER_URL=https://your-relay-server-url.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the Relay Server

This project uses a relay server to handle audio streaming. The relay server isin a separate repository. Please refer to the [voice-portfolio-relay](https://github.com/rcleend/voice-portfolio-relay) repository for instructions on how to set up and run the relay server.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/features`: Holds feature-specific components and logic
- `src/lib`: Utility functions

## Learn More

To learn more about the technologies used in this project, refer to the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
