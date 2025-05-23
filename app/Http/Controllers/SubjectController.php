<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Services\OpenAIAssistantService;
use App\Services\OpenAIChatService;
use App\Services\OpenAIFilesService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::where('user_id', auth()->user()->id)->get();

        return Inertia::render('Subjects/Subjects', [
            'subjects' => $subjects
        ]);
    }

    public function show(string $id)
    {
        $subject = Subject::find($id);

        if (!$subject)
            throw new NotFoundHttpException();

        return Inertia::render('Subjects/Subject', [
            'id'          => $subject->id,
            'name'        => $subject->name,
            'description' => $subject->description,
            'created_at'  => $subject->created_at->format('d/m/Y H:i'),
            'chats'       => Inertia::defer(fn() => $subject->chats()->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Subjects/CreateSubject');
    }

    public function edit(string $id)
    {
        // Render the form to edit the subject with the given id.
    }

    /**
     * @throws Exception
     */
    public function store(Request $request, OpenAIAssistantService $assistantService, OpenAIFilesService $filesService)
    {
        $validatedData = $request->validate([
            'name'               => ['required', 'string', 'max:255'],
            'description'        => ['required', 'string', 'max:1000'],
            'extra_instructions' => ['nullable', 'string', 'max:2000'],

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

        return redirect()->route('subjects.index');
    }

    public function update(string $id, Request $request)
    {
        // Update the subject with the given id.
    }

    /**
     * @throws Exception
     */
    public function destroy(string             $id, OpenAIAssistantService $assistantService,
                            OpenAIFilesService $filesService, OpenAIChatService $chatService)
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
