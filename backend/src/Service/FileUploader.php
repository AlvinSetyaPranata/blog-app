<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader {
    private string $targetDir;

    public function __construct(string $targetDir) {
        $this->targetDir = $targetDir;
    }

    public function upload(UploadedFile $file): string
    {
        $fileName = uniqid().'.'.$file->guessExtension();
        $file->move($this->targetDir, $fileName);

        return $fileName;
    }

    public function getTargetDirectory(): string
    {
        return $this->targetDir;
    }
}