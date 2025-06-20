<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DoubtController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::name('subjects.')->prefix('subjects')->group(function () {
        Route::get('/', [SubjectController::class, 'index'])->name('index');

        Route::middleware('professor')->group(function () {
            Route::get('/create', [SubjectController::class, 'create'])->name('create');
            Route::post('/store', [SubjectController::class, 'store'])->name('store');
            Route::delete('/{subjectId}', [SubjectController::class, 'destroy'])->name('destroy');
        });

        Route::get('/{subjectId}', [SubjectController::class, 'show'])->name('show');
    });

    Route::name('chats.')->prefix('chats')->group(function () {
        Route::get('/create/{subjectId}', [ChatController::class, 'create'])->name('create');
        Route::post('/store', [ChatController::class, 'store'])->name('store');

        Route::get('/{chatId}', [ChatController::class, 'show'])->name('show');
        Route::delete('/{chatId}', [ChatController::class, 'destroy'])->name('destroy');

        Route::middleware('professor')->group(function () {
            Route::get('/process/{subjectId}', [ChatController::class, 'process'])->name('process');
        });
    });

    Route::name('doubts.')->prefix('doubts')->group(function () {
        Route::middleware('professor')->group(function () {
            Route::get('/{subjectId}', [DoubtController::class, 'show'])->name('show');
            Route::post('/{subjectId}', [DoubtController::class, 'store'])->name('store');
        });
    });

    Route::name('forum.')->prefix('forum')->group(function () {
        Route::get('/', [DoubtController::class, 'index'])->name('index');
        Route::post('/react', [DoubtController::class, 'react'])->name('react');
    });
});

require __DIR__.'/auth.php';
