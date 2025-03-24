<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthorizationHeaderListener
{

   private array $exculudedRoutes = ["/api/auth/login", "/api/auth/register"];

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();

        // Allow OPTIONS requests (for CORS preflight requests)
        if ($request->isMethod('OPTIONS')) {
            return;
        }

        if (in_array($request->getPathInfo(), $this->exculudedRoutes, true)) {
            return;
        }

        // Check if Authorization header is missing
        if (!$request->headers->has('Authorization')) {
            $response = new JsonResponse(['error' => 'Authorization header is required'], Response::HTTP_UNAUTHORIZED);
            $event->setResponse($response);
        }
    }
}
