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
        Schema::create('doubts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->nullable()->constrained('chats')->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->json('doubt');
            $table->enum('state', ['pending', 'approved', 'rejected', 'discarded'])->default('pending');
            $table->text('comment')->nullable();
            $table->boolean('added_to_memory')->default(false);
            $table->foreignId('reviewer_user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->timestamp('reviewed_timestamp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doubts');
    }
};
