<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class AuthController extends AbstractController
{
    #[Route('/api/auth/login', name: 'login', methods: ['POST'])]
    public function login(Request $req, UserPasswordHasherInterface $hasher, EntityManagerInterface $em, JWTTokenManagerInterface $tm): JsonResponse
    {
        $reqData = json_decode($req->getContent(), true);

        if (!isset($reqData["email"], $reqData["password"])) {
            return new JsonResponse(['messege' => 'Invalid credential'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(User::class)->findByEmail($reqData["email"]);

        if (!$user) {
            return new JsonResponse(['messege' => 'Invalid Username or Password'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        if (!$hasher->isPasswordValid($user, $reqData["password"])){
            return new JsonResponse(['messege' => 'Invalid Username or Password'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $accessToken = $tm->create($user);
        $refreshToken = bin2hex(random_bytes(64));

        $cookie = Cookie::create("refresh_token")
                    ->withValue($refreshToken)
                    ->withHttpOnly(true)
                    ->withSecure(true)
                    ->withPath('/api/auth/refresh')
                    ->withSameSite('Strict')
                    ->withExpires(new \DateTime('+7 Days'));

        $res = new JsonResponse(['messege' => 'Successfully logged in!', 'access_token' => $accessToken]);
        $res->headers->setCookie($cookie);

        return $res;

    }
}
