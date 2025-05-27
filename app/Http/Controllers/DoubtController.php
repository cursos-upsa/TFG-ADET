<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Inertia\Inertia;

class DoubtController extends Controller
{
    public function show(int $subjectId)
    {
        $subject = Subject::find($subjectId);

        return Inertia::render('Doubts/DoubtDashboard', [
            'subjectName' => $subject->name,
            'doubts'      => $subject->doubts()
                ->select('id', 'state', 'created_at', 'question', 'answer')
                ->orderBy('created_at')
                ->get()
        ]);
    }
}
