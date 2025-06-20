<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Doubt;
use App\Models\Subject;
use App\Services\OpenAIChatProcessingService;
use App\Services\OpenAIChatService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ChatController extends Controller
{
    /**
     * @throws Exception
     */
    public function show(string $id, OpenAIChatService $chatService): Response
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
    public function store(Request $request, OpenAIChatService $chatService): Response
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
    public function destroy(string $chatId, OpenAIChatService $chatService): RedirectResponse
    {
        $chat = Chat::find($chatId);
        $subjectId = $chat->subject_id;

        $chatService->deleteThread($chat->thread_id);
        $chat->delete();

        return redirect()->route('subjects.show', [
            'subjectId' => $subjectId
        ]);
    }

    /**
     * @throws Exception
     */
    public function process(int $subjectId, OpenAIChatService $chatService,
        OpenAIChatProcessingService $chatProcessingService): RedirectResponse
    {
        $subject = Subject::find($subjectId);
        $unprocessedChats = $subject->chats()->where(function ($query) {
            $query
                ->WhereColumn('last_activity', '>', 'last_synthesized')
                ->orWhereNull('last_synthesized');
        })->get();

        foreach ($unprocessedChats as $chat) {
            $threadId = $chat->thread_id;
            $lastSythesizedMessageId = $chat->last_synthesized_message_id;

            $lastMessageId = $chatService->getLastMessageId($threadId);

            $chatMessages = $chatService->getAllMessagesAfter(
                threadId: $threadId,
                afterMessageId: $lastSythesizedMessageId
            );
            $doubts = $chatProcessingService->extractDoubts($chatMessages, $subject->name);

            foreach ($doubts as $doubt) {
                Doubt::create([
                    'chat_id'            => $chat->id,
                    'subject_id'         => $subject->id,
                    'question'           => $doubt->question,
                    'answer'             => $doubt->answer,
                    'state'              => 'pending',
                    'reviewer_user_id'   => null,
                    'added_to_memory'    => false,
                    'reviewed_timestamp' => null,
                ]);
            }

            $chat->last_synthesized = now();
            $chat->last_synthesized_message_id = $lastMessageId;
            $chat->save();
        }

        return redirect()->route('subjects.show', [
            'subjectId' => $subject->id
        ]);
    }

    /**
     * @throws Exception
     */
    public function create(string $subjectId, OpenAIChatService $chatService): RedirectResponse
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
}
