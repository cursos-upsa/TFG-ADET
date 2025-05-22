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
    /**
     * @throws Exception
     */
    public function show(string $id, OpenAIChatService $chatService)
    {
        $chat = Chat::where('user_id', auth()->user()->id)->find($id);
        $subject = Subject::find($chat->subject_id);

        if (!$chat || !$subject)
            throw new NotFoundHttpException();

        return Inertia::render('Chats/Chat', [
            'subjectId'   => $subject->id,
            'subjectName' => $subject->name,
            'threadId'    => $chat->thread_id,
            'messages'    => Inertia::defer(fn() => $chatService->getMessages($chat->thread_id)),
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

        return redirect()->route('chats.show', [
            'chatId' => $chat->id
        ]);
    }

    /**
     * @throws Exception
     */
    public function store(Request $request, OpenAIChatService $chatService)
    {
        $validatedData = $request->validate([
            'subjectId'      => ['required', 'int'],
            'threadId'       => ['required', 'string'],
            'newUserMessage' => ['required', 'string', 'max:10000'],
        ]);
        $subject = Subject::find($validatedData['subjectId']);
        $chat = Chat::where('thread_id', $validatedData['threadId'])->first();

        $chatService->createMessage(
            thread_id: $validatedData['threadId'],
            userMessage: $validatedData['newUserMessage']
        );
        $message = $chatService->executeRunAndGetResponseStream(
            thread_id: $validatedData['threadId'],
            assistant_id: $subject->assistant_id
        );
        $messages = [$validatedData['newUserMessage'], $message];

        $chat->last_activity = now();
        $chat->save();

        return Inertia::render('Chats/Chat', [
            // As the front-end aks for `only: ['messages']`, update the messages prop mergin the new messages.
            'messages' => Inertia::merge($messages)
        ]);
    }

    /**
     * @throws Exception
     */
    public function destroy(string $chatId, OpenAIChatService $chatService)
    {
        $chat = Chat::find($chatId);
        $subjectId = $chat->subject_id;

        $chatService->deleteThread($chat->thread_id);
        $chat->delete();

        return redirect()->route('subjects.show', [
            'subjectId' => $subjectId
        ]);
    }
}
