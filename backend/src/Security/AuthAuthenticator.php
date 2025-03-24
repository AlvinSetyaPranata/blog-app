<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class AuthAuthenticator extends AbstractAuthenticator
{
    private UserProviderInterface $userProvider;
    private  JWTEncoderInterface $jwtManager;

    public function __construct(UserProviderInterface $userProvider, JWTEncoderInterface $jwtManager)
    {
        $this->userProvider = $userProvider;
        $this->jwtManager = $jwtManager;
    }


    public function supports(Request $request): ?bool
    {
        return $request->headers->has('Authorization') && str_starts_with($request->headers->get('Authorization'), 'Bearer');
    }

    public function authenticate(Request $request): Passport
    {

        $token = $request->headers->get("Authorization");


        if (!$token || !preg_match('/^Bearer\s+(.+)$/', $token, $matches)) {
            throw new CustomUserMessageAuthenticationException('No JWT token provided.');
        }

        $jwtToken = $matches[1];

        try {
            $payload = $this->jwtManager->decode($jwtToken);
        } catch (\Exception $e) {
            throw new CustomUserMessageAuthenticationException('Invalid JWT token.');
        }

        if (!isset($payload['username'])) {
            throw new CustomUserMessageAuthenticationException('Invalid JWT payload.');
        }

        return new SelfValidatingPassport(
            new UserBadge($payload['username'], function ($userIdentifier) {
                return $this->userProvider->loadUserByIdentifier($userIdentifier);
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    /**
     * Handle authentication failure
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return null;
    }

    // //    public function start(Request $request, ?AuthenticationException $authException = null): Response
    // //    {
    // //        /*
    // //         * If you would like this class to control what happens when an anonymous user accesses a
    // //         * protected page (e.g. redirect to /login), uncomment this method and make this class
    // //         * implement Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface.
    // //         *
    // //         * For more details, see https://symfony.com/doc/current/security/experimental_authenticators.html#configuring-the-authentication-entry-point
    // //         */
    // //    }
}
