<?php

namespace App\Http\Controllers;

use App\Models\Doubt;
use App\Models\Subject;
use App\Services\OpenAIAssistantService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoubtController extends Controller
{
    public function index(Request $request)
    {
        // Get the user's subjects
        $user = auth()->user();
        $userSubjects = $user->subjects()->select('subjects.id', 'subjects.name')->get();
        $userSubjectIds = $userSubjects->pluck('id')->toArray();

        $validatedData = $request->validate([
            'subjectId' => [
                'nullable',
                'integer',
                'exists:subjects,id',
                function ($attribute, $value, $fail) use ($userSubjectIds) {
                    if ($value && !in_array($value, $userSubjectIds)) {
                        $fail('No tiene acceso a esta asignatura.');
                    }
                }
            ],
        ]);

        // Get all the doubts that are approved or rejected and belong to the user's subjects
        $query = Doubt::query()
            ->whereIn('state', ['approved', 'rejected'])
            ->whereIn('doubts.subject_id', $userSubjectIds)
            ->join('users as reviewers', 'reviewers.id', '=', 'doubts.reviewer_user_id')
            ->join('chats', 'chats.id', '=', 'doubts.chat_id')
            ->join('users as creators', 'creators.id', '=', 'chats.user_id')
            ->join('subjects', 'subjects.id', '=', 'doubts.subject_id')
            ->select(
                'doubts.id',
                'doubts.state',
                'doubts.updated_at',
                'doubts.question',
                'doubts.answer',
                'doubts.comment',
                'subjects.id as subject_id',
                'subjects.name as subject_name',
                'reviewers.name as reviewer_name',
                'creators.role as creator_role'
            )
            ->selectRaw(/** @lang GenericSQL */ <<<SQL
            CASE WHEN creators.role = 'professor' 
                THEN creators.name 
                ELSE NULL 
            END as professor_name
            SQL);

        if (isset($validatedData['subjectId']))
            $query->where('doubts.subject_id', $validatedData['subjectId']);

        // Filter for the most recent updated_at doubts
        $doubts = $query
            ->latest('doubts.updated_at')
            ->take(50)
            ->get();

        return Inertia::render('Doubts/Forum', [
            'subjectId'   => $validatedData['subjectId'] ?? null,
            'subjectList' => $userSubjects,
            'doubts'      => $doubts
        ]);
    }

    public function show(int $subjectId)
    {
        $subject = Subject::find($subjectId);

        return Inertia::render('Doubts/DoubtDashboard', [
            'subjectId'   => $subjectId,
            'subjectName' => $subject->name,
            'doubts'      => $subject->doubts()
                ->where('state', 'pending')
                ->select('id', 'state', 'created_at', 'question', 'answer')
                ->orderBy('created_at')
                ->get()
        ]);
    }

    /**
     * @throws Exception
     */
    public function store(int $subjectId, Request $request, OpenAIAssistantService $assistantService)
    {
        $validatedData = $request->validate([
            'doubts'   => ['array'],
            'doubts.*' => [
                'id'      => ['required', 'integer'],
                'state'   => ['required', 'string', 'in:pending,approved,approvedToMemory,rejected,discarded'],
                'comment' => ['nullable', 'string', 'max:1500'],
            ]
        ]);
        $validatedDoubts = $validatedData['doubts'];

        foreach ($validatedDoubts as $doubtToStore) {
            if ($doubtToStore['state'] === 'pending')
                continue;

            $doubt = Doubt::find($doubtToStore['id']);
            $addToMemory = $doubtToStore['state'] === 'approvedToMemory';

            $doubt->state = $addToMemory ? 'approved' : $doubtToStore['state'];
            $doubt->added_to_memory = $addToMemory;
            $doubt->comment = $doubtToStore['comment'] ?? null;
            $doubt->reviewer_user_id = auth()->user()->id;
            $doubt->save();
        }
        // Get all the doubts maked as addToMemory from the subject and add them to the assistant.
        $subject = Subject::find($subjectId);

        $addToMemoryDoubts = $subject->doubts()
            ->where('added_to_memory', true)
            ->select('question', 'answer', 'comment')
            ->get()
            ->toArray();

        if (count($addToMemoryDoubts) > 0)
            $assistantService->updateAssistantInstructions(
                assistantId: $subject->assistant_id,
                subjectName: $subject->name,
                extraInstructions: $subject->extra_instructions,
                doubts: $addToMemoryDoubts
            );

        return redirect()->route('subjects.show', [
            'subjectId' => $subjectId
        ]);
    }
}
