# TFG-ADET Project Guidelines

This document provides essential information for developers working on the TFG-ADET project.

## Project Overview

TFG-ADET is a Laravel 12 application with a React frontend using Inertia.js. The application integrates with OpenAI's API for chat functionality.

## Build and Configuration Instructions

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js and npm
- MySQL or SQLite database

### Setup Steps

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
   - Configure OpenAI API keys in `.env`

5. **Database Setup**
   - Run migrations: `php artisan migrate`
   - Seed the database: `php artisan db:seed`

6. **Start the Development Server**
   ```bash
   # Run all services concurrently (server, queue, logs, vite)
   composer dev

   # Or run services individually
   php artisan serve                 # Laravel server
   php artisan queue:listen --tries=1 # Queue worker
   npm run dev                       # Vite development server
   ```

## Testing Information

### Testing Framework
- PHPUnit is used for testing
- Tests are organized into Feature and Unit tests
- The application uses SQLite in-memory database for testing

### Running Tests

```bash
# Run all tests
php artisan test

# Run a specific test file
php artisan test tests/Feature/ChatControllerTest.php

# Run tests with coverage report
php artisan test --coverage
```

### Creating Tests

1. **Create a new test file**
   ```bash
   php artisan make:test NameOfTestClass
   ```

2. **Test Structure**
   - Feature tests extend `Tests\TestCase`
   - Unit tests can extend either `Tests\TestCase` or `PHPUnit\Framework\TestCase`
   - Use the `RefreshDatabase` trait for tests that interact with the database

3. **Example Test**
   ```php
   <?php

   namespace Tests\Feature;

   use App\Models\User;
   use Illuminate\Foundation\Testing\RefreshDatabase;
   use Tests\TestCase;

   class ExampleTest extends TestCase
   {
       use RefreshDatabase;

       public function test_example(): void
       {
           $user = User::factory()->create();

           $this->actingAs($user)
                ->get('/dashboard')
                ->assertStatus(200);
       }
   }
   ```

## Development Guidelines

### Code Style
- PHP code style is enforced using Laravel Pint with default configuration
- Run `./vendor/bin/pint` to format PHP code

### Key Components
- **Authentication**: Laravel Breeze with Inertia.js
- **Frontend**: React with Inertia.js
- **API Integration**: OpenAI API for chat functionality
- **Database**: Models include User, Subject, Chat

### Development Workflow
1. Create a feature branch from main
2. Implement changes with appropriate tests
3. Run tests to ensure all pass
4. Format code with Pint
5. Submit pull request

### Useful Commands
- `php artisan route:list` - List all registered routes
- `php artisan make:model ModelName -mfc` - Create model with migration, factory, and controller
- `php artisan tinker` - Interactive REPL for the application
