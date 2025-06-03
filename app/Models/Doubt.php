<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Doubt extends Model
{
//    use HasFactory;

    protected $fillable = [
        'chat_id',
        'subject_id',
        'question',
        'answer',
        'state',
        'comment',
        'added_to_memory',
        'reviewer_user_id',
        'reviewed_timestamp',
    ];

    protected $casts = [
        'added_to_memory'    => 'boolean',
        'reviewed_timestamp' => 'datetime',
    ];

    function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }

    function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_user_id');
    }

    function reactions(): HasMany
    {
        return $this->hasMany(DoubtReaction::class);
    }
}
