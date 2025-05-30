<?php

namespace App\Http\Controllers;

use App\Models\Doubt;
use App\Models\DoubtReaction;

class NotificationController extends Controller
{
    const REACTION_TRANSLATIONS = [
        'useful' => '👍 Útil',
        'clear'  => '👍 Queda claro',
        'explain_in_class_please' => '🤔 Explicar en clase',
    ];

    public function index()
    {
        // Get the last 10 validated or rejected doubts form chats of the user.
        $userId = auth()->user()->id;
        $doubts = Doubt::whereHas('chat', function ($query) use ($userId) {
            $query
                ->where('user_id', $userId)
                ->whereIn('state', ['approved', 'rejected']);
        })
            ->latest()
            ->take(10)
            ->select('doubts.id', 'doubts.state', 'doubts.question', 'doubts.answer', 'doubts.updated_at')
            ->get()
            ->map(function ($doubt) {
                return [
                    'type'       => 'validation',
                    'id'         => $doubt->id,
                    'state'      => $doubt->state,
                    'question'   => $doubt->question,
                    'answer'     => $doubt->answer,
                    'updated_at' => $doubt->updated_at,
                ];
            });

        // From the last 20 reactions to doubts from chats by the current user,
        // get the doubts and the reactions.
        $doubtReactions = DoubtReaction::whereIn('doubt_id', function ($query) use ($userId) {
            $query->select('doubts.id')
                ->from('doubts')
                ->join('chats', 'doubts.chat_id', '=', 'chats.id')
                ->where('chats.user_id', $userId);
        })
            ->with(['doubt:id,question'])
            ->latest()
            ->take(20)
            ->get()
            ->map(function ($reaction) {
                return [
                    'type'           => 'reaction',
                    'id'             => $reaction->id,
                    'doubt_id'       => $reaction->doubt_id,
                    'doubt_question' => $reaction->doubt->question ?? null,
                    'reaction_type'  => self::REACTION_TRANSLATIONS[$reaction->type],
                    'updated_at'     => $reaction->updated_at,
                ];
            });

        // Combinar los arrays y ordenar por updated_at
        $notifications = $doubts->concat($doubtReactions)
            ->sortByDesc('updated_at')
            ->values()
            ->all();

        dd($notifications);
    }
}
