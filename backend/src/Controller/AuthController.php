<?php

namespace App\Controller;

use App\Entity\Role;
use App\Entity\User;
use App\Service\FileUploader;
use DateTime;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class AuthController extends AbstractController
{

    private SerializerInterface $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

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

        if (!$hasher->isPasswordValid($user, $reqData["password"])) {
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


        $user_information = $this->serializer->serialize($user, "json", ['groups' => 'user:read']);


        $res = new JsonResponse(['messege' => 'Successfully logged in!', 'user' => json_decode($user_information, true), 'token' => $accessToken]);
        $res->headers->setCookie($cookie);

        return $res;
    }

    #[Route('/api/auth/register', name: 'register', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, FileUploader $fileUploader): JsonResponse
    {
        $data = $request->request->all();

        if (!$data || !isset($data["name"], $data["age"], $data["gender"], $data["email"], $data["password"], $data["role_id"])) {
            return new JsonResponse(['message' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $role = $em->getRepository(Role::class)->find($data["role_id"]);

        if (!$role) {
            return new JsonResponse(['messege' => 'Role with given name is not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $userExists = $em->getRepository(User::class)->findOneBy(['email' => $data["email"]]);

        if ($userExists) {
            return new JsonResponse(['message' => 'User already registered'], JsonResponse::HTTP_CONFLICT);
        }


        $user = new User();

        if ($request->files->get('avatar')) {
            $fileName = $fileUploader->upload($request->files->get('avatar'));
            $user->setAvatar($request->getSchemeAndHttpHost() . '/uploads/' . $fileName);
        }

        $user->setEmail($data["email"]);
        $user->setName($data["name"]);
        $user->setAge($data["age"]);
        $user->setGender($data["gender"]);
        $user->setRole($role);

        $password = $passwordHasher->hashPassword($user, $data["password"]);

        $user->setPassword($password);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'User Created Successfully', 'user' => [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'age' => $user->getAge(),
            'gender' => $user->getGender(),
            'role' => $user->getRole()->getName(),
            'avatar' => $user->getAvatar()
        ]], JsonResponse::HTTP_CREATED);
    }
}
