<?php

namespace App\Http\Controllers;

use App\Models\Doubt;
use App\Models\Subject;
use App\Models\User;
use App\Services\OpenAIAssistantService;
use App\Services\OpenAIChatService;
use App\Services\OpenAIFilesService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SubjectController extends Controller
{
    public function index(): Response
    {
        $subjects = auth()->user()->subjects()
            ->select('subjects.id', 'subjects.name', 'subjects.description')
            ->get();

        return Inertia::render('Subjects/Subjects', [
            'subjects' => $subjects
        ]);
    }

    public function show(string $id): Response
    {
        $subject = Subject::find($id);

        if (!$subject)
            throw new NotFoundHttpException();

        $userIsProfessor = auth()->user()->isProfessor();

        $props = [
            'id'          => $subject->id,
            'name'        => $subject->name,
            'description' => $subject->description,
            'created_at'  => $subject->created_at->format('d/m/Y'),
            'chats'       => Inertia::defer(fn() => $subject->chats()
                ->where('user_id', auth()->user()->id)
                ->select('id')
                ->selectRaw(/** @lang GenericSQL */ <<<SQL
                CONCAT(
                    ELT(
                        WEEKDAY(last_activity) + 1,
                        'lunes',
                        'martes',
                        'miércoles',
                        'jueves',
                        'viernes',
                        'sábado',
                        'domingo'
                    ),
                    ', ',
                    DATE_FORMAT(last_activity, "%d-%m-%Y %H:%i")
                ) AS last_activity_formatted
                SQL
                )
                ->get(), 'chats'),
        ];

        if ($userIsProfessor) {

            $props['unprocessedChatsNumber'] = Inertia::defer(fn() => $subject->chats()->where(function ($query) {
                $query
                    ->WhereColumn('last_activity', '>', 'last_synthesized')
                    ->orWhereNull('last_synthesized');
            })->count(), 'chats_processing');

            $props['pendingDoubtsNumber'] =
                Inertia::defer(fn() => Doubt::where('subject_id', $subject->id)->where('state',
                    'pending')->count(),
                    'doubts');
        }

        return Inertia::render('Subjects/Subject', $props);
    }

    public function edit(string $id)
    {
        // Render the form to edit the subject with the given id.
    }

    /**
     * @throws Exception
     */
    public function store(Request $request, OpenAIAssistantService $assistantService,
        OpenAIFilesService $filesService): RedirectResponse
    {
        $validatedData = $request->validate([
            'name'               => ['required', 'string', 'max:255'],
            'description'        => ['required', 'string', 'max:1000'],
            'extra_instructions' => ['nullable', 'string', 'max:2000'],
            'studentIds'         => ['nullable', 'array'],
            'studentIds.*'       => ['exists:users,id'],

            'files'   => ['nullable', 'array', 'max:10'],
            'files.*' => [
                'file',
                'max:20971520', // 20 MB
                'mimes:c,cpp,cs,css,doc,docx,go,html,java,js,json,md,pdf,php,pptx,py,rb,sh,tex,ts,txt'
            ]
        ]);

        $fileIds = $filesService->uploadFiles($validatedData['files']);
        $vectorStoreId = $filesService->createVectorStore($validatedData['name'], $fileIds);

        $assistantId = $assistantService->createAssistant(
            name: $validatedData['name'],
            extraInstructions: $validatedData['extra_instructions'],
            vectorStoreId: $vectorStoreId,
        );
        $subject = Subject::create([
            'assistant_id'       => $assistantId,
            'vector_store_id'    => $vectorStoreId,
            'name'               => $validatedData['name'],
            'description'        => $validatedData['description'],
            'extra_instructions' => $validatedData['extra_instructions'],
        ]);
        // Associate the user (professor) with the subject he just created.
        $user = $request->user();
        $user->subjects()->attach($subject->id);

        // Associate selected students with the subject if any were selected
        if (!empty($validatedData['studentIds'])) {
            $subject->users()->attach($validatedData['studentIds']);
        }

        return redirect()->route('subjects.index');
    }

    public function create(): Response
    {
        return Inertia::render('Subjects/CreateSubject',
            [
                'students' => Inertia::defer(fn() => User::where('role', 'student')
                    ->select('id', 'name')
                    ->orderBy('name')
                    ->get(),
                    'students'),
            ]);
    }

    public function update(string $id, Request $request)
    {
        // Update the subject with the given id.
    }

    /**
     * @throws Exception
     */
    public function destroy(string $id, OpenAIAssistantService $assistantService,
        OpenAIFilesService $filesService, OpenAIChatService $chatService): void
    {
        $subject = Subject::find($id);

        $assistantService->deleteAssistant($subject->assistant_id);
        if ($subject->vector_store_id) {
            $filesService->deleteFiles($subject->vector_store_id);
            $filesService->deleteVectorStore($subject->vector_store_id);
        }
        $subject->chats()->each(fn($chat) => $chatService->deleteThread($chat->thread_id));

        $subject->delete();
    }
}
