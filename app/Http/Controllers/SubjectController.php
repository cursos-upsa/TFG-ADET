<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Services\OpenAIAssistantService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        // Render all the subjects of the user here.
        return Inertia::render('Subjects');
    }

    public function show(string $id)
    {
        // Show the subject with the given id.
    }

    public function create()
    {
        // Render the form to create a new subject.
        return Inertia::render('CreateSubject');
    }

    public function edit(string $id)
    {
        // Render the form to edit the subject with the given id.
    }

    /**
     * @throws Exception
     */
    public function store(Request $request, OpenAIAssistantService $assistantService)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'extra_instructions' => ['nullable', 'string', 'max:255'],

            'files' => ['nullable', 'array', 'max:5'],
            'files.*' => ['file', 'max:1024', 'mimes:pdf,txt,csv']
        ]);

        $assistantId = $assistantService->createAssistant(
            name: $validatedData['name'],
            extraInstructions: $validatedData['extra_instructions'],
        );
        $subject = Subject::create([
            'assistant_id' => $assistantId,
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'extra_instructions' => $validatedData['extra_instructions'],
        ]);
        $subject_id = $subject->id;
        $user_id = $subject->user_id;

        // TODO: crear una entrada en `subject_user`.

        // Redirect to the subjects page.
        return redirect()->route('subjects.index');
    }

    public function update(string $id, Request $request)
    {
        // Update the subject with the given id.
    }


}
