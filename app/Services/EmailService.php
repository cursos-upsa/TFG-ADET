<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function sendDoubtsEmail(array $doubtsByUser): void
    {
        foreach ($doubtsByUser as $doubts) {
            if (empty($doubts)) {
                continue;
            }

            $user = $doubts[0]['user'];
            $emailContent = $this->createDoubtsEmailContent($doubts);

            Mail::html($emailContent, function ($message) use ($user) {
                $message->to($user['email'], $user['name'])
                    ->subject('Actualización de dudas');
            });
        }
    }

    private function createDoubtsEmailContent(array $doubts): string
    {
        $professor = $doubts[0]['professor'];
        $doubtCount = count($doubts);
        $doubtWord = $doubtCount === 1 ? 'duda' : 'dudas';

        $emailContent = "<h2>¡Hola!</h2>";
        $emailContent .= "<p>Nos complace informarte de que el profesor <strong>{$professor}</strong> acaba de revisar ";
        $emailContent .= "<span style='font-size: 1.1em;'><strong>{$doubtCount} {$doubtWord}</strong></span> que planteaste recientemente.</p>";

        $emailContent .= "<p>A continuación encontrarás los detalles:</p>";

        foreach ($doubts as $index => $doubtData) {
            $doubt = $doubtData['doubt'];
            $state = $this->translateState($doubt['state']);
            $stateColor = $state === 'Aprobada' ? '#28a745' : '#dc3545';

            $emailContent .= "<div style='margin-bottom: 20px;'>";
            $emailContent .= "<h3>📝 Duda " . ($index + 1) . "</h3>";
            $emailContent .= "<p><strong>Asignatura:</strong> " . htmlspecialchars($doubt['subject']) . "</p>";
            $emailContent .= "<p><strong>Tu pregunta:</strong> " . htmlspecialchars($doubt['question']) . "</p>";
            $emailContent .= "<p><strong>Respuesta del chatbot:</strong> <br>" .
                htmlspecialchars($doubt['answer']) .
                "</p>";

            if (!empty($doubt['comment'])) {
                $emailContent .= "<p><strong>Comentario del profesor:</strong> <br>" .
                    htmlspecialchars($doubt['comment']) .
                    "</p>";
            }

            $emailContent .= $state === 'Aprobada' ?
                "<p><strong>Estado:</strong> <span style='font-weight: bold; color: $stateColor;'>$state</span> - El profesor ha verificado que la respuesta del chatbot es correcta.</p>" :
                "<p><strong>Estado:</strong> <span style='font-weight: bold; color: $stateColor;'>$state</span> - El profesor ha indicado que la respuesta del chatbot no es correcta o no está completa</p>";

            $emailContent .= "</div>";
        }

        $emailContent .= "<p>¡Muchas gracias por tu participación la plataforma! No dudes en seguir preguntando tus dudas.</p>";
        $emailContent .= "<p>Un cordial saludo,<br>Chatbot del TFG de Enrique Redondo</p>";

        return $emailContent;
    }

    private function translateState(string $state): string
    {
        return match ($state) {
            'approved' => 'Aprobada',
            'rejected' => 'Rechazada',
            default    => $state,
        };
    }
}