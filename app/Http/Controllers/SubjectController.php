<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Services\OpenAIAssistantService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $justUserSubjects = $request->query('user') === 'true';

        $subjects = $justUserSubjects ?
            Subject::where('user_id', $request->user()->id)->get() :
            Subject::all();

        return Inertia::render('Subjects', [
            'subjects' => $subjects
        ]);
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
        // Associate the user (professor) with the subject he just created.
        $user = $request->user();
        $user->subjects()->attach($subject->id);

        return redirect()->route('subjects.index');
    }

    public function update(string $id, Request $request)
    {
        // Update the subject with the given id.
    }

    public function destroy(string $id)
    {
        Subject::destroy($id);

        return redirect()->route('subjects.index')
            ->with('success', 'Asignatura eliminada correctamente.');
    }
}
