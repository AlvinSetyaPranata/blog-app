<?php

namespace App\Controller;

use App\Entity\Permission;
use App\Entity\Role;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class RoleController extends AbstractController
{
    #[Route('/api/roles', name: 'get_role', methods: ["GET"])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $query = $em->getRepository(Role::class)->findAll();

        $data = $serializer->serialize($query, 'json', ['groups' => 'role:read']);


        return new JsonResponse(['messege' => 'List of Roles', 'data' => json_decode($data, true)]);
    }

    #[Route('/api/role', name: 'add_role', methods: ["POST"])]
    public function create(EntityManagerInterface $em, Request $request): JsonResponse
    {

        $requestData = json_decode($request->getContent(), true);

        if (!isset($requestData["name"])) {
            return new JsonResponse(['messege' => 'Role must at least have name!'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $roleIsExists = $em->getRepository(Role::class)->findByName($requestData["name"]);

        if ($roleIsExists) {
            return new JsonResponse(['messege' => 'Role is already exists!'], JsonResponse::HTTP_CONFLICT);
        }

        $role = new Role();
        $role->setName($requestData["name"]);
        $permissions = $em->getRepository(Permission::class);

        // set Permissions
        if (isset($reqData["permissions"])) {
            foreach ($reqData["permissions"] as $userPermission) {
                $permission = $permissions->findByName($userPermission);

                if ($permission) {
                    $role->addPermission($permission);
                }
            }
        }


        $em->persist($role);
        $em->flush();

        return new JsonResponse(['messege' => 'Role Added!'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/api/role/{id}', name: 'update_role', methods: ["PUT"])]
    public function update(int $id, EntityManagerInterface $em, Request $request): JsonResponse
    {
        $reqData = json_decode($request->getContent(), true);
        $role = $em->getRepository(Role::class)->find($id);

        if (!$role) {
            return new JsonResponse(['messege' => 'Role with the given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (isset($reqData["name"])) {
            $role->setName($reqData["name"]);
        }

        $em->persist($role);
        $em->flush();

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('/api/role/{id}', name: 'delete_role', methods: ["DELETE"])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $role = $em->getRepository(Role::class)->find($id);

        if (!$role) {
            return new JsonResponse(['messege' => 'Role with the given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($role);
        $em->flush();

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }
}
