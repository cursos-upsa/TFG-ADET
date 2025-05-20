<?php

namespace App\Services;

use Exception;
use OpenAI\Client;

class OpenAIFilesService
{
    protected Client $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @throws Exception
     */
    public function uploadFiles(array $uploadedFiles): array
    {
        $openAIFileIds = [];

        if (empty($uploadedFiles))
            return $openAIFileIds;

        try {
            foreach ($uploadedFiles as $file) {
                // Get the original filename and extension
                $originalName = $file->getClientOriginalName();

                // Create a unique temporary file with the original filename to preserve the extension
                $tempPath = tempnam(sys_get_temp_dir(), 'openai_upload_');
                $tempPathWithExt = $tempPath . '_' . $originalName;

                // Copy the file content to the temporary file
                copy($file->getRealPath(), $tempPathWithExt);

                // Upload the file with the correct extension
                $response = $this->client->files()->upload([
                    'purpose' => 'assistants',
                    'file'    => fopen($tempPathWithExt, 'rb'),
                ]);

                // Clean up the temporary files
                if (file_exists($tempPath)) {
                    unlink($tempPath);
                }
                if (file_exists($tempPathWithExt)) {
                    unlink($tempPathWithExt);
                }

                $openAIFileIds[] = $response->id;
            }
        } catch (Exception $e) {
            $this->attemptCleanupFilesOnError($openAIFileIds);
            throw new Exception("Error al subir los archivos. " . $e->getMessage());
        }
        return $openAIFileIds;
    }

    /**
     * @throws Exception
     */
    public function createVectorStore(string $vectorStoreName, array $openaiFileIds): ?string
    {
        if (empty($openaiFileIds))
            return null;

        try {
            $response = $this->client->vectorStores()->create([
                'name'     => $vectorStoreName,
                'file_ids' => $openaiFileIds,
            ]);
            return $response->id;
        } catch (Exception $e) {
            $this->attemptCleanupFilesOnError($openaiFileIds);
            throw new Exception("Error al crear el vector store \"$vectorStoreName\". " . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function deleteVectorStore(string $vectorStoreId): void
    {
        try {
            $this->client->vectorStores()->delete($vectorStoreId);
        } catch (Exception $e) {
            throw new Exception("Error al eliminar el vector store \"$vectorStoreId\".");
        }
    }

    /**
     * @throws Exception
     */
    public function deleteFiles(string $vectorStoreId): void
    {
        try {
            $filesResponse = $this->client->vectorStores()->files()->list(
                vectorStoreId: $vectorStoreId
            );

            foreach ($filesResponse->data as $fileObj)
                $this->client->files()->delete($fileObj->id);
        } catch (Exception $e) {
            throw new Exception("Error al eliminar los archivos del vector store con ID: $vectorStoreId");
        }
    }

    /**
     * @throws Exception
     */
    private function attemptCleanupFilesOnError(array $fileIds): void
    {
        foreach ($fileIds as $fileId) {
            try {
                $this->client->files()->delete($fileId);
            } catch (Exception $e) {
                throw new Exception("Error al intentar limpiar archivo huérfano con ID: $fileId.");
            }
        }
    }
}
