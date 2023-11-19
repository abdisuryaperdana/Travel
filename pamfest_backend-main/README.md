# PemFest API Installation Guide

This guide will walk you through the process of setting up and installing an API using Express.js.

## Prerequisites

Make sure you have the following installed before proceeding:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository and the database into your server:
   ```bash
   git clone https://github.com/rifqialamsyh/pamfest_backend.git
   
2. Navigate to the project directory:
   ```bash
   cd [your-project]
   
3. Install dependencies:
   ```bash
   npm install / npm i
   
4. Edit Environment Variables:  <br />
   Rename the file by deleting `.sample` in `.env.sample` file and edit a file named `.env` in the root directory of your project. This file will contain your environment-specific configurations.
   
6. Running the application:
   ```bash
   npm run start (for production)
   npm run dev (for development)

## Additional Configuration

- **Port Configuration**

  If you want to change the default port on which the server runs, you can specify it in the `.env` file by setting the `PORT` variable.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<p align="right">(<a href="#readme-top">back to top</a>)</p>
