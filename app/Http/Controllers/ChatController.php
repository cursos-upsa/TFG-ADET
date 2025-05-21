<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Subject;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ChatController extends Controller
{
    public function show(string $id)
    {
        $chat = Chat::find($id);
        $subject = Subject::find($chat->subject_id);

        if (!$chat || !$subject)
            throw new NotFoundHttpException();

        return Inertia::render('Chats/Chat', [
            'subjectId' => $subject->id,
            'subjectName' => $subject->name,
            'chatInfo'  => $chat->toArray(),
        ]);
    }

    public function create(string $subjectId)
    {
        $subject = Subject::find($subjectId);

        if (!$subject)
            throw new NotFoundHttpException();


        return Inertia::render('Chats/Chat', [
            'subjectId' => $subject->id,
            'subjectName' => $subject->name,
        ]);
    }
}
