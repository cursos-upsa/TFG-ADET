<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create two professors
        User::factory()->professor()->create([
            'name' => 'Professor One',
            'email' => 'professor1@example.com',
        ]);

        User::factory()->professor()->create([
            'name' => 'Professor Two',
            'email' => 'professor2@example.com',
        ]);

        // Create three students
        User::factory()->student()->create([
            'name' => 'Student One',
            'email' => 'student1@example.com',
        ]);

        User::factory()->student()->create([
            'name' => 'Student Two',
            'email' => 'student2@example.com',
        ]);

        User::factory()->student()->create([
            'name' => 'Student Three',
            'email' => 'student3@example.com',
        ]);
    }
}
