<?php

namespace App\Controller;

use App\Entity\Category;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class CategoryController extends AbstractController
{
    #[Route('/api/categories', name: 'app_category', methods: ['GET'])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $query = $em->getRepository(Category::class)->findAll();
        $serialized = $serializer->serialize($query, 'json', ['groups' => 'category:read']);

        return new JsonResponse(['messege' => 'OK', 'data' => json_decode($serialized, true)], JsonResponse::HTTP_OK);
    }

    #[Route('/api/category/add', name: 'add_category', methods: ['POST'])]
    public function create(EntityManagerInterface $em, Request $request){
        $data = $request->request->all();

        if (!isset($data["name"])) {
            return new JsonResponse(['messege' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $category = new Category();
        $category->setName($data["name"]);

        $em->persist($category);
        $em->flush();

        return new JsonResponse(['messege' => $data["name"]." Has been Created successfully!"], JsonResponse::HTTP_CREATED);
    }
}
