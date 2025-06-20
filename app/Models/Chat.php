<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'thread_id',
        'subject_id',
        'user_id',
        'last_activity',
        'last_synthesized_message_id',
        'last_synthesized',
    ];

    protected static function booted(): void
    {
        // Listen for the "creating" event and set the user ID to the current user's ID.
        static::creating(function (Chat $chat) {
            if (Auth::check() && !$chat->user_id) {
                $chat->user_id = Auth::id();
            }
        });
    }

    function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function doubts(): HasMany
    {
        return $this->hasMany(Doubt::class);
    }
}
