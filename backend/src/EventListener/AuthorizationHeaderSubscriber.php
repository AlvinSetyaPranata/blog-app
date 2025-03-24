<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelEvents;

class AuthorizationHeaderSubscriber implements EventSubscriberInterface
{

    // private array $excludedRoutes = [
    //     'login',      
    // ];
    private array $exculudedRoutes = ["/api/auth/login", "/api/auth/register"];

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();

        if ($request->isMethod('OPTIONS')) {
            return;
        }

        if (in_array($request->getPathInfo(), $this->exculudedRoutes, true)) {
            return;
        }

        if (!$request->headers->has('Authorization')) {
            $event->setResponse(new JsonResponse(['error' => 'Missing Authorization header'], Response::HTTP_UNAUTHORIZED));
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
        ];
    }
}
