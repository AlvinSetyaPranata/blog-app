<?php

namespace App\Controller;

use App\Entity\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;

final class UserController extends AbstractController
{
    #[Route('/api/user', name: 'app_user', methods: ['GET'])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $query = $em->getRepository(User::class)->findAll();

        $res = $serializer->normalize($query, null, ['groups' => 'user:read']);
    
        return $this->json(['messege' => 'ok', 'data' => $res]);
    }

    #[Route('/api/user', name: 'add_user', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = $request->request->all();

        if (!$data || !isset($data["name"], $data["age"], $data["gender"])) {
            return new JsonResponse(['message' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user->setName($data["name"]);
        $user->setAge($data["age"]);
        $user->setGender($data["gender"]);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'User Created Successfully'], JsonResponse::HTTP_CREATED);
    }
}
