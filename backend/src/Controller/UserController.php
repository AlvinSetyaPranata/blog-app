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

        $data = $serializer->serialize($query, "json", ['groups' => 'user:read']);
    
        return $this->json(['messege' => 'ok', 'data' => json_decode($data, true)]);
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

    #[Route('/api/user/{id}', name: 'update_user', methods: ['PUT'])]
    public function update(int $id, EntityManagerInterface $em, Request $request): JsonResponse{
        
        $reqData = json_decode($request->getContent());

        if (!isset($reqData["name"], $reqData["age"], $reqData["gender"])) {
            return new JsonResponse(["messege" => "Invalid Request"], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse(['messege' => "User with given id, is not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);

    }

    #[Route('/api/user/{id}', name: 'delete_user', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse(["messege" => "User with given id, is not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($user);
        $em->flush();

        return new JsonResponse([JsonResponse::HTTP_NO_CONTENT]);
    }


}
