<?php

namespace App\Services;

use Exception;
use OpenAI\Client;

class OpenAIChatService
{
    protected Client $client;

    /**
     * @param Client $client
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @throws Exception
     */
    public function createThread(): string
    {
        try {
            $request = $this->client->threads()->create([]);
            return $request->id;
        } catch (Exception $e) {
            throw new Exception("Error al crear la thread.");
        }
    }
}