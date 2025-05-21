<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Subject;
use App\Services\OpenAIChatService;
use Exception;
use Illuminate\Http\Request;
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
            'subjectName' => $subject->name,
            'threadId'    => $chat->thread_id,
            'messages'    => fn () => [],
        ]);
    }

    /**
     * @throws Exception
     */
    public function create(string $subjectId, OpenAIChatService $chatService)
    {
        $subject = Subject::find($subjectId);

        if (!$subject)
            throw new NotFoundHttpException();

        $threadId = $chatService->createThread();

        $chat = Chat::create([
            'subject_id'    => $subject->id,
            'thread_id'     => $threadId,
            'last_activity' => now()
        ]);

        return Inertia::render('Chats/Chat', [
            'subjectName' => $subject->name,
            'threadId'    => $chat->thread_id,
            'messages'    => [],
            'newChat'     => true,
        ]);
    }

    /**
     * @throws Exception
     */
    public function store(Request $request, OpenAIChatService $chatService)
    {
        $validatedData = $request->validate([
            'threadId' => ['required', 'int'],
            'message'  => ['required', 'string', 'max:10000'],
        ]);

        // TODO: Send request to OpenAI API to send the message to the thread.
    }
}
