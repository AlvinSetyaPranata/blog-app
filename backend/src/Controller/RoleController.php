<?php

namespace App\Controller;

use App\Entity\Role;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class RoleController extends AbstractController
{
    #[Route('/api/roles', name: 'get_role')]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $rolesData = $em->getRepository(Role::class)->findAll();

        $serializedData = $serializer->serialize($rolesData, 'json', ['groups' => 'role:read']);

        return new JsonResponse(['messege' => 'List of Roles', 'data' => json_decode($serializedData, true)]);
    }
}
