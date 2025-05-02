<?php

namespace Tests\Unit;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRoleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the UserFactory can create a student.
     */
    public function test_factory_can_create_student(): void
    {
        $user = User::factory()->student()->create();
        $this->assertEquals('student', $user->role);
        $this->assertTrue($user->isStudent());
        $this->assertFalse($user->isProfessor());
    }

    /**
     * Test that the UserFactory can create a professor.
     */
    public function test_factory_can_create_professor(): void
    {
        $user = User::factory()->professor()->create();
        $this->assertEquals('professor', $user->role);
        $this->assertTrue($user->isProfessor());
        $this->assertFalse($user->isStudent());
    }

    /**
     * Test that the DatabaseSeeder creates the expected users.
     */
    public function test_seeder_creates_expected_users(): void
    {
        // Run the seeder
        $this->seed(DatabaseSeeder::class);

        // Check that we have 5 users total
        $this->assertEquals(5, User::count());

        // Check that we have 2 professors
        $this->assertEquals(2, User::where('role', 'professor')->count());

        // Check that we have 3 students
        $this->assertEquals(3, User::where('role', 'student')->count());

        // Check specific users
        $this->assertTrue(User::where('email', 'professor1@example.com')->exists());
        $this->assertTrue(User::where('email', 'professor2@example.com')->exists());
        $this->assertTrue(User::where('email', 'student1@example.com')->exists());
        $this->assertTrue(User::where('email', 'student2@example.com')->exists());
        $this->assertTrue(User::where('email', 'student3@example.com')->exists());

        // Check roles of specific users
        $this->assertEquals('professor', User::where('email', 'professor1@example.com')->first()->role);
        $this->assertEquals('professor', User::where('email', 'professor2@example.com')->first()->role);
        $this->assertEquals('student', User::where('email', 'student1@example.com')->first()->role);
        $this->assertEquals('student', User::where('email', 'student2@example.com')->first()->role);
        $this->assertEquals('student', User::where('email', 'student3@example.com')->first()->role);
    }
}