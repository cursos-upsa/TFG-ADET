<?php

namespace Database\Factories;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random user ID if users exist, otherwise use ID 1
        $userId = User::count() > 0 ? User::inRandomOrder()->first()->id : 1;

        return [
            'thread_id' => fake()->unique()->uuid,
            'subject_id' => 1,
            'user_id' => $userId,
            'last_activity' => fake()->dateTime(),
            'last_synthesized_message_id' => fake()->unique()->uuid,
            'last_synthesized' => fake()->dateTime(),
        ];
    }
}
