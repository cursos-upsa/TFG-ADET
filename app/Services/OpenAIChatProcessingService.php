<?php

namespace App\Services;

use Exception;
use OpenAI\Client;

class OpenAIChatProcessingService
{
    protected Client $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @throws Exception
     */
    public function extractDoubts(array $chatMessages, string $subjectName): array
    {
        $prompt = $this->buildPrompt($chatMessages, $subjectName);

        $response = $this->client->chat()->create([
            'model'           => ConstantsService::OPENAI_DOUBTS_MODEL,
            'messages'        => [
                [
                    'role'    => 'system',
                    'content' => 'Eres un asistente que ayuda a identificar dudas relevantes en conversaciones educativas.',
                ],
                [
                    'role'    => 'user',
                    'content' => $prompt,
                ],
            ],
            'response_format' => [
                "type"        => "json_schema",
                "json_schema" => [
                    'name'   => 'preguntas_academicas_respuestas',
                    'schema' => [
                        'type'                 => 'object',
                        'properties'           => [
                            'questions' => [
                                'type'        => 'array',
                                'description' => 'Un array de preguntas académicas relevantes y sus respuestas.',
                                'items'       => [
                                    'type'                 => 'object',
                                    'properties'           => [
                                        'question' => [
                                            'type'        => 'string',
                                            'description' => 'Pregunta académica relevante, clara y autocontenida.'
                                        ],
                                        'answer'   => [
                                            'type'        => 'string',
                                            'description' => 'Respuesta a la pregunta académica.'
                                        ]
                                    ],
                                    'required'             => ['question', 'answer'],
                                    'additionalProperties' => false
                                ]
                            ]
                        ],
                        'required'             => ['questions'],
                        'additionalProperties' => false
                    ],
                    'strict' => true
                ]]
        ]);

        $content = $response->choices[0]->message->content ?? '';

        $doubts = json_decode($content);

        if (!is_object($doubts)) {
            throw new Exception('La respuesta del modelo no es un JSON válido.');
        }

        return $doubts->questions;
    }

    private function buildPrompt(array $chatMessages, string $subjectName): string
    {
        $messagesText = '';
        foreach ($chatMessages as $msg) {
            $messagesText .= "- $msg\n";
        }

        return <<<TEXT
            # Identidad
            
            Eres un asistente especializado en extraer preguntas académicas relevantes de conversaciones educativas. Tu objetivo es identificar únicamente preguntas que tengan valor pedagógico para otros estudiantes de la asignatura "$subjectName".
            
            # Instrucciones
            
            ## Criterios de Relevancia
            * INCLUIR: Preguntas sobre conceptos, teorías, procedimientos, aplicaciones prácticas, ejemplos, ejercicios o metodologías específicas de la asignatura
            * INCLUIR: Dudas sobre cómo resolver problemas, interpretar resultados o aplicar conocimientos
            * INCLUIR: Solicitudes de clarificación sobre material del curso, definiciones o explicaciones
            
            ## Criterios de Exclusión
            * EXCLUIR: Preguntas sobre logística del curso (fechas de examen, horarios, políticas de calificación)
            * EXCLUIR: Consultas sobre procedimientos administrativos o burocráticos
            * EXCLUIR: Preguntas personales sobre el profesor o expectativas subjetivas
            * EXCLUIR: Comentarios que no sean preguntas directas
            * EXCLUIR: Preguntas sobre dificultad del examen, comprensión del profesor, o aspectos emocionales del aprendizaje
            
            ## Formato de Respuesta
            * Devuelve exclusivamente un array JSON válido
            * Si encuentras preguntas relacionadas, combínalas en una sola entrada
            * Si no hay preguntas relevantes, devuelve un array vacío: []
            * Reformula las preguntas para que sean claras y autocontenidas
            * Las respuestas deben basarse únicamente en la información presente en la conversación
            
            # Ejemplos
            
            <conversacion_ejemplo>
            Estudiante: "¿Cómo se calcula la derivada de una función compuesta?"
            Asistente: "Para calcular la derivada de una función compuesta usas la regla de la cadena..."
            Estudiante: "¿El profesor será comprensivo en el examen?"
            </conversacion_ejemplo>
            
            <respuesta_ejemplo>
            [
              {
                "pregunta": "¿Cómo se calcula la derivada de una función compuesta?",
                "respuesta": "Para calcular la derivada de una función compuesta usas la regla de la cadena..."
              }
            ]
            </respuesta_ejemplo>
            
            # Contexto de la Conversación
            
            <mensajes>
            $messagesText
            </mensajes>
            
            Analiza los mensajes anteriores y extrae únicamente las preguntas académicamente relevantes para la asignatura "$subjectName", siguiendo estrictamente los criterios establecidos.
            TEXT;
    }
}
