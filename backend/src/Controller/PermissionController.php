<?php

namespace App\Controller;

use App\Entity\Permission;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class PermissionController extends AbstractController
{
    #[Route('/api/permissions', name: 'get_permissions', methods: ['GET'])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $query = $em->getRepository(Permission::class)->findAll();
        $data = $serializer->serialize($query, "json", ['groups' => 'permission:read']);

        return new JsonResponse(["messege" => "List of Permissions", "data" => json_decode($data, true)]);
    }

    #[Route('/api/permission', name: 'add_permission', methods: ['POST'])]   
    public function create(EntityManagerInterface $em, Request $request): JsonResponse
    {
        $reqData = json_decode($request->getContent(), true);

        if (!isset($reqData["name"])) {
            return new JsonResponse(["messege" => "Invalid Request!"], JsonResponse::HTTP_BAD_REQUEST);
        }

        $permission = new Permission();

        $permission->setName($reqData["name"]);

        $em->persist($permission);
        $em->flush();

        return new JsonResponse(["messege" => "Successfully added new permission"], JsonResponse::HTTP_CREATED);
    } 

    #[Route('/api/permission/{id}', name: 'update_permission', methods: ['PUT'])]
    public function update(int $id, EntityManagerInterface $em, Request $request): JsonResponse
    {
        $permission = $em->getRepository(Permission::class)->find($id);

        if (!$permission) {
            return new JsonResponse(["messege" => "Permission with the given id, is not found!"], JsonResponse::HTTP_CONFLICT);
        }

        $reqData = json_decode($request->getContent(), true);

        if (isset($reqData["name"])) {
            $permission->setName($reqData["name"]);
        }

        $em->persist($permission);
        $em->flush();

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }   

    #[Route('/api/permission/{id}', name: 'delete_permission', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse 
    {
        $permission = $em->getRepository(Permission::class)->find($id);

        if (!$permission) {
            return new JsonResponse(["messege" => "Permission with the given id, is not found!"], JsonResponse::HTTP_CONFLICT);
        }
        
        $em->remove($permission);
        $em->flush();

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }


}
