<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;

final class PostController extends AbstractController
{

    #[Route('/api/post', name: 'app_post', methods: ["GET"])]
    public function index(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $query = $em->getRepository(Post::class)->findAll();


        $data = $serializer->serialize($query, 'json', ['groups' => 'post:read']);

        return new JsonResponse(['messege' => 'OK', 'data' => json_decode($data, true)]);

    }

    #[Route('/api/post', name: 'app_add_post', methods: ["POST"])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {

        $data = $request->request->all();


        if (!isset($data["title"], $data['content'], $data["author"])) {
            return new JsonResponse(['messege' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(User::class)->find($data["author"]);
        
        if (!$user) {
            return new JsonResponse(['messege' => 'Failed to find a user that requested'], JsonResponse::HTTP_NOT_FOUND);
        }

        $posts = $em->getRepository(Post::class)->findByTitle($data["title"]);


        if ($posts) {
            return new JsonResponse(['messege' => 'Given title is already exists'], JsonResponse::HTTP_CONFLICT);
        }
        
        $post = new Post();
        $post->setTitle($data["title"]);
        $post->setContent($data["content"]);
        $post->setAuthor($user);

        $em->persist($post);
        $em->flush();
        
        return new JsonResponse(['messege' => 'New post has been created!'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/api/post/{id}', name: 'update_post', methods: ["PUT"])]
    public function update(int $id, EntityManagerInterface $em, Request $request): JsonResponse
    {
        $reqData = json_decode($request->getContent(), true);
        
        if (!isset($reqData["title"], $reqData["content"])) {
            return new JsonResponse(['messege' => 'Invalid Request'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $post = $em->getRepository(Post::class)->find($id);

        if (!$post) {
            return new JsonResponse(['messege' => 'Post with given id is not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $post->setTitle($reqData["title"]);
        $post->setContent($reqData["content"]);

        $em->persist($post);
        $em->flush();

        return new JsonResponse(JsonResponse::HTTP_NO_CONTENT);
    }

    #[Route('/api/post/{id}', name: 'delete_post', methods: ["DELETE"])]
    public function delete(int $id, EntityManagerInterface $em){
        $post = $em->getRepository(Post::class)->find($id);

        if (!$post) {
            return new JsonResponse(['messege' => 'Post with given id is not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($post);
        $em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);

    }
}

// Add delete
