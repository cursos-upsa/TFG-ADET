# TFG-ADET Project

## Project Overview

TFG-ADET is an educational platform built with Laravel 12 and React that integrates with OpenAI's API to provide AI-assisted learning experiences. The application allows professors to create subjects with associated AI assistants, and students to interact with these assistants through chat interfaces.

## Key Features

- User authentication with different roles (student, professor)
- Subject management (create, view, delete)
- AI-powered chat functionality using OpenAI's API
- File upload and vector store creation for context-aware AI responses
- Doubt management system for reviewing and addressing student questions

## Project Structure

### Backend Components

- **Controllers**: Handle HTTP requests and responses
  - `SubjectController`: Manages subject-related operations
  - `ChatController`: Handles chat functionality
  - `ProfileController`: Manages user profile operations

- **Models**: Define the data structure
  - `User`: Represents users with different roles (student, professor)
  - `Subject`: Represents educational subjects with associated AI assistants
  - `Chat`: Represents chat threads between users and AI assistants
  - `Doubt`: Represents questions or issues identified in chats

- **Services**: Handle business logic and external API interactions
  - `OpenAIChatService`: Manages interactions with OpenAI's chat API
  - `OpenAIAssistantService`: Handles creation and management of OpenAI assistants
  - `OpenAIFilesService`: Manages file uploads and vector stores for AI context

### Frontend Components

- Built with React and Inertia.js for seamless SPA-like experience
- Key pages include:
  - Subject listing and detail views
  - Chat interface
  - Doubt dashboard
  - User profile management

## Component Interactions

1. **Subject Creation Flow**:
   - Professor creates a subject with description and optional files
   - System creates an OpenAI assistant and vector store
   - Files are processed and added to the vector store for context

2. **Chat Interaction Flow**:
   - User selects a subject and creates a new chat or continues an existing one
   - User sends messages to the AI assistant
   - Messages are processed by OpenAI's API and responses are streamed back
   - Chats can be reviewed later for doubts or questions

3. **Doubt Management Flow**:
   - System identifies potential doubts in chat conversations
   - Professors can review and address these doubts
   - Doubts can be added to the assistant's memory for improved responses

## Setup and Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and npm
- SQLite or MySQL database
- OpenAI API key

### Installation Steps

1. **Clone the repository**

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Generate application key: `php artisan key:generate`
   - Configure database connection in `.env`
   - Add your OpenAI API keys:
     ```
     OPENAI_API_KEY=your_api_key
     OPENAI_ORGANIZATION=your_organization_id
     OPENAI_PROJECT=your_project_id
     ```

5. **Database Setup**
   ```bash
   php artisan migrate
   php artisan db:seed  # Optional: adds sample data
   ```

6. **Start the Development Server**
   ```bash
   # Run all services concurrently
   composer dev

   # Or run services individually
   php artisan serve                  # Laravel server
   php artisan queue:listen --tries=1 # Queue worker
   php artisan pail --timeout=0       # Log viewer
   npm run dev                        # Vite development server
   ```

## Development Guidelines

### Code Style

- PHP code should follow PSR-12 standards
- Laravel Pint is configured for code formatting
  ```bash
  ./vendor/bin/pint
  ```

### Testing

- PHPUnit is used for testing
- Run tests with:
  ```bash
  php artisan test
  ```

### Git Workflow

- Create feature branches from main
- Submit pull requests for review
- Ensure tests pass before merging

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
