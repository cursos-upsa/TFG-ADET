<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ChatController extends Controller
{
    public function show(string $id)
    {
        $chat = Chat::find($id);

        if (!$chat)
            throw new NotFoundHttpException();

        return Inertia::render('Chats/Chat', [
            'subjectId' => $chat->subject_id,
            'chatInfo'  => $chat->toArray(),
        ]);
    }
}
