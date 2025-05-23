<?php

namespace App\Controller;

use App\Entity\Blog;
use App\Entity\Category;
use App\Entity\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;

final class BlogController extends AbstractController
{


    #[Route('/api/blogs', name: 'app_blog', methods: ['GET'])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer, Request $request): JsonResponse
    {
        $category = $request->query->get('categories');

        if ($category) {
            $query = $em->getRepository(Blog::class)->findByCategoryName($category);

            $serializedData = $serializer->serialize($query, 'json', ['groups' => 'blog:read']);

            return new JsonResponse(['messege' => 'OK', 'data' => json_decode($serializedData)], JsonResponse::HTTP_OK);
        }


        $query = $em->getRepository(Blog::class)->findAll();

        $serializedData = $serializer->serialize($query, 'json', ['groups' => 'blog:read']);

        return new JsonResponse(['messege' => 'OK', 'data' => json_decode($serializedData)], JsonResponse::HTTP_OK);
    }



    # Create
    #[Route('/api/blogs/add', name: 'add_blog', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = $request->request->all();

        if (!isset($data["title"], $data["author"], $data["image"])) {
            return new JsonResponse(['messege' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(User::class)->find($data["author"]);

        if (!$user) {
            return new JsonResponse(['messege' => 'User with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $blog = new Blog();
        $blog->setTitle($data["title"]);
        $blog->setImage($data["image"]);
        $blog->setAuthor($user);

        if (isset($data["content"])) {
            $blog->setContent($data["content"]);
        }

        if (isset($data["category"])) {
            $category = $em->getRepository(Category::class)->find($data["category"]);

            if (!$category) {
                return new JsonResponse(['messege' => 'Category with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $blog->addCategory($category);
        }

        $em->persist($blog);
        $em->flush();

        return new JsonResponse(['message' => 'Blog Created Successfully'], JsonResponse::HTTP_CREATED);
    }

    # Update
    #[Route('/api/blogs/{id}', name: 'update_blog', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em) {
        $data = json_decode($request->getContent(), true);

        if (!isset($data["title"], $data["author"], $data["image"])) {
            return new JsonResponse(['messege' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $blog = $em->getRepository(Blog::class)->find($id);
        $user = $em->getRepository(User::class)->find($data["author"]);
        

        if (!$blog) {
            return new JsonResponse(['messege' => 'Blog with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (!$user) {
            return new JsonResponse(['messege' => 'User with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $blog->setTitle($data["title"]);
        $blog->setImage($data["image"]);
        $blog->setAuthor($user);

        if (isset($data["content"])) {
            $blog->setContent($data["content"]);
        }

        if (isset($data["category"])) {
            $category = $em->getRepository(Category::class)->find($data["category"]);

            if (!$category) {
                return new JsonResponse(['messege' => 'Category with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $blog->addCategory($category);
        }

        $em->persist($blog);
        $em->flush();

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT); 
    }

    #[Route('/api/blogs/{id}', name: 'delete_blog', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em) {

        
        $blog = $em->getRepository(Blog::class)->find($id);

        if (!$blog) {
            return new JsonResponse(['messege' => 'Category with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($blog);
        $em->flush();
        
        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }


    
}
