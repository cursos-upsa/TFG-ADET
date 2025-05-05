<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Subject extends Model
{

    protected $fillable = [
        'assistant_id',
        'name',
        'description',
        'extra_instructions',
        'user_id',
    ];

    protected static function booted(): void
    {
        // Listen for the "creating" event and set the user ID to the current user's ID.
        static::creating(function (Subject $subject) {
            if (Auth::check())
                $subject->user_id = Auth::id();
        });
    }
}
