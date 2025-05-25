<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('doubts', function (Blueprint $table) {
            // Drop the 'doubt' column
            $table->dropColumn('doubt');

            // Add 'question' and 'answer' columns
            $table->text('question');
            $table->text('answer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doubts', function (Blueprint $table) {
            // Drop the 'question' and 'answer' columns
            $table->dropColumn(['question', 'answer']);

            // Add back the 'doubt' column
            $table->json('doubt');
        });
    }
};
