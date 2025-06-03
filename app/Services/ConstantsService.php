<?php

namespace App\Services;

class ConstantsService
{
    public const OPENAI_ASSITANTS_MODEL = 'gpt-4.1';
    public const OPENAI_DOUBTS_MODEL = 'gpt-4.1-mini';

    public const REACTION_TRANSLATIONS = [
        'useful'                  => '👍 Útil',
        'clear'                   => '👍 Queda claro',
        'explain_in_class_please' => '🤔 Explicar en clase',
    ];

    private function __construct() {}
}
