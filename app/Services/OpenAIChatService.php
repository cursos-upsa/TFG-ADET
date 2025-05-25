<?php

namespace App\Services;

use Exception;
use OpenAI\Client;

class OpenAIChatService
{
    protected Client $cliente;

    public function __construct(Client $cliente)
    {
        $this->cliente = $cliente;
    }

    public function getAllMessagesAfter(string $threadId, ?string $afterMessageId = null): array
    {
        $messages = [];
        $listParameters = [
            'order' => 'asc',
            'limit' => 100,
        ];

        if ($afterMessageId) {
            $listParameters['after'] = $afterMessageId;
        }

        do {
            $request = $this->cliente->threads()->messages()->list($threadId, $listParameters);

            foreach ($request->data as $result) {
                $messages[] = self::getMessageText($result->content);
            }

            if (isset($request->has_more) && $request->has_more && isset($request->last_id)) {
                $listParameters['after'] = $request->last_id;
            } else {
                break;
            }
        } while (true);

        return $messages;
    }

    /**
     * @throws Exception
     */
    public function getMessages(string $thread_id): array
    {
        $messages = [];

        try {
            $request = $this->cliente->threads()->messages()->list($thread_id, [
                "order" => "asc",
                "limit" => 100,
            ]);

            foreach ($request->data as $result)
                $messages[] = self::getMessageText($result->content);

            return $messages;
        } catch (Exception $e) {
            throw new Exception("Error al obtener los mensajes del thread \"$thread_id\".");
        }
    }

    /**
     * @throws Exception
     */
    public function deleteThread(string $threadId): void
    {
        try {
            $this->cliente->threads()->delete($threadId);
        } catch (Exception $e) {
            throw new Exception("Error al eliminar el thread \"$threadId\".");
        }
    }

    /**
     * @throws Exception
     */
    public function createThread(): string
    {
        try {
            $request = $this->cliente->threads()->create([]);
            return $request->id;
        } catch (Exception $e) {
            throw new Exception("Error al crear el thread.");
        }
    }

    /**
     * @throws Exception
     */
    public function createMessage(
        string $thread_id,
        string $userMessage
    ): string
    {
        try {
            $request = $this->cliente->threads()->messages()->create($thread_id, [
                'role' => 'user',
                'content' => $userMessage,
            ]);
            return $request->id;
        } catch (Exception $e) {
            throw new Exception(
                "Error al crear el mensaje para el thread \"$thread_id\"."
            );
        }
    }

    /**
     * @throws Exception
     */
    public function executeRunAndGetResponseStream(
        string $thread_id,
        string $assistant_id
    ): ?string
    {
        $contenidoMensaje = null;

        try {
            $stream = $this->cliente->threads()->runs()->createStreamed(
                threadId: $thread_id,
                parameters: [
                    'assistant_id' => $assistant_id,
                ]
            );

            foreach ($stream as $response) {
                $event = $response->event;
                $data = $response->response;

                $resultado = $this->handleRunStream($event, $data);
                if ($resultado !== null) {
                    $contenidoMensaje = $resultado;
                }
            }

            return $contenidoMensaje;
        } catch (Exception $e) {
            throw new Exception("Error en el stream de la run para el thread \"$thread_id\".");
        }
    }

    /**
     * @throws Exception
     */
    private function handleRunStream($event, $data): ?string
    {
        if ($event === 'thread.message.completed') {
            $message = $this->getMessageText($data->content);
            return $message ?: null;
        }

        // Fail events.
        if ($event === 'thread.run.failed')
            throw new Exception("La ejecución del run ha fallado: " .
                ($data->lastError?->message ?? 'Error desconocido'));

        if ($event === 'thread.run.expired')
            throw new Exception("La ejecución del run ha expirado");

        if ($event === 'thread.run.cancelled')
            throw new Exception("La ejecución del run ha sido cancelada");

        if ($event === 'thread.message.incomplete')
            throw new Exception("El mensaje está incompleto");

        // Assume other events as waiting for completion.
        return null;
    }

    private function getMessageText(array $content): string
    {
        $messageContent = '';

        foreach ($content as $item)
            if ($item->type === 'text')
                $messageContent .= $item->text->value;

        return $messageContent;
    }
}
