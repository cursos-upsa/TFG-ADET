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
