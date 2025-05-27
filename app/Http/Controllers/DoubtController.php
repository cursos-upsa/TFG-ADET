<?php

namespace App\Http\Controllers;

use App\Models\Doubt;
use App\Models\Subject;
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

    public function store(int $subjectId, Request $request)
    {
        $validatedData = $request->validate([
            'doubts'    => ['array'],
            'doubts.*'  => [
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
            // TODO: use the AssistantService to add the doubt to the assisntat's instructiones.

            $doubt->state = $addToMemory ? 'approved' : $doubtToStore['state'];
            $doubt->added_to_memory = $addToMemory;
            $doubt->comment = $doubtToStore['comment'] ?? null;
            $doubt->reviewer_user_id = auth()->user()->id;
            $doubt->save();
        }

        return redirect()->route('subjects.show', [
            'subjectId' => $subjectId
        ]);
    }
}
