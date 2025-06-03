<?php

namespace Database\Factories;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assistant_id'       => fake()->unique()->uuid,
            'vector_store_id'    => fake()->unique()->uuid,
            'name'               => fake()->unique()->name,
            'description'        => fake()->unique()->sentence,
            'extra_instructions' => fake()->unique()->sentence,
            'user_id'            => 1,
        ];
    }
}
